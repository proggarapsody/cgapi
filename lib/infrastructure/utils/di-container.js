/* eslint-disable sonarjs/no-all-duplicated-branches */
import { Container } from 'inversify';
import { AppService } from '../../domain/services/app.service.js';
import { ConfigService } from '../../domain/services/config.service.js';
import { FileService } from '../../domain/services/file.service.js';
import { PostmanService } from '../../domain/services/postman.service.js';
import { PromptService } from '../../domain/services/prompt.service.js';
import { RtqService } from '../../domain/services/rtq.service.js';
import { Locator } from './locator.js';
export class DIcontainer {
    constructor() {
        this.container = new Container();
        this.init();
    }
    init() {
        this.container
            .bind(Locator.IConfigService)
            .to(ConfigService)
            .inSingletonScope();
        this.container
            .bind(Locator.IFileService)
            .to(FileService)
            .inSingletonScope();
        this.container
            .bind(Locator.IPostmanService)
            .to(PostmanService)
            .inSingletonScope();
        this.container
            .bind(Locator.IPromptService)
            .to(PromptService)
            .inSingletonScope();
        this.container.bind(Locator.IGenerator).to(RtqService).inSingletonScope();
        this.container.bind(Locator.AppService).to(AppService).inSingletonScope();
        this.container
            .bind(Locator.GeneratorFactory)
            .toFactory((context) => {
            return (type) => {
                switch (type) {
                    case 'react-query': {
                        return context.container.get(Locator.IGenerator);
                    }
                    case 'rtk-query': {
                        return context.container.get(Locator.IGenerator);
                    }
                    default: {
                        return context.container.get(Locator.IGenerator);
                    }
                }
            };
        });
    }
}
