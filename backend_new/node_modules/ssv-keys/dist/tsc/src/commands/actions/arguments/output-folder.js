"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const os_1 = tslib_1.__importDefault(require("os"));
const path_1 = tslib_1.__importDefault(require("path"));
const defaultTargetPath = `${path_1.default.join(os_1.default.homedir(), 'ssv-keys')}${path_1.default.sep}`;
exports.default = {
    arg1: '-of',
    arg2: '--output-folder',
    options: {
        type: String,
        required: false,
        default: defaultTargetPath,
        help: `Target path to generate the output to. Default: ${defaultTargetPath}`
    },
    interactive: {
        options: {
            type: 'text',
            message: 'Please provide a target path to generate the output to',
            initial: defaultTargetPath,
            validate: (value) => {
                value = value.trim();
                return !value ? 'Invalid target path' : true;
            }
        }
    }
};
//# sourceMappingURL=output-folder.js.map