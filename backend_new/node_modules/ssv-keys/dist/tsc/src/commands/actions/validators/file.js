"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizePath = exports.jsonFileValidator = exports.fileExistsValidator = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const fileExistsValidator = (filePath, message = '') => {
    filePath = (0, exports.sanitizePath)(filePath);
    return fs_1.default.existsSync(filePath.trim()) ? true : message || 'File does not exists';
};
exports.fileExistsValidator = fileExistsValidator;
const jsonFileValidator = (filePath, message = '') => {
    let fileContents;
    filePath = (0, exports.sanitizePath)(filePath);
    try {
        fileContents = fs_1.default.readFileSync(filePath, { encoding: 'utf-8' });
    }
    catch (e) {
        return message || 'Can not read file';
    }
    try {
        JSON.parse(fileContents);
    }
    catch (e) {
        return message || 'File is not a JSON file';
    }
    return true;
};
exports.jsonFileValidator = jsonFileValidator;
/**
 * Make sure the path contains
 * @param path
 * @param regex
 */
const sanitizePath = (path, regex) => {
    return path.replace(regex || /\\([^a-zA-Z0-9_])/g, "$1");
};
exports.sanitizePath = sanitizePath;
//# sourceMappingURL=file.js.map