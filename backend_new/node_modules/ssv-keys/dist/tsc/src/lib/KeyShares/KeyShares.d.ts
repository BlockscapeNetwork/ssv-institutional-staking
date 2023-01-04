import { KeySharesDataV2 } from './KeySharesData/KeySharesDataV2';
import { KeySharesPayloadV2 } from './KeySharesData/KeySharesPayloadV2';
export declare type KeySharesData = KeySharesDataV2;
export declare type KeySharesPayload = KeySharesPayloadV2;
/**
 * Key shares file data interface.
 */
export declare class KeyShares {
    static VERSION_V2: string;
    private byVersion;
    version: string;
    data?: KeySharesData | null;
    payload?: KeySharesPayload | null;
    /**
     * @param version
     */
    constructor({ version }: {
        version: string;
    });
    /**
     * Set final payload for web3 transaction and validate it.
     * @param payload
     */
    setPayload(payload: any): Promise<KeyShares>;
    /**
     * Set new data and validate it.
     * @param data
     */
    setData(data: any): Promise<KeyShares>;
    /**
     * Instantiate key shares from raw data as string or object.
     * @param data
     */
    static fromData(data: string | any): Promise<KeyShares>;
    /**
     * Set payload as new or existing instance and update its internal data.
     * @param payload
     * @param version
     */
    usePayload(payload: any, version: string): Promise<any>;
    /**
     * Get entity by version.
     * @param entity
     * @param version
     * @private
     */
    private getByVersion;
    /**
     * Get final data converted from raw data.
     * @param data
     * @param version
     */
    useData(data: any, version: string): Promise<any>;
    /**
     * Validate everything
     */
    validate(): Promise<any>;
    /**
     * Stringify key shares to be ready for saving in file.
     */
    toString(): string;
}
