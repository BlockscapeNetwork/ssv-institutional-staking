"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigNumberValidator = void 0;
const tslib_1 = require("tslib");
const web3_1 = tslib_1.__importDefault(require("web3"));
const web3 = new web3_1.default();
const bigNumberValidator = (value, message) => {
    try {
        web3.utils.toBN(value).toString();
        return true;
    }
    catch (e) {
        return message || 'Token amount should be positive big number in Wei';
    }
};
exports.bigNumberValidator = bigNumberValidator;
//# sourceMappingURL=big-numbers.js.map