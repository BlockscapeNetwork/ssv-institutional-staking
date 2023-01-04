"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePath = exports.getSSVDir = exports.createSSVDir = exports.writeFile = exports.readFile = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const fs_2 = require("fs");
/**
 * Read file contents and return json data from it.
 * @param filePath
 * @param json
 */
const readFile = (filePath, json = true) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return fs_2.promises.readFile(filePath, { encoding: 'utf-8' }).then((data) => {
        return json ? JSON.parse(data) : data;
    });
});
exports.readFile = readFile;
/**
 * Write file contents.
 * @param filePath
 * @param data
 */
const writeFile = (filePath, data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return fs_2.promises.writeFile(filePath, data, { encoding: 'utf-8' }).then(() => {
        return { filePath, data };
    });
});
exports.writeFile = writeFile;
/**
 * Create SSV keys directory to work in scope of in user home directory
 */
const createSSVDir = (outputFolder) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return fs_2.promises.mkdir(outputFolder, { recursive: true });
});
exports.createSSVDir = createSSVDir;
/**
 * Get SSV keys directory to work in scope of in user home directory.
 * Create it before, if it doesn't exist.
 */
const getSSVDir = (outputFolder) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!fs_1.default.existsSync(outputFolder)) {
        yield (0, exports.createSSVDir)(outputFolder);
    }
    return outputFolder.endsWith(path_1.default.sep) ? outputFolder : `${outputFolder}${path_1.default.sep}`;
});
exports.getSSVDir = getSSVDir;
const getFilePath = (name, outputFolder, withTime = true) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return `${yield (0, exports.getSSVDir)(outputFolder)}${name}${withTime ? '-' + (0, moment_1.default)().format('YYYYMMDD_hhmmss') : ''}.json`;
});
exports.getFilePath = getFilePath;
//# sourceMappingURL=helpers.js.map