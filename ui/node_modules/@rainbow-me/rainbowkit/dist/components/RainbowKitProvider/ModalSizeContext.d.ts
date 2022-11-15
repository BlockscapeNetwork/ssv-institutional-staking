/// <reference types="react" />
export declare const ModalSizeOptions: {
    readonly COMPACT: "compact";
    readonly WIDE: "wide";
};
export declare type ModalSizes = typeof ModalSizeOptions[keyof typeof ModalSizeOptions];
export declare const ModalSizeContext: import("react").Context<ModalSizes>;
