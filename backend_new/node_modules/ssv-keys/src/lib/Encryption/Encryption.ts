import {decode, encode} from 'js-base64';
import JSEncrypt from '../JSEncrypt';
import { IShares } from '../Threshold';

export class InvalidOperatorKeyException extends Error {
  public operator: any;

  constructor(operator: { rsa: string, base64: string }, message: string) {
    super(message);
    this.operator = operator;
  }
}

export interface EncryptShare {
    operatorPublicKey: string,
    privateKey: string,
    publicKey: string
}

export default class Encryption {
    private readonly operators: string[];
    private readonly shares: IShares[];

  RAW_OPERATOR_PUBLIC_KEY_SIGNATURE = RegExp(/------BEGIN RSA PUBLIC KEY-----/, 'gmi');

  constructor(operators: string[], shares: IShares[]) {
    this.operators = operators.map((publicKey: string) => {
      if (this.RAW_OPERATOR_PUBLIC_KEY_SIGNATURE.test(publicKey)) {
        return publicKey;
      }
      return decode(publicKey);
    });
    this.shares = shares;
  }

    encrypt(): EncryptShare[] {
        const encryptedShares: EncryptShare[] = [];
        Object.keys(this.operators).forEach((operator: any) => {
            const encrypt = new JSEncrypt({});
            try {
              encrypt.setPublicKey(this.operators[operator]);
            } catch (error) {
              throw new InvalidOperatorKeyException(
                {
                  rsa: this.operators[operator],
                  base64: encode(this.operators[operator]),
                },
                `Operator is not valid RSA Public Key: ${error}`
              );
            }
            const encrypted = encrypt.encrypt(this.shares[operator].privateKey);
            const encryptedShare: EncryptShare = {
                operatorPublicKey: this.operators[operator],
                privateKey: String(encrypted),
                publicKey: this.shares[operator].publicKey,
            };
            encryptedShares.push(encryptedShare);
            return encryptedShare;
        });
        return encryptedShares;
    }
}
