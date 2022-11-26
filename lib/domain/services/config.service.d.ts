import type { CgapiConfigType } from '../../infrastructure/types/cgapi.types.js';
import type { IConfigService } from '../interfaces/config-service.interface.js';
import { IFileService } from '../interfaces/file-service.interface.js';
import { IPromptService } from '../interfaces/prompt-service.interface.js';
export declare class ConfigService implements IConfigService {
    private _promptService;
    private _fileService;
    private readonly constantsHelper;
    private mainConfig;
    constructor(_promptService: IPromptService, _fileService: IFileService);
    private getDefaultMainConfig;
    getMainConfig(): CgapiConfigType | null;
    setMainConfig(mainConfig: CgapiConfigType): void;
    private findMainConfig;
    generateMainConfig(isPostman: boolean): Promise<void>;
}
