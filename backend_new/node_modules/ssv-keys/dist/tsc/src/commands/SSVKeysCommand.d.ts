import { BaseCommand } from './BaseCommand';
import { KeySharesAction } from './actions/KeySharesAction';
export declare class SSVKeysCommand extends BaseCommand {
    /**
     * List of all supported command actions.
     * @protected
     */
    protected actions: (typeof KeySharesAction)[];
    protected useAction: string;
    /**
     * Add more specific help.
     */
    constructor(interactive?: boolean, options?: undefined);
}
