var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { generate as generateGql } from '@graphql-codegen/cli';
import { generateEndpoints, parseConfig } from '@rtk-query/codegen-openapi';
import chalk from 'chalk';
import { inject, injectable } from 'inversify';
import { DefaultConfigsHelper } from '../../infrastructure/utils/config-paths.js';
import { ConstantsHelper } from '../../infrastructure/utils/constants.js';
import { Locator } from '../../infrastructure/utils/locator.js';
let RtqService = class RtqService {
    constructor(_configService, _fileService, _postmanService, _promptService) {
        this._configService = _configService;
        this._fileService = _fileService;
        this._postmanService = _postmanService;
        this._promptService = _promptService;
        const config = this._configService.getMainConfig();
        if (!config) {
            throw new Error(chalk.red('ERROR[client]: No config file found. Please run cgapi init to create a config file.'));
        }
        this.mainConfig = config;
    }
    /**
     * It reads a file and returns the contents of that file as a JSON object.
     * @returns {CodegenConfig} The GraphQL config file.
     */
    getGraphqlConfig() {
        const config = this._fileService.readFile(this.mainConfig.configPath + ConstantsHelper.GRAPH_QL_CONFIG_NAME);
        if (!config)
            return null;
        return JSON.parse(config);
    }
    /**
     * It reads a file and returns the contents of the file as a JSON object.
     * @returns {ConfigFile} The openapi config file.
     */
    getOpenapiConfig() {
        const config = this._fileService.readFile(this.mainConfig.configPath + ConstantsHelper.API_CONFIG_NAME);
        if (!config) {
            throw new Error(chalk.red('ERROR[client]: No config file found. Please run cgapi init to create a config file.'));
        }
        return JSON.parse(config);
    }
    /**
     * Find the default gql base-api template file
     * @returns The path to the file.
     * @throws Error if the file is not found.
     */
    async getDefaultGqlBaseApiPath() {
        const defaultGqlApiPath = this._fileService.findFileSync(`**/rtq/${ConstantsHelper.DEFAULT_GQL_BASEAPI_NAME}`);
        if (!defaultGqlApiPath || defaultGqlApiPath.length === 0) {
            throw new Error(chalk.red('ERROR[app]: default gql base-api file has not founded.'));
        }
        return defaultGqlApiPath[0];
    }
    /**
     * Create base gql api file by copying the default template
     * @param {string} gqlBaseApiPath
     */
    async createGqlBaseApi(gqlBaseApiPath) {
        const defaultGqlBaseApiPath = await this.getDefaultGqlBaseApiPath();
        await this._fileService.copyFile(defaultGqlBaseApiPath, gqlBaseApiPath);
    }
    /**
     * Find the default openapi base-api template file
     * @returns The path to the file.
     * @throws Error if the file is not found.
     */
    async getDefaultOpenapiBaseApiPath() {
        const defaultOpenapiPath = this._fileService.findFileSync(`**/rtq/${ConstantsHelper.DEFAULT_OPENAPI_BASEAPI_NAME}`);
        console.log('PATH:', defaultOpenapiPath);
        if (!defaultOpenapiPath || defaultOpenapiPath.length === 0) {
            throw new Error('ERROR[app]: default openapi base-api file has not founded.\n');
        }
        return defaultOpenapiPath[0];
    }
    /**
     * Create base openapi api file by copying the default template
     * @param {string} openapiBaseApiPath
     */
    async createOpenapiBaseApi(openapiBaseApiPath) {
        const defaultOpenapiBaseApiPath = await this.getDefaultOpenapiBaseApiPath();
        await this._fileService.copyFile(defaultOpenapiBaseApiPath, openapiBaseApiPath);
    }
    async getOpenapiBaseApiPath() {
        const apiFilePath = await this._fileService.findFile(`**/${ConstantsHelper.BASE_RTQ_API_NAME}`);
        if (!apiFilePath || apiFilePath.length === 0) {
            throw new Error(chalk.red('ERROR[client]: base api file not found. Please run `cgapi init` to create a base api file.'));
        }
        return apiFilePath[0];
    }
    // TODO integrate postman collection to openapi
    async generateOpenapi() {
        const { isPostman, configPath } = this.mainConfig;
        if (isPostman) {
            await this._postmanService.convertPostmanToOpenapi();
        }
        // 1 check if base api file exist in api path + ConstantsHelper.BASE_RTQ_API_NAME
        const config = this.getOpenapiConfig();
        if (!config.schemaFile && !isPostman) {
            throw new Error(chalk.red('ERROR[client]: Schema file field is empty. Please add url to openapi json file in openapi config file.'));
        }
        const openapiBaseApiPath = this.getOpenapiBaseApiPath();
        parseConfig({
            ...config,
            schemaFile: isPostman ? ConstantsHelper.POSTMAN_OPENAPI : config.schemaFile,
        }).forEach((el) => {
            const { outputFile } = el;
            generateEndpoints({ ...el, outputFile });
        });
    }
    async generateGraphql() {
        const config = this.getGraphqlConfig();
        if (!config)
            return;
        if (!config.schema) {
            throw new Error(chalk.redBright('ERROR[client]: Schema field is empty. Please add url to graphql schema file in graphql config file.'));
        }
        // TODO move to separate function
        const gqlFilePath = await this._fileService.findFile(`**/${ConstantsHelper.BASE_RTQ_GQL_API_NAME}`);
        if (!gqlFilePath || gqlFilePath.length === 0) {
            throw new Error(chalk.red('ERROR[client]: base api file not found. Please run cgapi init to create a base api file.'));
        }
        try {
            await generateGql(config);
        }
        catch (error) {
            throw new Error((chalk.red('ERROR[client]: '), chalk.redBright(error)));
        }
    }
    /**
     * `generate` is an async function that takes two boolean arguments, `openapi` and `graphql`. If
     * `openapi` is true, it calls `generateOpenapi` and if `graphql` is true, it calls `generateGraphql`
     * @param {boolean} openapi - boolean - whether or not to generate the OpenAPI spec
     * @param {boolean} graphql - boolean - If true, the GraphQL schema will be generated.
     * @returns Nothing.
     */
    async generate(openapi, graphql) {
        try {
            if (openapi) {
                await this.generateOpenapi();
                console.log(chalk.green('SUCCESS: Openapi RTK query generated successfully.'));
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
        try {
            if (graphql) {
                await this.generateGraphql();
                console.log(chalk.green('SUCCESS: Graphql RTK query generated successfully.'));
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }
    async init(openapi, graphql) {
        try {
            if (openapi) {
                const { openapiBaseApiPath } = await this.generateOpenapiConfig();
                await this.createOpenapiBaseApi(openapiBaseApiPath);
            }
            console.log(chalk.green.bold('SUCCESS: Openapi RTK query successfully initialized!'));
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
        try {
            if (graphql) {
                const { gqlBaseApiPath } = await this.generateGqlConfig();
                await this.createGqlBaseApi(gqlBaseApiPath);
                console.log(chalk.green.bold('SUCCESS: Graphql RTK query successfully initialized!'));
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }
    /**
     * Generates a graphql config file based on the main config file
     */
    async generateGqlConfig() {
        const { configPath, type } = this.mainConfig;
        const defaultGqlConfig = (await DefaultConfigsHelper.gql(type));
        const gqlPath = await this._promptService.selectGqlPath();
        if (typeof gqlPath == 'undefined') {
            // TODO change to chalk with process exit
            throw new TypeError('ERROR: openapi config file has not founded.\n');
        }
        const gqlSchemaUrl = await this._promptService.selectGqlUrl();
        const gqlTypesPath = `${gqlPath}/${ConstantsHelper.GRAPH_QL_TYPES}`;
        const gqlBaseApiPath = `${this._fileService.getDirname(gqlPath)}/${ConstantsHelper.BASE_RTQ_GQL_API_NAME}`;
        const gqlConfig = {
            ...defaultGqlConfig,
            documents: `${gqlPath}/**/*.graphql`,
            schema: gqlSchemaUrl,
            generates: {
                [gqlTypesPath]: {
                    plugins: ['typescript'],
                },
                [gqlPath]: {
                    preset: 'near-operation-file',
                    presetConfig: {
                        baseTypesPath: './types.generated.ts',
                        folder: `../generated`,
                    },
                    plugins: [
                        'typescript-operations',
                        {
                            'typescript-rtk-query': {
                                importBaseApiFrom: `../${ConstantsHelper.BASE_RTQ_GQL_API_NAME}`,
                                exportHooks: true,
                            },
                        },
                    ],
                },
            },
        };
        this._fileService.writeFile(`${configPath}${ConstantsHelper.GRAPH_QL_CONFIG_NAME}`, gqlConfig);
        return { ...gqlConfig, gqlBaseApiPath };
    }
    async generateOpenapiConfig() {
        const { configPath, type, isPostman, postmanCollectionUrl } = this.mainConfig;
        if (isPostman) {
        }
        const apiPath = await this._promptService.selectApiPath();
        const apiUrl = isPostman
            ? postmanCollectionUrl
            : await this._promptService.selectOpenapiUrl();
        if (apiPath == undefined) {
            // TODO change to chalk with process exit
            throw new Error('ERROR: openapi config file has not founded');
        }
        const defaultOpenapi = await DefaultConfigsHelper.openapi(type);
        const baseApiFilePath = `${apiPath}/${ConstantsHelper.BASE_RTQ_API_NAME}`;
        const openapiConfig = {
            ...defaultOpenapi,
            apiFile: `./${baseApiFilePath}`,
            apiImport: 'baseApi',
            outputFiles: {
                [`./${apiPath}/test.api.ts`]: {
                    filterEndpoints: '',
                },
            },
            schemaFile: apiUrl,
        };
        this._fileService.writeFile(`${configPath}/${ConstantsHelper.API_CONFIG_NAME}`, openapiConfig);
        return { ...openapiConfig, openapiBaseApiPath: baseApiFilePath };
    }
};
RtqService = __decorate([
    injectable(),
    __param(0, inject(Locator.IConfigService)),
    __param(1, inject(Locator.IFileService)),
    __param(2, inject(Locator.IPostmanService)),
    __param(3, inject(Locator.IPromptService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], RtqService);
export { RtqService };
