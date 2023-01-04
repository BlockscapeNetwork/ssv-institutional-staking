"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const figlet_1 = tslib_1.__importDefault(require("figlet"));
const package_json_1 = tslib_1.__importDefault(require("../package.json"));
const SSVKeysCommand_1 = require("./commands/SSVKeysCommand");
const FigletMessage = (message) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => {
        (0, figlet_1.default)(message, (error, output) => {
            if (error) {
                return resolve('');
            }
            resolve(output);
        });
    });
});
function main(interactive) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const messageText = `SSV Keys v${package_json_1.default.version}`;
        const message = yield FigletMessage(messageText);
        if (message) {
            console.log(' ----------------------------------------------------------------------');
            console.log(`${message || messageText}`);
            console.log(' ----------------------------------------------------------------------');
            for (const str of String(package_json_1.default.description).match(/.{1,67}/g) || []) {
                console.log(` ${str}`);
            }
            console.log(' ----------------------------------------------------------------------\n');
        }
        const command = new SSVKeysCommand_1.SSVKeysCommand(interactive);
        yield command.execute().then(console.debug).catch(console.error);
    });
}
exports.default = main;
//# sourceMappingURL=cli-shared.js.map