import type { CodegenConfig } from '@graphql-codegen/cli';
import type { ConfigFile } from '@rtk-query/codegen-openapi';
import { IConfigService } from '../interfaces/config-service.interface.js';
import { IFileService } from '../interfaces/file-service.interface.js';
import type { IGenerator } from '../interfaces/generator.interface.js';
import { IPostmanService } from '../interfaces/postman-service.interface.js';
import { IPromptService } from '../interfaces/prompt-service.interface.js';
export declare class RtqService implements IGenerator {
    private readonly _configService;
    private readonly _fileService;
    private readonly _postmanService;
    private readonly _promptService;
    private readonly mainConfig;
    constructor(_configService: IConfigService, _fileService: IFileService, _postmanService: IPostmanService, _promptService: IPromptService);
    /**
     * It reads a file and returns the contents of that file as a JSON object.
     * @returns {CodegenConfig} The GraphQL config file.
     */
    private getGraphqlConfig;
    /**
     * It reads a file and returns the contents of the file as a JSON object.
     * @returns {ConfigFile} The openapi config file.
     */
    private getOpenapiConfig;
    /**
     * Find the default gql base-api template file
     * @returns The path to the file.
     * @throws Error if the file is not found.
     */
    private getDefaultGqlBaseApiPath;
    /**
     * Create base gql api file by copying the default template
     * @param {string} gqlBaseApiPath
     */
    private createGqlBaseApi;
    /**
     * Find the default openapi base-api template file
     * @returns The path to the file.
     * @throws Error if the file is not found.
     */
    private getDefaultOpenapiBaseApiPath;
    /**
     * Create base openapi api file by copying the default template
     * @param {string} openapiBaseApiPath
     */
    private createOpenapiBaseApi;
    private getOpenapiBaseApiPath;
    private generateOpenapi;
    private generateGraphql;
    /**
     * `generate` is an async function that takes two boolean arguments, `openapi` and `graphql`. If
     * `openapi` is true, it calls `generateOpenapi` and if `graphql` is true, it calls `generateGraphql`
     * @param {boolean} openapi - boolean - whether or not to generate the OpenAPI spec
     * @param {boolean} graphql - boolean - If true, the GraphQL schema will be generated.
     * @returns Nothing.
     */
    generate(openapi: boolean, graphql: boolean): Promise<void>;
    init(openapi: boolean, graphql: boolean): Promise<void>;
    /**
     * Generates a graphql config file based on the main config file
     */
    generateGqlConfig(): Promise<CodegenConfig & {
        gqlBaseApiPath: string;
    }>;
    generateOpenapiConfig(): Promise<ConfigFile & {
        openapiBaseApiPath: string;
    }>;
}
