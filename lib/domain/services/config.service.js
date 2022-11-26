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
import { inject, injectable } from 'inversify';
import { ConstantsHelper } from '../../infrastructure/utils/constants.js';
import { Locator } from '../../infrastructure/utils/locator.js';
let ConfigService = class ConfigService {
    constructor(_promptService, _fileService) {
        this._promptService = _promptService;
        this._fileService = _fileService;
        this.constantsHelper = ConstantsHelper;
        this.mainConfig = null;
        this.mainConfig = this.findMainConfig();
    }
    async getDefaultMainConfig() {
        return import('../../data/cgapi-default.config.js').then((res) => res.default);
    }
    getMainConfig() {
        return this.mainConfig;
    }
    setMainConfig(mainConfig) {
        this.mainConfig = mainConfig;
    }
    findMainConfig() {
        try {
            const mainConfigPath = this._fileService.findFileSync(`**/${this.constantsHelper.CGAPI_CONFIG_NAME}`);
            if (!mainConfigPath || mainConfigPath.length === 0) {
                return null;
            }
            const mainConfig = this._fileService.readFile(mainConfigPath[0]);
            if (!mainConfig) {
                return null;
            }
            return JSON.parse(mainConfig);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async generateMainConfig(isPostman) {
        const type = await this._promptService.selectType();
        const promptConfigPath = await this._promptService.selectConfigPath();
        const defaultConfig = await this.getDefaultMainConfig();
        let postmanUrl = '';
        if (isPostman) {
            postmanUrl = await this._promptService.selectPostmanUrl();
        }
        const configPath = promptConfigPath
            ? `${promptConfigPath}/`
            : defaultConfig.configPath;
        const config = {
            configPath,
            isPostman,
            postmanCollectionUrl: postmanUrl,
            type,
        };
        this._fileService.writeFile(`${configPath || defaultConfig.configPath}${ConstantsHelper.CGAPI_CONFIG_NAME}`, config);
        this.setMainConfig(config);
    }
};
ConfigService = __decorate([
    injectable(),
    __param(0, inject(Locator.IPromptService)),
    __param(1, inject(Locator.IFileService)),
    __metadata("design:paramtypes", [Object, Object])
], ConfigService);
export { ConfigService };
