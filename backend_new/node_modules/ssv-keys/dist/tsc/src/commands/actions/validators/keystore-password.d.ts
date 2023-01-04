export declare class KeystorePasswordValidator {
    protected keystoreFilePath: string;
    setKeystoreFilePath(filePath: string): void;
    validatePassword(password: string): Promise<boolean | string>;
}
export declare const keystorePasswordValidator: KeystorePasswordValidator;
