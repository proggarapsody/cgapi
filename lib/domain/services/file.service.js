var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { readFileSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import globSync from 'glob';
import glob from 'glob-promise';
import { injectable } from 'inversify';
let FileService = class FileService {
    constructor() {
        this.getDirname = (source) => {
            return path.dirname(source);
        };
        this.getRelativePath = (source, destination) => {
            return path.relative(source, destination);
        };
    }
    async writeFile(filePath, data) {
        const fullPath = path.resolve(process.cwd(), filePath);
        try {
            await fs.mkdir(path.dirname(fullPath), { recursive: true });
            await fs.writeFile(fullPath, JSON.stringify(data), { encoding: 'utf8' });
        }
        catch (error) {
            console.error(chalk.red('ERROR: file has not created'));
            throw new Error(error);
        }
    }
    readFile(filePath, options) {
        const baseUrl = options?.baseUrl || process.cwd();
        try {
            return readFileSync(path.resolve(baseUrl, filePath), 'utf8');
        }
        catch (error) {
            console.error(chalk.red('ERROR: file has not founded'));
            console.error(error);
            return null;
        }
    }
    async findFile(filePath, options) {
        const cwd = options?.cwd || process.cwd();
        try {
            return await glob(filePath, {
                cwd,
            });
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    findFileSync(filePath, options) {
        const cwd = options?.cwd || process.cwd();
        try {
            return globSync.sync(filePath, {
                cwd,
            });
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async copyFile(from, to) {
        const fullFromPath = path.resolve(process.cwd(), from);
        const fullToPath = path.resolve(process.cwd(), to);
        try {
            await fs.mkdir(path.dirname(fullToPath), { recursive: true });
            await fs.cp(fullFromPath, fullToPath, { force: false });
        }
        catch (error) {
            console.error(chalk.red('ERROR: file has not been copied'));
            throw new Error(error);
        }
    }
};
FileService = __decorate([
    injectable()
], FileService);
export { FileService };
