import { IKeySharesKeys } from './IKeySharesKeys';
export declare class KeySharesKeysV2 implements IKeySharesKeys {
    publicKeys: string[] | undefined;
    encryptedKeys: string[] | undefined;
    /**
     * Set public and encrypted keys from data.
     * @param data
     */
    setData(data: any): void;
    /**
     * Validation of all data.
     */
    validate(): Promise<void>;
    /**
     * If shares encrypted keys are ABI encoded - try to decode them.
     */
    validateEncryptedKeys(): Promise<any>;
    /**
     * Try to BLS deserialize shares public keys.
     */
    validatePublicKeys(): Promise<any>;
    /**
     * Validate that the data is the array of strings.
     * @param data
     */
    validateArrayOfStrings(data: any): void;
}
