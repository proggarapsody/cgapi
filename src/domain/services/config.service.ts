import { inject, injectable } from 'inversify'

import type { CgapiConfigType } from '../../infrastructure/types/cgapi.types.js'
import { ConstantsHelper } from '../../infrastructure/utils/constants.js'
import { Locator } from '../../infrastructure/utils/locator.js'
import type { IConfigService } from '../interfaces/config-service.interface.js'
import { IFileService } from '../interfaces/file-service.interface.js'
import { IPromptService } from '../interfaces/prompt-service.interface.js'

@injectable()
export class ConfigService implements IConfigService {
  private readonly constantsHelper = ConstantsHelper

  private mainConfig: CgapiConfigType | null = null

  constructor(
    @inject(Locator.IPromptService) private _promptService: IPromptService,
    @inject(Locator.IFileService) private _fileService: IFileService
  ) {
    this.mainConfig = this.findMainConfig()
  }

  private async getDefaultMainConfig(): Promise<CgapiConfigType> {
    return import('../../data/cgapi-default.config.js').then((res) => res.default)
  }

  public getMainConfig() {
    return this.mainConfig
  }

  public setMainConfig(mainConfig: CgapiConfigType) {
    this.mainConfig = mainConfig
  }

  private findMainConfig(): CgapiConfigType | null {
    try {
      const mainConfigPath = this._fileService.findFileSync(
        `**/${this.constantsHelper.CGAPI_CONFIG_NAME}`
      )

      if (!mainConfigPath || mainConfigPath.length === 0) {
        return null
      }

      const mainConfig = this._fileService.readFile(mainConfigPath[0])

      if (!mainConfig) {
        return null
      }

      return JSON.parse(mainConfig) as CgapiConfigType
    } catch (error) {
      console.log(error)
      return null
    }
  }

  public async generateMainConfig(isPostman: boolean) {
    const type = await this._promptService.selectType()

    const promptConfigPath = await this._promptService.selectConfigPath()

    const defaultConfig = await this.getDefaultMainConfig()

    let postmanUrl = ''

    if (isPostman) {
      postmanUrl = await this._promptService.selectPostmanUrl()
    }

    const configPath = promptConfigPath
      ? `${promptConfigPath}/`
      : defaultConfig.configPath

    const config: CgapiConfigType = {
      configPath,
      isPostman,
      postmanCollectionUrl: postmanUrl,
      type,
    }

    this._fileService.writeFile(
      `${configPath || defaultConfig.configPath}${ConstantsHelper.CGAPI_CONFIG_NAME}`,
      config
    )

    this.setMainConfig(config)
  }
}
