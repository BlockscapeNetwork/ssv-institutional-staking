"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const big_numbers_1 = require("../validators/big-numbers");
exports.default = {
    arg1: '-ssv',
    arg2: '--ssv-token-amount',
    options: {
        type: String,
        required: true,
        help: 'How much SSV would you like to deposit with the transaction(wei)?'
    },
    interactive: {
        options: {
            type: 'text',
            validate: (value) => {
                if (!String(value).trim().length) {
                    return 'Invalid ssv amount';
                }
                return (0, big_numbers_1.bigNumberValidator)(value, 'Invalid ssv amount');
            }
        }
    }
};
//# sourceMappingURL=ssv-amount.js.map