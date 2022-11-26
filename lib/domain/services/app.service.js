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
import chalk from 'chalk';
import { Command } from 'commander';
import { inject, injectable } from 'inversify';
import { Locator } from '../../infrastructure/utils/locator.js';
let AppService = class AppService {
    constructor(_configService, _generatorFactory) {
        this._configService = _configService;
        this._generatorFactory = _generatorFactory;
    }
    async main() {
        const program = new Command();
        program.name('cgapi');
        program.version('0.0.1');
        program
            .command('init')
            .option('-g, --graphql', 'If you want to use graphql generator', false)
            .option('-o, --openapi', 'If you want to use openapi generator', true)
            .option('-p, --postman', 'If your api is postman collection url', false)
            // .option('-t, --type [type]', 'cgapi generator type', 'rtk-query')
            .action(async (instance) => {
            await this._configService.generateMainConfig(instance.postman);
            const config = this._configService.getMainConfig();
            if (!config)
                return;
            const service = this._generatorFactory(config.type);
            try {
                await service.init(instance.openapi, instance.graphql);
                process.exit(0);
            }
            catch {
                process.exit(1);
            }
        });
        program
            .command('gen')
            .option('-g, --graphql', 'generate from graphql', false)
            .option('-o, --openapi', 'generate from openapi', true)
            .action(async (instance) => {
            const config = this._configService.getMainConfig();
            if (!config) {
                console.log(chalk.red());
                process.exit(1);
            }
            const service = this._generatorFactory(config.type);
            try {
                await service.generate(instance.openapi, instance.graphql);
                process.exit(0);
            }
            catch {
                process.exit(1);
            }
        });
        await program.parseAsync(process.argv);
    }
};
AppService = __decorate([
    injectable(),
    __param(0, inject(Locator.IConfigService)),
    __param(1, inject(Locator.GeneratorFactory)),
    __metadata("design:paramtypes", [Object, Function])
], AppService);
export { AppService };
