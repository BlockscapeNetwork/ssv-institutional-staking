"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const operator_1 = require("../validators/operator");
const uniqueOperators = {};
exports.default = {
    arg1: '-ok',
    arg2: '--operators-keys',
    options: {
        type: String,
        required: true,
        help: 'Comma-separated list of base64 operator keys. ' +
            'Require at least 4 operators'
    },
    interactive: {
        repeat: 4,
        options: {
            type: 'text',
            message: 'Enter operator key for {{index}} operator',
            validate: (value) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                if (uniqueOperators[value]) {
                    return 'This operator already used';
                }
                const returnValue = yield (0, operator_1.operatorValidator)(value);
                if (returnValue === true) {
                    uniqueOperators[value] = true;
                }
                return returnValue;
            })
        }
    }
};
//# sourceMappingURL=operator-public-keys.js.map