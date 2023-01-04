"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorsWithSharesCountsMismatchError = exports.DuplicatedOperatorPublicKeyError = exports.DuplicatedOperatorIdError = void 0;
class DuplicatedOperatorIdError extends Error {
    constructor(operator, message) {
        super(message);
        this.operator = operator;
    }
}
exports.DuplicatedOperatorIdError = DuplicatedOperatorIdError;
class DuplicatedOperatorPublicKeyError extends Error {
    constructor(operator, message) {
        super(message);
        this.operator = operator;
    }
}
exports.DuplicatedOperatorPublicKeyError = DuplicatedOperatorPublicKeyError;
class OperatorsWithSharesCountsMismatchError extends Error {
    constructor(operators, shares, message) {
        super(message);
        this.operators = operators;
        this.shares = shares;
    }
}
exports.OperatorsWithSharesCountsMismatchError = OperatorsWithSharesCountsMismatchError;
//# sourceMappingURL=operator.js.map