declare const _default: {
    arg1: string;
    arg2: string;
    options: {
        type: StringConstructor;
        required: boolean;
        help: string;
    };
    interactive: {
        repeat: number;
        options: {
            type: string;
            message: string;
            validate: (value: string) => Promise<string | boolean>;
        };
    };
};
export default _default;
