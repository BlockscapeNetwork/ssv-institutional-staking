declare const _default: {
    arg1: string;
    arg2: string;
    options: {
        type: StringConstructor;
        required: boolean;
        help: string;
    };
    interactive: {
        options: {
            type: string;
            validate: (value: string) => string | boolean;
        };
    };
};
export default _default;
