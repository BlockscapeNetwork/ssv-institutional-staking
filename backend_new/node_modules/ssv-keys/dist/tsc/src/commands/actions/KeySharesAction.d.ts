import { BaseAction } from './BaseAction';
/**
 * Command to build keyshares from user input.
 */
export declare class KeySharesAction extends BaseAction {
    static get options(): any;
    /**
     * Decrypt and return private key.
     */
    execute(): Promise<any>;
}
