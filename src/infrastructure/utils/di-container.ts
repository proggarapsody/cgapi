/* eslint-disable sonarjs/no-all-duplicated-branches */

import type { interfaces } from 'inversify'
import { Container } from 'inversify'

import type { IConfigService } from '../../domain/interfaces/config-service.interface.js'
import type { IFileService } from '../../domain/interfaces/file-service.interface.js'
import type { IGenerator } from '../../domain/interfaces/generator.interface.js'
import type { IPostmanService } from '../../domain/interfaces/postman-service.interface.js'
import type { IPromptService } from '../../domain/interfaces/prompt-service.interface.js'
import { AppService } from '../../domain/services/app.service.js'
import { ConfigService } from '../../domain/services/config.service.js'
import { FileService } from '../../domain/services/file.service.js'
import { PostmanService } from '../../domain/services/postman.service.js'
import { PromptService } from '../../domain/services/prompt.service.js'
import { RtqService } from '../../domain/services/rtq.service.js'
import type { CgapiType } from '../types/cgapi.types.js'
import { Locator } from './locator.js'

export class DIcontainer {
  public container: Container

  constructor() {
    this.container = new Container()
    this.init()
  }

  public init() {
    this.container
      .bind<IConfigService>(Locator.IConfigService)
      .to(ConfigService)
      .inSingletonScope()
    this.container
      .bind<IFileService>(Locator.IFileService)
      .to(FileService)
      .inSingletonScope()
    this.container
      .bind<IPostmanService>(Locator.IPostmanService)
      .to(PostmanService)
      .inSingletonScope()
    this.container
      .bind<IPromptService>(Locator.IPromptService)
      .to(PromptService)
      .inSingletonScope()

    this.container.bind<IGenerator>(Locator.IGenerator).to(RtqService).inSingletonScope()

    this.container.bind<AppService>(Locator.AppService).to(AppService).inSingletonScope()

    this.container
      .bind<interfaces.Factory<IGenerator>>(Locator.GeneratorFactory)
      .toFactory<IGenerator, [CgapiType]>((context: interfaces.Context) => {
        return (type: CgapiType) => {
          switch (type) {
            case 'react-query': {
              return context.container.get<IGenerator>(Locator.IGenerator)
            }
            case 'rtk-query': {
              return context.container.get<IGenerator>(Locator.IGenerator)
            }
            default: {
              return context.container.get<IGenerator>(Locator.IGenerator)
            }
          }
        }
      })
  }
}
