"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSVKeysCommand = void 0;
const BaseCommand_1 = require("./BaseCommand");
const KeySharesAction_1 = require("./actions/KeySharesAction");
class SSVKeysCommand extends BaseCommand_1.BaseCommand {
    /**
     * Add more specific help.
     */
    constructor(interactive = false, options = undefined) {
        super(interactive, options);
        /**
         * List of all supported command actions.
         * @protected
         */
        this.actions = [
            KeySharesAction_1.KeySharesAction,
        ];
        this.useAction = 'key-shares';
        this.subParserOptions.help += 'Example: "ssv-keys key-shares --help" or "ssv-keys ksh --help"';
    }
}
exports.SSVKeysCommand = SSVKeysCommand;
//# sourceMappingURL=SSVKeysCommand.js.map