"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAction = void 0;
const tslib_1 = require("tslib");
class BaseAction {
    constructor() {
        this.args = {};
    }
    setArgs(args) {
        this.args = args;
        return this;
    }
    execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw Error('Should implement "execute"');
        });
    }
    static get options() {
        throw Error('Should implement static "options"');
    }
    get options() {
        return BaseAction.options;
    }
    /**
     * Pre-execution method which can be run before execution logic.
     */
    preExecute() {
        return;
    }
    /**
     * Pre-options reading method which can be run before the logic where options read happened.
     * Should also return options which can be changed.
     * @param options
     */
    preOptions(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return options;
        });
    }
}
exports.BaseAction = BaseAction;
//# sourceMappingURL=BaseAction.js.map