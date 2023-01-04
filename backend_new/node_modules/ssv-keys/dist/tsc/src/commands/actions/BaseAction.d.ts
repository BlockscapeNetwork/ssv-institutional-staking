import { ArgumentOptions, Namespace } from 'argparse';
export interface ActionArgument {
    arg1: string;
    arg2: string;
    options: ArgumentOptions;
}
export interface ActionOptions {
    action: string;
    shortAction: string;
    arguments: ActionArgument[];
}
export declare class BaseAction {
    protected args: Namespace;
    setArgs(args: Namespace): BaseAction;
    execute(): Promise<any>;
    static get options(): any;
    get options(): any;
    /**
     * Pre-execution method which can be run before execution logic.
     */
    preExecute(): void;
    /**
     * Pre-options reading method which can be run before the logic where options read happened.
     * Should also return options which can be changed.
     * @param options
     */
    preOptions(options: any): Promise<any>;
}
