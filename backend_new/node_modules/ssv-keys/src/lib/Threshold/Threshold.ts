import { SecretKeyType } from 'bls-eth-wasm';
import bls from '../BLS';

export interface IShares {
    privateKey: string,
    publicKey: string,
    id?: any
}

export interface ISharesKeyPairs {
    validatorPrivateKey: string,
    validatorPublicKey: string,
    shares: IShares[]
}

export class ThresholdInvalidOperatorsLengthError extends Error {
  public operators: number[];

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(operators: number[], message: string) {
    super(message);
    this.operators = operators;
  }
}

export class ThresholdInvalidOperatorIdError extends Error {
  public operator: any;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(operator: any, message: string) {
    super(message);
    this.operator = operator;
  }
}

/**
 * Building threshold for list of operator IDs
 */
class Threshold {
    protected validatorPublicKey: any;
    protected validatorPrivateKey: any;
    protected shares: Array<any> = [];

    static get DEFAULT_THRESHOLD_NUMBER(): number {
      return 3;
    }

    /**
     * Receives list of operators IDs.
     *  len(operator IDs) := 3 * F + 1
     *
     * If F calculated from this formula is not integer number - it will raise exception.
     * Generate keys and return promise
     */
    async create(privateKey: string, operators: number[]): Promise<ISharesKeyPairs> {
        // Validation
        operators.map(operator => {
          if (!Number.isInteger(operator)) {
            throw new ThresholdInvalidOperatorIdError(
              operator,
              `Operator must be integer. Got: ${String(operator)}`
            );
          }
        });

        const F = (operators.length - 1) / 3;
        if (!Number.isInteger(F)) {
          throw new ThresholdInvalidOperatorsLengthError(
            operators,
            'Invalid operators length. It should satisfy conditions: ‖ Operators ‖ := 3 * F + 1 ; F ∈ ℕ'
          );
        }

        return new Promise((resolve, reject) => {
            try {
                bls.init(bls.BLS12_381)
                    .then(() => {
                        const msk = [];
                        const mpk = [];

                        // Master key Polynomial
                        this.validatorPrivateKey = bls.deserializeHexStrToSecretKey(privateKey);
                        this.validatorPublicKey = this.validatorPrivateKey.getPublicKey();

                        msk.push(this.validatorPrivateKey);
                        mpk.push(this.validatorPublicKey);

                        // Construct poly
                        for (let i = 1; i < operators.length - F; i += 1) {
                            const sk: SecretKeyType = new bls.SecretKey();
                            sk.setByCSPRNG();
                            msk.push(sk);
                            const pk = sk.getPublicKey();
                            mpk.push(pk);
                        }

                        // Evaluate shares - starting from 1 because 0 is master key
                        for (const operatorId of operators) {
                            const id = new bls.Id();
                            id.setInt(operatorId);
                            const shareSecretKey = new bls.SecretKey();
                            shareSecretKey.share(msk, id);

                            const sharePublicKey = new bls.PublicKey();
                            sharePublicKey.share(mpk, id);

                            this.shares.push({
                                privateKey: `0x${shareSecretKey.serializeToHexStr()}`,
                                publicKey: `0x${sharePublicKey.serializeToHexStr()}`,
                                id,
                            });
                        }

                        const response: ISharesKeyPairs = {
                            validatorPrivateKey: `0x${this.validatorPrivateKey.serializeToHexStr()}`,
                            validatorPublicKey: `0x${this.validatorPublicKey.serializeToHexStr()}`,
                            shares: this.shares,
                        };
                        resolve(response);
                    });
            } catch (error: any) {
                reject(error);
            }
        });
    }
}

export default Threshold;
