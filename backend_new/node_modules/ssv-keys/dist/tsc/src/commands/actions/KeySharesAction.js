"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeySharesAction = void 0;
const tslib_1 = require("tslib");
const safe_1 = tslib_1.__importDefault(require("colors/safe"));
const BaseAction_1 = require("./BaseAction");
const SSVKeys_1 = require("../../lib/SSVKeys");
const file_1 = require("./validators/file");
const keystore_1 = tslib_1.__importDefault(require("./arguments/keystore"));
const ssv_amount_1 = tslib_1.__importDefault(require("./arguments/ssv-amount"));
const KeyShares_1 = require("../../lib/KeyShares/KeyShares");
const operator_ids_1 = tslib_1.__importDefault(require("./arguments/operator-ids"));
const password_1 = tslib_1.__importDefault(require("./arguments/password"));
const output_folder_1 = tslib_1.__importDefault(require("./arguments/output-folder"));
const helpers_1 = require("../../lib/helpers");
const operator_public_keys_1 = tslib_1.__importDefault(require("./arguments/operator-public-keys"));
/**
 * Command to build keyshares from user input.
 */
class KeySharesAction extends BaseAction_1.BaseAction {
    static get options() {
        return {
            action: 'key-shares',
            shortAction: 'ksh',
            description: 'Generate shares for a list of operators from a validator keystore file',
            arguments: [
                keystore_1.default,
                password_1.default,
                operator_ids_1.default,
                operator_public_keys_1.default,
                ssv_amount_1.default,
                output_folder_1.default,
            ],
        };
    }
    /**
     * Decrypt and return private key.
     */
    execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { keystore, password, output_folder: outputFolder, ssv_token_amount: ssvAmount, } = this.args;
            let { operators_ids: operatorIds, operators_keys: operatorKeys, } = this.args;
            // Prepare data
            operatorKeys = operatorKeys.split(',');
            operatorIds = operatorIds.split(',').map((o) => parseInt(o, 10));
            const keystoreFilePath = (0, file_1.sanitizePath)(String(keystore).trim());
            const keystoreData = yield (0, helpers_1.readFile)(keystoreFilePath);
            // Initialize SSVKeys SDK
            const ssvKeys = new SSVKeys_1.SSVKeys();
            const privateKey = yield ssvKeys.getPrivateKeyFromKeystoreData(keystoreData, password);
            // Build shares from operator IDs and public keys
            const shares = yield ssvKeys.buildShares(privateKey, operatorIds, operatorKeys);
            // Now save to key shares file encrypted shares and validator public key
            const keyShares = yield KeyShares_1.KeyShares.fromData({ version: 'v2' });
            yield keyShares.setData({
                operators: operatorKeys.map((operator, index) => ({
                    id: operatorIds[index],
                    publicKey: operator,
                })),
                publicKey: ssvKeys.getValidatorPublicKey(),
                shares,
            });
            // Build payload and save it in key shares file
            const payload = yield ssvKeys.buildPayload(ssvKeys.getValidatorPublicKey(), operatorIds, shares, ssvAmount);
            yield keyShares.setPayload(payload);
            const keySharesFilePath = yield (0, helpers_1.getFilePath)('keyshares', outputFolder.trim());
            yield (0, helpers_1.writeFile)(keySharesFilePath, keyShares.toString());
            return `\nKey distribution successful! Find your key shares file at ${safe_1.default.bgYellow(safe_1.default.black(keySharesFilePath))}\n`;
        });
    }
}
exports.KeySharesAction = KeySharesAction;
//# sourceMappingURL=KeySharesAction.js.map