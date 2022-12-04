import type { CodegenConfig } from '@graphql-codegen/cli'
import { generate as generateGql } from '@graphql-codegen/cli'
import type { ConfigFile } from '@rtk-query/codegen-openapi'
import { generateEndpoints, parseConfig } from '@rtk-query/codegen-openapi'
import chalk from 'chalk'
import { inject, injectable } from 'inversify'

import type { CgapiConfigType } from '../../infrastructure/types/cgapi.types.js'
import { DefaultConfigsHelper } from '../../infrastructure/utils/config-paths.js'
import { ConstantsHelper } from '../../infrastructure/utils/constants.js'
import { Locator } from '../../infrastructure/utils/locator.js'
import { IConfigService } from '../interfaces/config-service.interface.js'
import { IFileService } from '../interfaces/file-service.interface.js'
import type { IGenerator } from '../interfaces/generator.interface.js'
import { IPostmanService } from '../interfaces/postman-service.interface.js'
import { IPromptService } from '../interfaces/prompt-service.interface.js'

@injectable()
export class RtqService implements IGenerator {
  private readonly mainConfig: CgapiConfigType

  constructor(
    @inject(Locator.IConfigService) private readonly _configService: IConfigService,
    @inject(Locator.IFileService) private readonly _fileService: IFileService,
    @inject(Locator.IPostmanService) private readonly _postmanService: IPostmanService,
    @inject(Locator.IPromptService) private readonly _promptService: IPromptService
  ) {
    const config = this._configService.getMainConfig()

    if (!config) {
      throw new Error(
        chalk.red(
          'ERROR[client]: No config file found. Please run cgapi init to create a config file.'
        )
      )
    }

    this.mainConfig = config
  }

  /**
   * It reads a file and returns the contents of that file as a JSON object.
   * @returns {CodegenConfig} The GraphQL config file.
   */
  private getGraphqlConfig() {
    const config = this._fileService.readFile(
      this.mainConfig.configPath + ConstantsHelper.GRAPH_QL_CONFIG_NAME
    )

    if (!config) return null

    return JSON.parse(config) as CodegenConfig
  }

  /**
   * It reads a file and returns the contents of the file as a JSON object.
   * @returns {ConfigFile} The openapi config file.
   */
  private getOpenapiConfig(): ConfigFile {
    const config = this._fileService.readFile(
      this.mainConfig.configPath + ConstantsHelper.API_CONFIG_NAME
    )

    if (!config) {
      throw new Error(
        chalk.red(
          'ERROR[client]: No config file found. Please run cgapi init to create a config file.'
        )
      )
    }

    return JSON.parse(config) as ConfigFile
  }

  /**
   * Find the default gql base-api template file
   * @returns The path to the file.
   * @throws Error if the file is not found.
   */
  private async getDefaultGqlBaseApiPath(): Promise<string> {
    const defaultGqlApiPath = await this._fileService.findFile(
      `**/rtq/${ConstantsHelper.DEFAULT_GQL_BASEAPI_NAME}`,
      {
        rule: 'lib',
        full: true,
      }
    )
    if (!defaultGqlApiPath || defaultGqlApiPath.length === 0) {
      throw new Error(chalk.red('ERROR[app]: default gql base-api file has not founded.'))
    }
    return defaultGqlApiPath[0]
  }

  /**
   * Create base gql api file by copying the default template
   * @param {string} gqlBaseApiPath
   */
  private async createGqlBaseApi(gqlBaseApiPath: string) {
    const defaultGqlBaseApiPath = await this.getDefaultGqlBaseApiPath()
    await this._fileService.copyFile(defaultGqlBaseApiPath, gqlBaseApiPath)
  }

  /**
   * Find the default openapi base-api template file
   * @returns The path to the file.
   * @throws Error if the file is not found.
   */
  private async getDefaultOpenapiBaseApiPath(): Promise<string> {
    const defaultOpenapiPath = await this._fileService.findFile(
      `**/rtq/${ConstantsHelper.DEFAULT_OPENAPI_BASEAPI_NAME}`,
      {
        rule: 'lib',
        full: true,
      }
    )

    console.log('PATH:', defaultOpenapiPath)

    if (!defaultOpenapiPath || defaultOpenapiPath.length === 0) {
      throw new Error('ERROR[app]: default openapi base-api file has not found.\n')
    }
    return defaultOpenapiPath[0]
  }

  /**
   * Create base openapi api file by copying the default template
   * @param {string} openapiBaseApiPath
   */
  private async createOpenapiBaseApi(openapiBaseApiPath: string) {
    const defaultOpenapiBaseApiPath = await this.getDefaultOpenapiBaseApiPath()
    await this._fileService.copyFile(defaultOpenapiBaseApiPath, openapiBaseApiPath)
  }

  private async getOpenapiBaseApiPath() {
    const apiFilePath = await this._fileService.findFile(
      `**/${ConstantsHelper.BASE_RTQ_API_NAME}`
    )

    if (!apiFilePath || apiFilePath.length === 0) {
      throw new Error(
        chalk.red(
          'ERROR[client]: base api file not found. Please run `cgapi init` to create a base api file.'
        )
      )
    }
    return apiFilePath[0]
  }

  // TODO integrate postman collection to openapi
  private async generateOpenapi() {
    const { isPostman, configPath } = this.mainConfig

    if (isPostman) {
      await this._postmanService.convertPostmanToOpenapi()
    }

    // 1 check if base api file exist in api path + ConstantsHelper.BASE_RTQ_API_NAME
    const config = this.getOpenapiConfig()

    if (!config.schemaFile && !isPostman) {
      throw new Error(
        chalk.red(
          'ERROR[client]: Schema file field is empty. Please add url to openapi json file in openapi config file.'
        )
      )
    }

    await this.getOpenapiBaseApiPath()

    await Promise.all(
      parseConfig({
        ...config,
        schemaFile: isPostman ? ConstantsHelper.POSTMAN_OPENAPI : config.schemaFile,
      }).map(async (el) => {
        console.log(el)
        await generateEndpoints(el)
      })
    )

    // generateEndpoints(
    //   parseConfig({
    //     ...config,
    //     schemaFile: isPostman ? ConstantsHelper.POSTMAN_OPENAPI : config.schemaFile,
    //   })
    // )
  }

  private async generateGraphql() {
    const config = this.getGraphqlConfig()
    if (!config) return

    if (!config.schema) {
      throw new Error(
        chalk.redBright(
          'ERROR[client]: Schema field is empty. Please add url to graphql schema file in graphql config file.'
        )
      )
    }
    // TODO move to separate function
    const gqlFilePath = await this._fileService.findFile(
      `**/${ConstantsHelper.BASE_RTQ_GQL_API_NAME}`
    )

    if (!gqlFilePath || gqlFilePath.length === 0) {
      throw new Error(
        chalk.red(
          'ERROR[client]: base api file not found. Please run cgapi init to create a base api file.'
        )
      )
    }

    try {
      await generateGql(config)
    } catch (error) {
      throw new Error((chalk.red('ERROR[client]: '), chalk.redBright(error)))
    }
  }

  /**
   * `generate` is an async function that takes two boolean arguments, `openapi` and `graphql`. If
   * `openapi` is true, it calls `generateOpenapi` and if `graphql` is true, it calls `generateGraphql`
   * @param {boolean} openapi - boolean - whether or not to generate the OpenAPI spec
   * @param {boolean} graphql - boolean - If true, the GraphQL schema will be generated.
   * @returns Nothing.
   */
  public async generate(openapi: boolean, graphql: boolean) {
    try {
      if (openapi) {
        await this.generateOpenapi()
        console.log(chalk.green('SUCCESS: Openapi RTK query generated successfully.'))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }

    try {
      if (graphql) {
        await this.generateGraphql()
        console.log(chalk.green('SUCCESS: Graphql RTK query generated successfully.'))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  public async init(openapi: boolean, graphql: boolean): Promise<void> {
    try {
      if (openapi) {
        const { openapiBaseApiPath } = await this.generateOpenapiConfig()
        await this.createOpenapiBaseApi(openapiBaseApiPath)
      }
      console.log(
        chalk.green.bold('SUCCESS: Openapi RTK query successfully initialized!')
      )
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }

    try {
      if (graphql) {
        const { gqlBaseApiPath } = await this.generateGqlConfig()
        await this.createGqlBaseApi(gqlBaseApiPath)
        console.log(
          chalk.green.bold('SUCCESS: Graphql RTK query successfully initialized!')
        )
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  /**
   * Generates a graphql config file based on the main config file
   */
  public async generateGqlConfig(): Promise<
    CodegenConfig & {
      gqlBaseApiPath: string
    }
  > {
    const { configPath, type } = this.mainConfig

    const defaultGqlConfig = (await DefaultConfigsHelper.gql(type)) as CodegenConfig

    const gqlPath = await this._promptService.selectGqlPath()

    if (typeof gqlPath == 'undefined') {
      // TODO change to chalk with process exit
      throw new TypeError('ERROR: openapi config file has not founded.\n')
    }

    const gqlSchemaUrl = await this._promptService.selectGqlUrl()

    const gqlTypesPath = `${gqlPath}/${ConstantsHelper.GRAPH_QL_TYPES}`
    const gqlBaseApiPath = `${this._fileService.getDirname(gqlPath)}/${
      ConstantsHelper.BASE_RTQ_GQL_API_NAME
    }`

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
    } as CodegenConfig

    this._fileService.writeFile(
      `${configPath}${ConstantsHelper.GRAPH_QL_CONFIG_NAME}`,
      gqlConfig
    )

    return { ...gqlConfig, gqlBaseApiPath }
  }

  public async generateOpenapiConfig(): Promise<
    ConfigFile & {
      openapiBaseApiPath: string
    }
  > {
    const { configPath, type, isPostman, postmanCollectionUrl } = this.mainConfig

    if (isPostman) {
    }

    const apiPath = await this._promptService.selectApiPath()
    const apiUrl = isPostman
      ? postmanCollectionUrl
      : await this._promptService.selectOpenapiUrl()

    if (apiPath == undefined) {
      // TODO change to chalk with process exit
      throw new Error('ERROR: openapi config file has not founded')
    }

    const defaultOpenapi = await DefaultConfigsHelper.openapi(type)

    const baseApiFilePath = `${apiPath}/${ConstantsHelper.BASE_RTQ_API_NAME}`

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
    } as ConfigFile

    this._fileService.writeFile(
      `${configPath}/${ConstantsHelper.API_CONFIG_NAME}`,
      openapiConfig
    )

    return { ...openapiConfig, openapiBaseApiPath: baseApiFilePath }
  }
}
