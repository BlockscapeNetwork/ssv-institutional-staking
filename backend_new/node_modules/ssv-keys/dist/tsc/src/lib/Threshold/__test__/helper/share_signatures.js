"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharesSignatures = void 0;
const tslib_1 = require("tslib");
const BLS_1 = tslib_1.__importDefault(require("../../../BLS"));
const Threshold_1 = tslib_1.__importDefault(require("../../../Threshold"));
const sharesSignatures = (privateKey, operators, message, threshold) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return new Threshold_1.default().create(privateKey, operators).then((response) => {
        const validatorPrivateKey = BLS_1.default.deserializeHexStrToSecretKey(privateKey);
        const validatorPublicKey = validatorPrivateKey.getPublicKey();
        const signatures = [];
        const ids = [];
        const randomIndex = getRandomInt(4);
        response.shares.forEach((share, index) => {
            if (threshold && index === randomIndex) {
                return;
            }
            const sharePrivateKey = share.privateKey.substr(2);
            const shareBlsPrivateKey = BLS_1.default.deserializeHexStrToSecretKey(sharePrivateKey);
            signatures.push(shareBlsPrivateKey.sign(message));
            ids.push(share.id);
        });
        return {
            validatorPrivateKey,
            validatorPublicKey,
            signatures,
            ids,
        };
    });
});
exports.sharesSignatures = sharesSignatures;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
//# sourceMappingURL=share_signatures.js.map