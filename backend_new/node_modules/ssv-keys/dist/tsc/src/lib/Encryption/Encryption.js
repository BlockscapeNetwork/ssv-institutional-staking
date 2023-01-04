"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidOperatorKeyException = void 0;
const tslib_1 = require("tslib");
const js_base64_1 = require("js-base64");
const JSEncrypt_1 = tslib_1.__importDefault(require("../JSEncrypt"));
class InvalidOperatorKeyException extends Error {
    constructor(operator, message) {
        super(message);
        this.operator = operator;
    }
}
exports.InvalidOperatorKeyException = InvalidOperatorKeyException;
class Encryption {
    constructor(operators, shares) {
        this.RAW_OPERATOR_PUBLIC_KEY_SIGNATURE = RegExp(/------BEGIN RSA PUBLIC KEY-----/, 'gmi');
        this.operators = operators.map((publicKey) => {
            if (this.RAW_OPERATOR_PUBLIC_KEY_SIGNATURE.test(publicKey)) {
                return publicKey;
            }
            return (0, js_base64_1.decode)(publicKey);
        });
        this.shares = shares;
    }
    encrypt() {
        const encryptedShares = [];
        Object.keys(this.operators).forEach((operator) => {
            const encrypt = new JSEncrypt_1.default({});
            try {
                encrypt.setPublicKey(this.operators[operator]);
            }
            catch (error) {
                throw new InvalidOperatorKeyException({
                    rsa: this.operators[operator],
                    base64: (0, js_base64_1.encode)(this.operators[operator]),
                }, `Operator is not valid RSA Public Key: ${error}`);
            }
            const encrypted = encrypt.encrypt(this.shares[operator].privateKey);
            const encryptedShare = {
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
exports.default = Encryption;
//# sourceMappingURL=Encryption.js.map