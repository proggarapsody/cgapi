import type { IPostmanService } from '../interfaces/postman-service.interface.js';
import { ConfigService } from './config.service.js';
export declare class PostmanService implements IPostmanService {
    private readonly _configService;
    private mainConfig;
    constructor(_configService: ConfigService);
    private getCollection;
    convertPostmanToOpenapi(): Promise<void>;
}
