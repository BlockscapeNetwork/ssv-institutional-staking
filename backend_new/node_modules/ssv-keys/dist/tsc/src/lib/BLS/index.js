"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let index;
try {
    window.crypto;
    index = require('bls-eth-wasm/browser');
}
catch (_a) {
    index = require('bls-eth-wasm');
}
exports.default = index;
//# sourceMappingURL=index.js.map