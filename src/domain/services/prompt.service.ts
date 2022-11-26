import inquirer from 'inquirer'
import inquirerDirectory from 'inquirer-directory'
import { injectable } from 'inversify'

import type { CgapiConfigType } from '../../infrastructure/types/cgapi.types.js'
import type { IPromptService } from '../interfaces/prompt-service.interface.js'

@injectable()
export class PromptService implements IPromptService {
  private inquirerInstance: typeof inquirer

  private basePath = '.'

  constructor() {
    this.inquirerInstance = inquirer
    this.inquirerInstance.registerPrompt('directory', inquirerDirectory)
  }

  public async selectType(): Promise<CgapiConfigType['type']> {
    const answers = await this.inquirerInstance.prompt([
      {
        type: 'list',
        name: 'type',
        choices: ['rtk-query', 'react-query'],
        message: 'Choose type of cgapi codegen',
      },
    ])

    return answers.type
  }

  public async selectPostmanUrl(): Promise<string> {
    const questions = []
    questions.push({
      type: 'input',
      name: 'postmanCollectionUrl',
      message: 'Input postman collection url',
      basePath: this.basePath,
    })

    const answers = await this.inquirerInstance.prompt(questions)

    return answers.postmanCollectionUrl || ''
  }

  public async selectOpenapiUrl(): Promise<string> {
    const questions = []
    questions.push({
      type: 'input',
      name: 'apiUrl',
      message: 'Input openapi url (This URL should contain the openapi.json file schema)',
      basePath: this.basePath,
    })
    const answers = await this.inquirerInstance.prompt(questions)
    return answers.apiUrl || ''
  }

  public async selectGqlUrl(): Promise<string | undefined> {
    const questions = []

    questions.push({
      type: 'input',
      name: 'gqlSchemaUrl',
      message: 'Input graphql schema url',
      basePath: this.basePath,
    })

    const answers = await this.inquirerInstance.prompt(questions)

    return answers.gqlSchemaUrl || ''
  }

  /**
   * It asks the user to select a directory which would contains openapi files, and then returns the path to that directory.
   * @returns api path
   * @example 'src/api'
   */
  public async selectApiPath(): Promise<string | undefined> {
    const questions = []
    questions.push({
      type: 'directory',
      name: 'apiPath',
      message: 'Choose api path (Generated files will be created here)',
      basePath: this.basePath,
    })

    const answers = await this.inquirerInstance.prompt(questions)
    return answers.apiPath?.replace(/\\/g, '/')
  }

  /**
   * It asks the user to select a directory which would contains openapi files, and then returns the path to that directory.
   * @returns path to gql files: documents and schema
   * @example 'src/gql'
   */
  public async selectGqlPath(): Promise<string | undefined> {
    const questions = []
    questions.push({
      type: 'directory',
      name: 'gqlPath',
      message:
        'Select the folder with .graphql files (Generated files will be created here)',
      basePath: this.basePath,
    })

    const answers = await this.inquirerInstance.prompt(questions)
    return answers.gqlPath?.replace(/\\/g, '/')
  }

  public async selectConfigPath(): Promise<string | undefined> {
    const questions = []
    questions.push({
      type: 'directory',
      name: 'configPath',
      message: 'Choose the config path (DEFAULT: project_root/codegen/)',
      basePath: this.basePath,
    })

    const answers = await this.inquirerInstance.prompt(questions)

    return answers.configPath?.replace(/\\/g, '/')
  }
}
