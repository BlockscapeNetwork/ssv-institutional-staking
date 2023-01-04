import { IOperatorData } from '../IOperatorData';
import { IKeySharesKeys } from '../IKeySharesKeys';
export declare class DuplicatedOperatorIdError extends Error {
    operator: IOperatorData;
    constructor(operator: IOperatorData, message: string);
}
export declare class DuplicatedOperatorPublicKeyError extends Error {
    operator: IOperatorData;
    constructor(operator: IOperatorData, message: string);
}
export declare class OperatorsWithSharesCountsMismatchError extends Error {
    operators: IOperatorData[];
    shares: IKeySharesKeys | null | undefined;
    constructor(operators: IOperatorData[], shares: IKeySharesKeys | null | undefined, message: string);
}
