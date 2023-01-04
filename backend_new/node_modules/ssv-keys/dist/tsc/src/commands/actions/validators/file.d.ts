export declare const fileExistsValidator: (filePath: string, message?: string) => boolean | string;
export declare const jsonFileValidator: (filePath: string, message?: string) => boolean | string;
/**
 * Make sure the path contains
 * @param path
 * @param regex
 */
export declare const sanitizePath: (path: string, regex?: RegExp) => string;
