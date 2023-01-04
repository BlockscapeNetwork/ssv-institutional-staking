"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const scrypt_js_1 = require("scrypt-js");
const ethereumjs_wallet_1 = tslib_1.__importDefault(require("ethereumjs-wallet"));
const ethereumjs_util_1 = require("ethereumjs-util");
/**
 * Decrypt private key from key store data
 * Supports key store versions: v1, v3, v4
 *
 * Example of usage (Node env):
 *
 *  const keyStoreFilePath = path.join(process.cwd(), 'validator_keys', 'keystore.json');
 *  const keyStoreString: string = fs.readFileSync(keyStoreFilePath).toString();
 *  const keyStoreData = JSON.parse(keyStoreString);
 *  const keyStore = new EthereumKeyStore(keyStoreData);
 *  const password = 'testtest';
 *  console.log('Private Key:', await keyStore.getPrivateKey(password));
 */
class EthereumKeyStore {
    /**
     * Receive key store data from string or parsed JSON
     * @param keyStoreData
     */
    constructor(keyStoreData) {
        this.privateKey = '';
        if (!keyStoreData) {
            throw new Error('Key store data should be JSON or string');
        }
        if (typeof keyStoreData === 'string') {
            this.keyStoreData = JSON.parse(keyStoreData);
        }
        else {
            this.keyStoreData = keyStoreData;
        }
        if (!this.keyStoreData.version) {
            throw new Error('Invalid keystore file');
        }
    }
    getPublicKey() {
        var _a;
        if (this.keyStoreData) {
            switch ((_a = this.keyStoreData.version) !== null && _a !== void 0 ? _a : this.keyStoreData.Version) {
                case 1:
                    return this.keyStoreData.Address;
                case 3:
                    return this.keyStoreData.id;
                case 4:
                    return this.keyStoreData.pubkey;
            }
        }
        return '';
    }
    /**
     * Decrypt private key using user password
     * @param password
     */
    getPrivateKey(password = '') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // In case private key exist we return it
            if (this.privateKey)
                return this.privateKey;
            switch (this.keyStoreData.version) {
                case 1:
                    this.wallet = yield ethereumjs_wallet_1.default.fromV1(this.keyStoreData, password);
                    break;
                case 3:
                    this.wallet = yield ethereumjs_wallet_1.default.fromV3(this.keyStoreData, password, true);
                    break;
                case 4:
                    this.wallet = yield this.fromV4(this.keyStoreData, password);
                    break;
            }
            if (this.wallet) {
                this.privateKey = this.wallet.getPrivateKey().toString('hex');
                if (!this.privateKey) {
                    throw new Error('Invalid password');
                }
            }
            return this.privateKey;
        });
    }
    /**
     * Import a wallet (Version 4 of the Ethereum wallet format).
     *
     * @param input A JSON serialized string, or an object representing V3 Keystore.
     * @param password The keystore password.
     */
    fromV4(input, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const json = typeof input === 'object' ? input : JSON.parse(input);
            if (json.version !== 4) {
                throw new Error('Not a V4 wallet');
            }
            let derivedKey;
            let kdfParams;
            if (json.crypto.kdf.function === 'scrypt') {
                kdfParams = json.crypto.kdf.params;
                derivedKey = (0, scrypt_js_1.syncScrypt)(Buffer.from(password), Buffer.from(kdfParams.salt, 'hex'), kdfParams.n, kdfParams.r, kdfParams.p, kdfParams.dklen);
            }
            else if (json.crypto.kdf.function === 'pbkdf2') {
                kdfParams = json.crypto.kdf.params;
                if (kdfParams.prf !== 'hmac-sha256') {
                    throw new Error('Unsupported parameters to PBKDF2');
                }
                derivedKey = crypto_1.default.pbkdf2Sync(Buffer.from(password), Buffer.from(kdfParams.salt, 'hex'), kdfParams.c, kdfParams.dklen, 'sha256');
            }
            else {
                throw new Error('Unsupported key derivation scheme');
            }
            const ciphertext = Buffer.from(json.crypto.cipher.message, 'hex');
            const checksumBuffer = Buffer.concat([Buffer.from(derivedKey.slice(16, 32)), ciphertext]);
            const hashFunctions = {
                keccak256: ethereumjs_util_1.keccak256,
                sha256: ethereumjs_util_1.sha256,
            };
            const hashFunction = hashFunctions[json.crypto.checksum.function];
            const mac = hashFunction(checksumBuffer);
            if (mac.toString('hex') !== json.crypto.checksum.message) {
                throw new Error('Invalid password');
            }
            const decipher = crypto_1.default.createDecipheriv(json.crypto.cipher.function, derivedKey.slice(0, 16), Buffer.from(json.crypto.cipher.params.iv, 'hex'));
            const seed = this.runCipherBuffer(decipher, ciphertext);
            return new ethereumjs_wallet_1.default(seed);
        });
    }
    /**
     * @param cipher
     * @param data
     */
    runCipherBuffer(cipher, data) {
        return Buffer.concat([cipher.update(data), cipher.final()]);
    }
    /**
     * Convert byte array to string
     * @param byteArray
     */
    static toHexString(byteArray) {
        return Array.from(byteArray, (byte) => {
            // eslint-disable-next-line no-bitwise
            return (`0${(byte & 0xFF).toString(16)}`).slice(-2);
        }).join('');
    }
}
exports.default = EthereumKeyStore;
//# sourceMappingURL=EthereumKeyStore.js.map