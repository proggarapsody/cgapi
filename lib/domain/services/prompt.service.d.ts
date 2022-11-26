import type { CgapiConfigType } from '../../infrastructure/types/cgapi.types.js';
import type { IPromptService } from '../interfaces/prompt-service.interface.js';
export declare class PromptService implements IPromptService {
    private inquirerInstance;
    private basePath;
    constructor();
    selectType(): Promise<CgapiConfigType['type']>;
    selectPostmanUrl(): Promise<string>;
    selectOpenapiUrl(): Promise<string>;
    selectGqlUrl(): Promise<string | undefined>;
    /**
     * It asks the user to select a directory which would contains openapi files, and then returns the path to that directory.
     * @returns api path
     * @example 'src/api'
     */
    selectApiPath(): Promise<string | undefined>;
    /**
     * It asks the user to select a directory which would contains openapi files, and then returns the path to that directory.
     * @returns path to gql files: documents and schema
     * @example 'src/gql'
     */
    selectGqlPath(): Promise<string | undefined>;
    selectConfigPath(): Promise<string | undefined>;
}
