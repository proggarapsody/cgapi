import type { IFileService } from '../interfaces/file-service.interface.js';
export declare class FileService implements IFileService {
    private readonly dirname;
    writeFile(filePath: string, data: Object | string): Promise<void>;
    readFile(filePath: string, options?: {
        baseUrl?: string;
    }): string | null;
    getLibDirname(): string;
    findFile(filePath: string, options?: {
        cwd?: string;
    }): Promise<string[] | null>;
    findFileSync(filePath: string, options?: {
        cwd?: string;
    }): string[] | null;
    copyFile(from: string, to: string): Promise<void>;
    getDirname: (source: string) => string;
    getRelativePath: (source: string, destination: string) => string;
}
