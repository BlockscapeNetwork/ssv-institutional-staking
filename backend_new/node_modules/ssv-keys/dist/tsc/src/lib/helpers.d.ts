/**
 * Read file contents and return json data from it.
 * @param filePath
 * @param json
 */
export declare const readFile: (filePath: string, json?: boolean) => Promise<any>;
/**
 * Write file contents.
 * @param filePath
 * @param data
 */
export declare const writeFile: (filePath: string, data: string) => Promise<any>;
/**
 * Create SSV keys directory to work in scope of in user home directory
 */
export declare const createSSVDir: (outputFolder: string) => Promise<any>;
/**
 * Get SSV keys directory to work in scope of in user home directory.
 * Create it before, if it doesn't exist.
 */
export declare const getSSVDir: (outputFolder: string) => Promise<string>;
export declare const getFilePath: (name: string, outputFolder: string, withTime?: boolean) => Promise<string>;
