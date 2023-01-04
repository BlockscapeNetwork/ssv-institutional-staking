"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLSDeserializeError = void 0;
class BLSDeserializeError extends Error {
    constructor(publicKey, message) {
        super(message);
        this.publicKey = publicKey;
    }
}
exports.BLSDeserializeError = BLSDeserializeError;
//# sourceMappingURL=bls.js.map