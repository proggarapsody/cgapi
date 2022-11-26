import fs from 'node:fs/promises'

import chalk from 'chalk'
import dotenv from 'dotenv'
import { inject, injectable } from 'inversify'
import postmanToOpenApi from 'postman-to-openapi'

import type { CgapiConfigType } from '../../infrastructure/types/cgapi.types.js'
import { ConstantsHelper } from '../../infrastructure/utils/constants.js'
import { Locator } from '../../infrastructure/utils/locator.js'
import type { IPostmanService } from '../interfaces/postman-service.interface.js'
import { ConfigService } from './config.service.js'

dotenv.config({
  path: '.env.development',
})

@injectable()
export class PostmanService implements IPostmanService {
  // TODO inject config in postman service
  private mainConfig: CgapiConfigType

  constructor(
    @inject(Locator.IConfigService) private readonly _configService: ConfigService
  ) {
    const config = this._configService.getMainConfig()
    if (!config) {
      throw new Error(chalk.red('ERROR: main config file has not founded'))
    }
    this.mainConfig = config
  }

  // TODO change
  private async getCollection() {
    const { postmanCollectionUrl } = this.mainConfig

    if (!postmanCollectionUrl) {
      throw new Error(
        chalk.red(
          'ERROR[client]: Postman collection url is not defined. Please add url to postman collection in the cgapi.config.json file'
        )
      )
    }
    const postmanCollection = await fetch(postmanCollectionUrl as string)

    await fs.writeFile(
      ConstantsHelper.POSTMAN_COLLECTION,
      JSON.stringify(await postmanCollection.json())
    )
  }

  public async convertPostmanToOpenapi() {
    try {
      await this.getCollection()

      await postmanToOpenApi(
        ConstantsHelper.POSTMAN_COLLECTION,
        `${ConstantsHelper.POSTMAN_OPENAPI}`,
        {
          defaultTag: 'General',
          outputFormat: 'json',
          pathDepth: 1,
        }
      )

      fs.unlink(ConstantsHelper.POSTMAN_COLLECTION)
    } catch (error) {
      throw new Error(error as any)
    }
  }
}
