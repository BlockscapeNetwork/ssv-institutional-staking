"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const keystore_password_1 = require("../validators/keystore-password");
exports.default = {
    arg1: '-ps',
    arg2: '--password',
    options: {
        required: true,
        type: String,
        help: 'Enter password for provided keystore file'
    },
    interactive: {
        options: {
            type: 'password',
            validate: (password) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                return yield keystore_password_1.keystorePasswordValidator.validatePassword(password);
            }),
        }
    }
};
//# sourceMappingURL=password.js.map