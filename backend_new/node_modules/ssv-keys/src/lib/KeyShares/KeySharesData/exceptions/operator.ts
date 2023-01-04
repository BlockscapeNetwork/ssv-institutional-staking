import { IOperatorData } from '../IOperatorData';
import { IKeySharesKeys } from '../IKeySharesKeys';

export class DuplicatedOperatorIdError extends Error {
  public operator: IOperatorData;

  constructor(operator: IOperatorData, message: string) {
    super(message);
    this.operator = operator;
  }
}

export class DuplicatedOperatorPublicKeyError extends Error {
  public operator: IOperatorData;

  constructor(operator: IOperatorData, message: string) {
    super(message);
    this.operator = operator;
  }
}

export class OperatorsWithSharesCountsMismatchError extends Error {
  public operators: IOperatorData[];
  public shares: IKeySharesKeys  | null | undefined;

  constructor(operators: IOperatorData[], shares: IKeySharesKeys  | null | undefined, message: string) {
    super(message);
    this.operators = operators;
    this.shares = shares;
  }
}
