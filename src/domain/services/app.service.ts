import chalk from 'chalk'
import { Command } from 'commander'
import { inject, injectable } from 'inversify'

import type { CgapiType } from '../../infrastructure/types/cgapi.types.js'
import { Locator } from '../../infrastructure/utils/locator.js'
import { IConfigService } from '../interfaces/config-service.interface.js'
import type { IGenerator } from '../interfaces/generator.interface.js'

@injectable()
export class AppService {
  constructor(
    @inject(Locator.IConfigService) private readonly _configService: IConfigService,
    @inject(Locator.GeneratorFactory)
    private readonly _generatorFactory: (type: CgapiType) => IGenerator
  ) {}

  public async main() {
    const program = new Command()

    program.name('cgapi')
    program.version('0.0.1')

    program
      .command('init')
      .option('-g, --graphql', 'If you want to use graphql generator', false)
      .option('-o, --openapi', 'If you want to use openapi generator', true)
      .option('-p, --postman', 'If your api is postman collection url', false)
      // .option('-t, --type [type]', 'cgapi generator type', 'rtk-query')
      .action(async (instance) => {
        await this._configService.generateMainConfig(instance.postman)
        const config = this._configService.getMainConfig()

        if (!config) return

        const service = this._generatorFactory(config.type)
        try {
          await service.init(instance.openapi, instance.graphql)
          process.exit(0)
        } catch {
          process.exit(1)
        }
      })

    program
      .command('gen')
      .option('-g, --graphql', 'generate from graphql', false)
      .option('-o, --openapi', 'generate from openapi', true)
      .action(async (instance) => {
        const config = this._configService.getMainConfig()

        if (!config) {
          console.log(chalk.red())
          process.exit(1)
        }

        const service = this._generatorFactory(config.type)

        try {
          await service.generate(instance.openapi, instance.graphql)
          process.exit(0)
        } catch {
          process.exit(1)
        }
      })

    await program.parseAsync(process.argv)
  }
}
