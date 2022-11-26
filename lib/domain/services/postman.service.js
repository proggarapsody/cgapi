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
import fs from 'node:fs/promises';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { inject, injectable } from 'inversify';
import postmanToOpenApi from 'postman-to-openapi';
import { ConstantsHelper } from '../../infrastructure/utils/constants.js';
import { Locator } from '../../infrastructure/utils/locator.js';
import { ConfigService } from './config.service.js';
dotenv.config({
    path: '.env.development',
});
let PostmanService = class PostmanService {
    constructor(_configService) {
        this._configService = _configService;
        const config = this._configService.getMainConfig();
        if (!config) {
            throw new Error(chalk.red('ERROR: main config file has not founded'));
        }
        this.mainConfig = config;
    }
    // TODO change
    async getCollection() {
        const { postmanCollectionUrl } = this.mainConfig;
        if (!postmanCollectionUrl) {
            throw new Error(chalk.red('ERROR[client]: Postman collection url is not defined. Please add url to postman collection in the cgapi.config.json file'));
        }
        const postmanCollection = await fetch(postmanCollectionUrl);
        await fs.writeFile(ConstantsHelper.POSTMAN_COLLECTION, JSON.stringify(await postmanCollection.json()));
    }
    async convertPostmanToOpenapi() {
        try {
            await this.getCollection();
            await postmanToOpenApi(ConstantsHelper.POSTMAN_COLLECTION, `${ConstantsHelper.POSTMAN_OPENAPI}`, {
                defaultTag: 'General',
                outputFormat: 'json',
                pathDepth: 1,
            });
            fs.unlink(ConstantsHelper.POSTMAN_COLLECTION);
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
PostmanService = __decorate([
    injectable(),
    __param(0, inject(Locator.IConfigService)),
    __metadata("design:paramtypes", [ConfigService])
], PostmanService);
export { PostmanService };
