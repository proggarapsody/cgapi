import type { CgapiType } from '../types/cgapi.types.js';
export declare class DefaultConfigsHelper {
    private static dataPath;
    /**
     * It returns a promise that resolves to a default configuration object for the specified type
     * @param {CgapiType} type - CgapiType - This is the type of codegen you want to use.
     * @returns The default export of the file.
     */
    static gql(type: CgapiType): Promise<any>;
    /**
     * It's a function that returns a promise that resolves to a ConfigFile object
     * @param {CgapiType} type - CgapiType
     * @returns The default export of the file.
     */
    static openapi(type: CgapiType): Promise<any>;
}
