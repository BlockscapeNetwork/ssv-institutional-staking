import { FunctionComponent } from "preact";
export declare const TryExtensionLinkDialog: FunctionComponent<{
    darkMode: boolean;
    version: string;
    sessionId: string;
    sessionSecret: string;
    linkAPIUrl: string;
    isOpen: boolean;
    isConnected: boolean;
    isParentConnection: boolean;
    chainId: number;
    connectDisabled: boolean;
    onCancel: (() => void) | null;
}>;
