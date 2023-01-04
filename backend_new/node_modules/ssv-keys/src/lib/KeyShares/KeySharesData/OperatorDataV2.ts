import { IsDefined, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IOperatorData } from './IOperatorData';
import { operatorValidator } from '../../../commands/actions/validators/operator';

export class OperatorDataV2 implements IOperatorData {
  @IsNotEmpty()
  @IsDefined()
  @IsInt()
  public id: number | undefined;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(98)
  public publicKey: string | undefined;

  setData(data: any): any {
    if (data.id) {
      this.id = data.id;
    }
    if (data.publicKey) {
      this.publicKey = data.publicKey;
    }
  }

  /**
   * Validate operator ID and public key
   */
  async validate(): Promise<any> {
    if (!Number.isInteger(this.id)) {
      throw Error('Operator ID should be integer');
    }
    const result = await operatorValidator(this.publicKey || '');
    if (result !== true) {
      throw Error(String(result));
    }
  }
}
