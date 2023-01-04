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
        repeatWith: string[];
        options: {
            type: string;
            message: string;
            validate: (operatorId: number) => boolean | string;
        };
    };
};
export default _default;
