import { IKeySharesData } from './IKeySharesData';
import { OperatorDataV2 } from './OperatorDataV2';
import { KeySharesKeysV2 } from './KeySharesKeysV2';
export declare class KeySharesDataV2 implements IKeySharesData {
    publicKey?: string | null;
    operators?: OperatorDataV2[] | null;
    shares?: KeySharesKeysV2 | null;
    setData(data: any): void;
    /**
     * Do all possible validations.
     */
    validate(): Promise<any>;
    /**
     * Get the list of shares public keys.
     */
    get sharesPublicKeys(): string[];
    /**
     * Get the list of encrypted shares.
     */
    get sharesEncryptedKeys(): string[];
    /**
     * Get the list of operators IDs.
     */
    get operatorIds(): number[];
    /**
     * Get the list of operators public keys.
     */
    get operatorPublicKeys(): string[];
    /**
     * Try to BLS deserialize validator public key.
     */
    validatePublicKey(): Promise<any>;
    /**
     * Check that counts are consistent.
     */
    validateCounts(): Promise<any>;
    /**
     * Validate all operators
     */
    validateOperators(): Promise<any>;
    /**
     * Do not allow to use duplicated operator IDs and public keys.
     */
    validateDuplicates(): Promise<void>;
}
