"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operatorValidator = void 0;
const tslib_1 = require("tslib");
const js_base64_1 = require("js-base64");
const JSEncrypt_1 = tslib_1.__importDefault(require("../../../lib/JSEncrypt"));
const Encryption_1 = require("../../../lib/Encryption/Encryption");
const operatorValidator = (operator) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const errorMessage = 'Invalid operator key format, make sure the operator exists in the network';
        const decodedOperator = (0, js_base64_1.decode)(operator);
        if (!decodedOperator.startsWith('-----BEGIN RSA PUBLIC KEY-----')) {
            throw Error(errorMessage);
        }
        const encrypt = new JSEncrypt_1.default({});
        try {
            encrypt.setPublicKey(decodedOperator);
        }
        catch (error) {
            throw new Encryption_1.InvalidOperatorKeyException({
                rsa: decodedOperator,
                base64: operator,
            }, errorMessage);
        }
        return true;
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { message } = e;
        return message;
    }
});
exports.operatorValidator = operatorValidator;
//# sourceMappingURL=operator.js.map