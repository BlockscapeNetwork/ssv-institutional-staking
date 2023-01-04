"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThresholdInvalidOperatorIdError = exports.ThresholdInvalidOperatorsLengthError = void 0;
const tslib_1 = require("tslib");
const BLS_1 = tslib_1.__importDefault(require("../BLS"));
class ThresholdInvalidOperatorsLengthError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(operators, message) {
        super(message);
        this.operators = operators;
    }
}
exports.ThresholdInvalidOperatorsLengthError = ThresholdInvalidOperatorsLengthError;
class ThresholdInvalidOperatorIdError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(operator, message) {
        super(message);
        this.operator = operator;
    }
}
exports.ThresholdInvalidOperatorIdError = ThresholdInvalidOperatorIdError;
/**
 * Building threshold for list of operator IDs
 */
class Threshold {
    constructor() {
        this.shares = [];
    }
    static get DEFAULT_THRESHOLD_NUMBER() {
        return 3;
    }
    /**
     * Receives list of operators IDs.
     *  len(operator IDs) := 3 * F + 1
     *
     * If F calculated from this formula is not integer number - it will raise exception.
     * Generate keys and return promise
     */
    create(privateKey, operators) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Validation
            operators.map(operator => {
                if (!Number.isInteger(operator)) {
                    throw new ThresholdInvalidOperatorIdError(operator, `Operator must be integer. Got: ${String(operator)}`);
                }
            });
            const F = (operators.length - 1) / 3;
            if (!Number.isInteger(F)) {
                throw new ThresholdInvalidOperatorsLengthError(operators, 'Invalid operators length. It should satisfy conditions: ‖ Operators ‖ := 3 * F + 1 ; F ∈ ℕ');
            }
            return new Promise((resolve, reject) => {
                try {
                    BLS_1.default.init(BLS_1.default.BLS12_381)
                        .then(() => {
                        const msk = [];
                        const mpk = [];
                        // Master key Polynomial
                        this.validatorPrivateKey = BLS_1.default.deserializeHexStrToSecretKey(privateKey);
                        this.validatorPublicKey = this.validatorPrivateKey.getPublicKey();
                        msk.push(this.validatorPrivateKey);
                        mpk.push(this.validatorPublicKey);
                        // Construct poly
                        for (let i = 1; i < operators.length - F; i += 1) {
                            const sk = new BLS_1.default.SecretKey();
                            sk.setByCSPRNG();
                            msk.push(sk);
                            const pk = sk.getPublicKey();
                            mpk.push(pk);
                        }
                        // Evaluate shares - starting from 1 because 0 is master key
                        for (const operatorId of operators) {
                            const id = new BLS_1.default.Id();
                            id.setInt(operatorId);
                            const shareSecretKey = new BLS_1.default.SecretKey();
                            shareSecretKey.share(msk, id);
                            const sharePublicKey = new BLS_1.default.PublicKey();
                            sharePublicKey.share(mpk, id);
                            this.shares.push({
                                privateKey: `0x${shareSecretKey.serializeToHexStr()}`,
                                publicKey: `0x${sharePublicKey.serializeToHexStr()}`,
                                id,
                            });
                        }
                        const response = {
                            validatorPrivateKey: `0x${this.validatorPrivateKey.serializeToHexStr()}`,
                            validatorPublicKey: `0x${this.validatorPublicKey.serializeToHexStr()}`,
                            shares: this.shares,
                        };
                        resolve(response);
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
}
exports.default = Threshold;
//# sourceMappingURL=Threshold.js.map