declare const _default: {
    arg1: string;
    arg2: string;
    options: {
        type: StringConstructor;
        required: boolean;
        default: string;
        help: string;
    };
    interactive: {
        options: {
            type: string;
            message: string;
            initial: string;
            validate: (value: string) => true | "Invalid target path";
        };
    };
};
export default _default;
