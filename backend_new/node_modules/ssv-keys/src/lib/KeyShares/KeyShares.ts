import {
  IsString,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  validateOrReject
} from 'class-validator';
import { KeySharesDataV2 } from './KeySharesData/KeySharesDataV2';
import { KeySharesPayloadV2 } from './KeySharesData/KeySharesPayloadV2';

export type KeySharesData = KeySharesDataV2;
export type KeySharesPayload = KeySharesPayloadV2;

/**
 * Key shares file data interface.
 */
export class KeyShares {
  static VERSION_V2 = 'v2';

  // Versions of deeper structures
  private byVersion: any = {
    'payload': {
      [KeyShares.VERSION_V2]: KeySharesPayloadV2,
    },
    'data': {
      [KeyShares.VERSION_V2]: KeySharesDataV2,
    }
  }

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public version: string;

  @IsOptional()
  @ValidateNested()
  public data?: KeySharesData | null;

  @IsOptional()
  @ValidateNested()
  public payload?: KeySharesPayload | null;

  /**
   * @param version
   */
  constructor({ version }: { version: string }) {
    this.version = version;
  }

  /**
   * Set final payload for web3 transaction and validate it.
   * @param payload
   */
  async setPayload(payload: any): Promise<KeyShares> {
    await this.usePayload(payload, this.version);
    return this;
  }

  /**
   * Set new data and validate it.
   * @param data
   */
  async setData(data: any): Promise<KeyShares> {
    await this.useData(data, this.version);
    return this;
  }

  /**
   * Instantiate key shares from raw data as string or object.
   * @param data
   */
  static async fromData(data: string | any): Promise<KeyShares> {
    // Parse json
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    const keyShares = new KeyShares({ version: data.version });
    await keyShares.setData(data.data);
    await keyShares.setPayload(data.payload);
    return keyShares;
  }

  /**
   * Set payload as new or existing instance and update its internal data.
   * @param payload
   * @param version
   */
  async usePayload(payload: any, version: string): Promise<any> {
    this.payload = this.payload || this.getByVersion('payload', version);
    if (this.payload) {
      await this.payload.setData(payload);
      await this.validate();
    }
  }

  /**
   * Get entity by version.
   * @param entity
   * @param version
   * @private
   */
  private getByVersion(entity: string, version: string): any {
    if (!this.byVersion[entity]) {
      throw Error(`"${entity}" is unknown entity`);
    }
    if (!this.byVersion[entity][version]) {
      throw Error(`"${entity}" is not supported in version of key shares: ${version}`);
    }
    return new this.byVersion[entity][version]();
  }

  /**
   * Get final data converted from raw data.
   * @param data
   * @param version
   */
  async useData(data: any, version: string): Promise<any> {
    if (!data) {
      return;
    }
    this.data = this.data || this.getByVersion('data', version);
    if (this.data) {
      await this.data.setData(data);
      await this.validate();
    }
  }

  /**
   * Validate everything
   */
  async validate(): Promise<any> {
    // Validate classes and structures
    await validateOrReject(this).catch(errors => {
      throw Error(`Key shares file have wrong format. Errors: ${JSON.stringify(errors, null, '  ')}`);
    });

    // Validate data and payload
    await this.payload?.validate();
    await this.data?.validate();
  }

  /**
   * Stringify key shares to be ready for saving in file.
   */
  toString(): string {
    return JSON.stringify({
      version: this.version,
      data: this.data || null,
      payload: this.payload || null,
      createdAt: new Date().toISOString()
    }, null, '  ');
  }
}
