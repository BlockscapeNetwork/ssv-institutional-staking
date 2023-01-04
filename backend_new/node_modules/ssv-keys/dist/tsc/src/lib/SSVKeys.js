"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSVKeys = void 0;
const tslib_1 = require("tslib");
const atob_1 = tslib_1.__importDefault(require("atob"));
const web3_1 = tslib_1.__importDefault(require("web3"));
const js_base64_1 = require("js-base64");
const Threshold_1 = tslib_1.__importDefault(require("./Threshold"));
const EthereumKeyStore_1 = tslib_1.__importDefault(require("./EthereumKeyStore/EthereumKeyStore"));
const Encryption_1 = tslib_1.__importDefault(require("./Encryption/Encryption"));
/**
 * SSVKeys class provides high-level methods to easily work with entire flow:
 *  - getting private key from keystore file using password
 *  - creating shares threshold
 *  - creating final shares
 *  - building final payload which is ready to be used in web3 transaction
 */
class SSVKeys {
    constructor() {
        this.web3Instances = {};
    }
    /**
     * Getting instance of web3
     * @param nodeUrl
     */
    getWeb3(nodeUrl = process.env.NODE_URL || '') {
        if (!this.web3Instances[nodeUrl]) {
            this.web3Instances[nodeUrl] = new web3_1.default(String(nodeUrl || ''));
        }
        return this.web3Instances[nodeUrl];
    }
    /**
     * Extract private key from keystore data using keystore password.
     * Generally can be used in browsers when the keystore data has been provided by browser.
     * @param data
     * @param password
     */
    getPrivateKeyFromKeystoreData(data, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const keyStore = new EthereumKeyStore_1.default(data);
                return yield keyStore.getPrivateKey(password).then((privateKey) => privateKey);
            }
            catch (error) {
                return error;
            }
        });
    }
    /**
     * Build threshold using private key for number of participants and failed participants.
     * @param privateKey
     * @param operators
     */
    createThreshold(privateKey, operators) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const threshold = new Threshold_1.default();
                this.threshold = yield threshold.create(privateKey, operators);
                return this.threshold;
            }
            catch (error) {
                return error;
            }
        });
    }
    /**
     * Encrypt operators shares using operators public keys.
     * @param operatorsPublicKeys
     * @param shares
     * @param sharesFormat
     */
    encryptShares(operatorsPublicKeys, shares, sharesFormat = '') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const decodedOperators = operatorsPublicKeys.map((operator) => String((0, js_base64_1.encode)((0, atob_1.default)(operator))));
                const encryptedShares = new Encryption_1.default(decodedOperators, shares).encrypt();
                return encryptedShares.map((share) => {
                    share.operatorPublicKey = (0, js_base64_1.encode)(share.operatorPublicKey);
                    if (sharesFormat === SSVKeys.SHARES_FORMAT_ABI) {
                        share.operatorPublicKey = this.getWeb3().eth.abi.encodeParameter('string', share.operatorPublicKey);
                        share.privateKey = this.getWeb3().eth.abi.encodeParameter('string', share.privateKey);
                    }
                    return share;
                });
            }
            catch (error) {
                return error;
            }
        });
    }
    /**
     * Build shares from private key, operator IDs and public keys
     * @param privateKey
     * @param operatorIds
     * @param operatorPublicKeys
     */
    buildShares(privateKey, operatorIds, operatorPublicKeys) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const threshold = yield this.createThreshold(privateKey, operatorIds);
            return this.encryptShares(operatorPublicKeys, threshold.shares);
        });
    }
    /**
     * Getting threshold if it has been created before.
     */
    getThreshold() {
        return this.threshold;
    }
    /**
     * Getting public key of validator
     */
    getValidatorPublicKey() {
        var _a;
        return ((_a = this.getThreshold()) === null || _a === void 0 ? void 0 : _a.validatorPublicKey) || '';
    }
    /**
     * Encode with Web3 eth abi method any fields of shares array required for transaction.
     * @param encryptedShares
     * @param field
     */
    abiEncode(encryptedShares, field) {
        return encryptedShares.map(share => {
            const value = field ? Object(share)[field] : share;
            if (String(value).startsWith('0x')) {
                return value;
            }
            return this.getWeb3().eth.abi.encodeParameter('string', value);
        });
    }
    /**
     * Build payload from encrypted shares, validator public key and operator IDs
     * @param validatorPublicKey
     * @param operatorsIds
     * @param encryptedShares
     * @param ssvAmount
     */
    buildPayload(validatorPublicKey, operatorsIds, encryptedShares, ssvAmount) {
        const sharePublicKeys = encryptedShares.map((share) => share.publicKey);
        const sharePrivateKeys = this.abiEncode(encryptedShares, 'privateKey');
        return [
            validatorPublicKey,
            operatorsIds.join(','),
            sharePublicKeys,
            sharePrivateKeys,
            ssvAmount,
        ];
    }
    /**
     * Build payload from keyshares file with operators and shares details inside.
     * If ssv amount is not provided - it will be taken from keyshares file if exist there or set to 0.
     * @param keyShares
     * @param ssvAmount
     */
    buildPayloadFromKeyShares(keyShares, ssvAmount) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const publicKeys = ((_b = (_a = keyShares.data) === null || _a === void 0 ? void 0 : _a.shares) === null || _b === void 0 ? void 0 : _b.publicKeys) || [];
        const encryptedKeys = ((_d = (_c = keyShares.data) === null || _c === void 0 ? void 0 : _c.shares) === null || _d === void 0 ? void 0 : _d.encryptedKeys) || [];
        const operatorPublicKeys = ((_e = keyShares.data) === null || _e === void 0 ? void 0 : _e.operatorPublicKeys) || [];
        if (publicKeys.length !== encryptedKeys.length
            || publicKeys.length !== operatorPublicKeys.length
            || encryptedKeys.length !== operatorPublicKeys.length
            || !encryptedKeys.length
            || !operatorPublicKeys.length
            || !publicKeys.length) {
            throw Error('Operator public keys and shares public/encrypted keys length does not match or have zero length.');
        }
        return [
            (_f = keyShares.data) === null || _f === void 0 ? void 0 : _f.publicKey,
            ((_h = (_g = keyShares.data) === null || _g === void 0 ? void 0 : _g.operatorIds) === null || _h === void 0 ? void 0 : _h.join(',')) || '',
            publicKeys,
            this.abiEncode(encryptedKeys),
            ssvAmount || ((_k = (_j = keyShares.payload) === null || _j === void 0 ? void 0 : _j.readable) === null || _k === void 0 ? void 0 : _k.ssvAmount) || 0,
        ];
    }
}
exports.SSVKeys = SSVKeys;
SSVKeys.SHARES_FORMAT_ABI = 'abi';
//# sourceMappingURL=SSVKeys.js.map