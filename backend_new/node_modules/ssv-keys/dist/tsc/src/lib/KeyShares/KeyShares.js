"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyShares = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const KeySharesDataV2_1 = require("./KeySharesData/KeySharesDataV2");
const KeySharesPayloadV2_1 = require("./KeySharesData/KeySharesPayloadV2");
/**
 * Key shares file data interface.
 */
class KeyShares {
    /**
     * @param version
     */
    constructor({ version }) {
        // Versions of deeper structures
        this.byVersion = {
            'payload': {
                [KeyShares.VERSION_V2]: KeySharesPayloadV2_1.KeySharesPayloadV2,
            },
            'data': {
                [KeyShares.VERSION_V2]: KeySharesDataV2_1.KeySharesDataV2,
            }
        };
        this.version = version;
    }
    /**
     * Set final payload for web3 transaction and validate it.
     * @param payload
     */
    setPayload(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.usePayload(payload, this.version);
            return this;
        });
    }
    /**
     * Set new data and validate it.
     * @param data
     */
    setData(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.useData(data, this.version);
            return this;
        });
    }
    /**
     * Instantiate key shares from raw data as string or object.
     * @param data
     */
    static fromData(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Parse json
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            const keyShares = new KeyShares({ version: data.version });
            yield keyShares.setData(data.data);
            yield keyShares.setPayload(data.payload);
            return keyShares;
        });
    }
    /**
     * Set payload as new or existing instance and update its internal data.
     * @param payload
     * @param version
     */
    usePayload(payload, version) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.payload = this.payload || this.getByVersion('payload', version);
            if (this.payload) {
                yield this.payload.setData(payload);
                yield this.validate();
            }
        });
    }
    /**
     * Get entity by version.
     * @param entity
     * @param version
     * @private
     */
    getByVersion(entity, version) {
        if (!this.byVersion[entity]) {
            throw Error(`"${entity}" is unknown entity`);
        }
        if (!this.byVersion[entity][version]) {
            throw Error(`"${entity}" is not supported in version of key shares: ${version}`);
        }
        return new this.byVersion[entity][version]();
    }
    /**
     * Get final data converted from raw data.
     * @param data
     * @param version
     */
    useData(data, version) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!data) {
                return;
            }
            this.data = this.data || this.getByVersion('data', version);
            if (this.data) {
                yield this.data.setData(data);
                yield this.validate();
            }
        });
    }
    /**
     * Validate everything
     */
    validate() {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Validate classes and structures
            yield (0, class_validator_1.validateOrReject)(this).catch(errors => {
                throw Error(`Key shares file have wrong format. Errors: ${JSON.stringify(errors, null, '  ')}`);
            });
            // Validate data and payload
            yield ((_a = this.payload) === null || _a === void 0 ? void 0 : _a.validate());
            yield ((_b = this.data) === null || _b === void 0 ? void 0 : _b.validate());
        });
    }
    /**
     * Stringify key shares to be ready for saving in file.
     */
    toString() {
        return JSON.stringify({
            version: this.version,
            data: this.data || null,
            payload: this.payload || null,
            createdAt: new Date().toISOString()
        }, null, '  ');
    }
}
KeyShares.VERSION_V2 = 'v2';
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)()
], KeyShares.prototype, "version", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)()
], KeyShares.prototype, "data", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)()
], KeyShares.prototype, "payload", void 0);
exports.KeyShares = KeyShares;
//# sourceMappingURL=KeyShares.js.map