import Web3 from 'web3';
import { KeyShares } from './KeyShares/KeyShares';
import { IShares, ISharesKeyPairs } from './Threshold';
import { EncryptShare } from './Encryption/Encryption';
/**
 * SSVKeys class provides high-level methods to easily work with entire flow:
 *  - getting private key from keystore file using password
 *  - creating shares threshold
 *  - creating final shares
 *  - building final payload which is ready to be used in web3 transaction
 */
export declare class SSVKeys {
    static SHARES_FORMAT_ABI: string;
    protected web3Instances: any;
    protected threshold: ISharesKeyPairs | undefined;
    /**
     * Getting instance of web3
     * @param nodeUrl
     */
    getWeb3(nodeUrl?: string): Web3;
    /**
     * Extract private key from keystore data using keystore password.
     * Generally can be used in browsers when the keystore data has been provided by browser.
     * @param data
     * @param password
     */
    getPrivateKeyFromKeystoreData(data: string, password: string): Promise<string>;
    /**
     * Build threshold using private key for number of participants and failed participants.
     * @param privateKey
     * @param operators
     */
    createThreshold(privateKey: string, operators: number[]): Promise<ISharesKeyPairs>;
    /**
     * Encrypt operators shares using operators public keys.
     * @param operatorsPublicKeys
     * @param shares
     * @param sharesFormat
     */
    encryptShares(operatorsPublicKeys: string[], shares: IShares[], sharesFormat?: string): Promise<EncryptShare[]>;
    /**
     * Build shares from private key, operator IDs and public keys
     * @param privateKey
     * @param operatorIds
     * @param operatorPublicKeys
     */
    buildShares(privateKey: string, operatorIds: number[], operatorPublicKeys: string[]): Promise<EncryptShare[]>;
    /**
     * Getting threshold if it has been created before.
     */
    getThreshold(): ISharesKeyPairs | undefined;
    /**
     * Getting public key of validator
     */
    getValidatorPublicKey(): string;
    /**
     * Encode with Web3 eth abi method any fields of shares array required for transaction.
     * @param encryptedShares
     * @param field
     */
    abiEncode(encryptedShares: any[], field?: string): string[];
    /**
     * Build payload from encrypted shares, validator public key and operator IDs
     * @param validatorPublicKey
     * @param operatorsIds
     * @param encryptedShares
     * @param ssvAmount
     */
    buildPayload(validatorPublicKey: string, operatorsIds: number[], encryptedShares: EncryptShare[], ssvAmount: string | number): any;
    /**
     * Build payload from keyshares file with operators and shares details inside.
     * If ssv amount is not provided - it will be taken from keyshares file if exist there or set to 0.
     * @param keyShares
     * @param ssvAmount
     */
    buildPayloadFromKeyShares(keyShares: KeyShares, ssvAmount?: string | number): any;
}
