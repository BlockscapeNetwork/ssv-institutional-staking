import _ from 'underscore';
import {
  IsString,
  Length,
  ValidateNested, IsOptional
} from 'class-validator';
import bls from '../../BLS';
import { IKeySharesData } from './IKeySharesData';
import { OperatorDataV2 } from './OperatorDataV2';
import { KeySharesKeysV2 } from './KeySharesKeysV2';
import {
  DuplicatedOperatorIdError,
  DuplicatedOperatorPublicKeyError,
  OperatorsWithSharesCountsMismatchError
} from './exceptions/operator';
import { BLSDeserializeError } from './exceptions/bls';


export class KeySharesDataV2 implements IKeySharesData {
  @IsOptional()
  @IsString()
  @Length(98, 98)
  public publicKey?: string | null = null;

  @IsOptional()
  @ValidateNested({ each: true })
  public operators?: OperatorDataV2[] | null = null;

  @IsOptional()
  @ValidateNested()
  public shares?: KeySharesKeysV2 | null = null;

  setData(data: any) {
    if (data.publicKey) {
      this.publicKey = data.publicKey;
    }
    if (data.operators) {
      this.operators = data.operators.map(
        (operator: { id: any; publicKey: any; }) => {
          const operatorData = new OperatorDataV2();
          operatorData.setData(operator);
          return operatorData;
        }
      );
    }
    if (data.shares) {
      const sharesInstance = new KeySharesKeysV2();
      if (_.isArray(data.shares)) {
        sharesInstance.setData({
          publicKeys: data.shares.map((share: { publicKey: string; }) => share.publicKey),
          encryptedKeys: data.shares.map((share: { privateKey: string; }) => share.privateKey),
        });
      } else {
        sharesInstance.setData(data.shares);
      }
      this.shares = sharesInstance;
    }
  }

  /**
   * Do all possible validations.
   */
  async validate(): Promise<any> {
    await this.validateDuplicates();
    await bls.init(bls.BLS12_381);
    await this.validateCounts();
    await this.shares?.validate();
    await this.validatePublicKey();
    await this.validateOperators();
  }

  /**
   * Get the list of shares public keys.
   */
  get sharesPublicKeys(): string[] {
    return this.shares?.publicKeys || [];
  }

  /**
   * Get the list of encrypted shares.
   */
  get sharesEncryptedKeys(): string[] {
    return this.shares?.encryptedKeys || [];
  }

  /**
   * Get the list of operators IDs.
   */
  get operatorIds(): number[] {
    if (!this.operators?.length) {
      return [];
    }
    return this.operators.map(operator => parseInt(String(operator.id), 10));
  }

  /**
   * Get the list of operators public keys.
   */
  get operatorPublicKeys(): string[] {
    if (!this.operators?.length) {
      return [];
    }
    return this.operators.map(operator => String(operator.publicKey));
  }

  /**
   * Try to BLS deserialize validator public key.
   */
  async validatePublicKey(): Promise<any> {
    if (!this.publicKey) {
      return;
    }
    try {
      await bls.deserializeHexStrToPublicKey(this.publicKey.replace('0x', ''));
    } catch (e) {
      throw new BLSDeserializeError(
        this.publicKey,
        `Can not BLS deserialize validator public key`
      );
    }
  }

  /**
   * Check that counts are consistent.
   */
  async validateCounts(): Promise<any> {
    if (!this.sharesEncryptedKeys?.length || !this.sharesPublicKeys?.length) {
      return;
    }
    if (this.operatorIds.length !== this.sharesEncryptedKeys.length
      || this.operatorIds.length !== this.sharesPublicKeys.length
      || this.operatorIds.length !== this.operatorPublicKeys.length) {
      throw new OperatorsWithSharesCountsMismatchError(
        this.operators || [],
        this.shares,
        'Length of operators and shares should be equal.',
      );
    }
  }

  /**
   * Validate all operators
   */
  async validateOperators(): Promise<any> {
    for (const operator of this.operators || []) {
      await operator.validate();
    }
  }

  /**
   * Do not allow to use duplicated operator IDs and public keys.
   */
  async validateDuplicates() {
    const operatorIds: any = {},
      operatorPublicKeys: any = {};
    for (const operator of this.operators || []) {
      if (operatorIds[String(operator.id)] === true) {
        throw new DuplicatedOperatorIdError(
          operator,
          `Operator ID already exists`
        );
      }
      operatorIds[String(operator.id)] = true;

      if (operatorPublicKeys[String(operator.publicKey)] === true) {
        throw new DuplicatedOperatorPublicKeyError(
          operator,
          `Operator public key already exists`
        );
      }
      operatorPublicKeys[String(operator.publicKey)] = true;
    }
  }
}
