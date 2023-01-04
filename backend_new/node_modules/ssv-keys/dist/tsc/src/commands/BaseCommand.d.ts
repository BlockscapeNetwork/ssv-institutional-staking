import { ArgumentParser, SubParser } from 'argparse';
export declare class BaseCommand extends ArgumentParser {
    /**
     * List of all supported command actions.
     * @protected
     */
    protected actions: any[];
    protected actionParsers: any;
    protected subParserOptions: {
        title: string;
        description: string;
        help: string;
    };
    /**
     * Argparse sub parser to hold all the command actions options.
     * @protected
     */
    protected subParsers: SubParser | undefined;
    protected interactive: boolean;
    protected useAction: string | undefined;
    /**
     * @param interactive if the command should be interactive instead of classic CLI
     * @param options argparse options
     */
    constructor(interactive?: boolean, options?: undefined);
    /**
     * Add actions sub-parsers.
     */
    addActionsSubParsers(): ArgumentParser;
    /**
     * Interactively ask user for action
     */
    askAction(): Promise<string>;
    /**
     * Pre-fill all values from arguments of executable
     * @param selectedAction
     * @param clearProcessArgs
     */
    prefillFromArguments(selectedAction: string, clearProcessArgs?: boolean): Record<string, any>;
    /**
     * Pre-fill prompts from array data on specific index
     * @param dataIndex
     * @param argument
     * @param promptOptions
     * @param preFilledValues
     */
    prefillFromArrayData(dataIndex: number, argument: any, promptOptions: any, preFilledValues: Record<string, any>): void;
    /**
     * Interactively ask user for action to execute, and it's arguments.
     * Populate process.argv with user input.
     */
    executeInteractive(): Promise<any>;
    /**
     * Find argument in list of arguments by its arg2 value.
     * @param extraArgumentName
     * @param actionArguments
     */
    findArgumentByName(extraArgumentName: string, actionArguments: any[]): any;
    /**
     * Returns list of arguments for selected user action
     * @param userAction
     */
    getArgumentsForAction(userAction: string): any;
    /**
     * Make an argument name useful for the flow
     * @param arg
     * @protected
     */
    protected sanitizeArgument(arg: string): string;
    /**
     * Compile final prompt options
     * @param argument
     */
    getPromptOptions(argument: any): any;
    execute(): Promise<void>;
}
