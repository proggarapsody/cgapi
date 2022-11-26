import type { CgapiType } from '../../infrastructure/types/cgapi.types.js';
import { IConfigService } from '../interfaces/config-service.interface.js';
import type { IGenerator } from '../interfaces/generator.interface.js';
export declare class AppService {
    private readonly _configService;
    private readonly _generatorFactory;
    constructor(_configService: IConfigService, _generatorFactory: (type: CgapiType) => IGenerator);
    main(): Promise<void>;
}
