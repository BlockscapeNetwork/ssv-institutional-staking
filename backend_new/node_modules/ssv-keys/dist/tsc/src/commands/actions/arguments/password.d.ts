declare const _default: {
    arg1: string;
    arg2: string;
    options: {
        required: boolean;
        type: StringConstructor;
        help: string;
    };
    interactive: {
        options: {
            type: string;
            validate: (password: string) => Promise<boolean | string>;
        };
    };
};
export default _default;
