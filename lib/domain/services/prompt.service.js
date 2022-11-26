var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import inquirer from 'inquirer';
import inquirerDirectory from 'inquirer-directory';
import { injectable } from 'inversify';
let PromptService = class PromptService {
    constructor() {
        this.basePath = '.';
        this.inquirerInstance = inquirer;
        this.inquirerInstance.registerPrompt('directory', inquirerDirectory);
    }
    async selectType() {
        const answers = await this.inquirerInstance.prompt([
            {
                type: 'list',
                name: 'type',
                choices: ['rtk-query', 'react-query'],
                message: 'Choose type of cgapi codegen',
            },
        ]);
        return answers.type;
    }
    async selectPostmanUrl() {
        const questions = [];
        questions.push({
            type: 'input',
            name: 'postmanCollectionUrl',
            message: 'Input postman collection url',
            basePath: this.basePath,
        });
        const answers = await this.inquirerInstance.prompt(questions);
        return answers.postmanCollectionUrl || '';
    }
    async selectOpenapiUrl() {
        const questions = [];
        questions.push({
            type: 'input',
            name: 'apiUrl',
            message: 'Input openapi url (This URL should contain the openapi.json file schema)',
            basePath: this.basePath,
        });
        const answers = await this.inquirerInstance.prompt(questions);
        return answers.apiUrl || '';
    }
    async selectGqlUrl() {
        const questions = [];
        questions.push({
            type: 'input',
            name: 'gqlSchemaUrl',
            message: 'Input graphql schema url',
            basePath: this.basePath,
        });
        const answers = await this.inquirerInstance.prompt(questions);
        return answers.gqlSchemaUrl || '';
    }
    /**
     * It asks the user to select a directory which would contains openapi files, and then returns the path to that directory.
     * @returns api path
     * @example 'src/api'
     */
    async selectApiPath() {
        const questions = [];
        questions.push({
            type: 'directory',
            name: 'apiPath',
            message: 'Choose api path (Generated files will be created here)',
            basePath: this.basePath,
        });
        const answers = await this.inquirerInstance.prompt(questions);
        return answers.apiPath?.replace(/\\/g, '/');
    }
    /**
     * It asks the user to select a directory which would contains openapi files, and then returns the path to that directory.
     * @returns path to gql files: documents and schema
     * @example 'src/gql'
     */
    async selectGqlPath() {
        const questions = [];
        questions.push({
            type: 'directory',
            name: 'gqlPath',
            message: 'Select the folder with .graphql files (Generated files will be created here)',
            basePath: this.basePath,
        });
        const answers = await this.inquirerInstance.prompt(questions);
        return answers.gqlPath?.replace(/\\/g, '/');
    }
    async selectConfigPath() {
        const questions = [];
        questions.push({
            type: 'directory',
            name: 'configPath',
            message: 'Choose the config path (DEFAULT: project_root/codegen/)',
            basePath: this.basePath,
        });
        const answers = await this.inquirerInstance.prompt(questions);
        return answers.configPath?.replace(/\\/g, '/');
    }
};
PromptService = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], PromptService);
export { PromptService };
