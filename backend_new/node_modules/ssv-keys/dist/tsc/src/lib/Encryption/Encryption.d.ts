import { IShares } from '../Threshold';
export declare class InvalidOperatorKeyException extends Error {
    operator: any;
    constructor(operator: {
        rsa: string;
        base64: string;
    }, message: string);
}
export interface EncryptShare {
    operatorPublicKey: string;
    privateKey: string;
    publicKey: string;
}
export default class Encryption {
    private readonly operators;
    private readonly shares;
    RAW_OPERATOR_PUBLIC_KEY_SIGNATURE: RegExp;
    constructor(operators: string[], shares: IShares[]);
    encrypt(): EncryptShare[];
}
