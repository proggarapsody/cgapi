export interface IFileService {
    findFile: (pattern: string, options?: {
        cwd?: string;
    }) => Promise<string[] | null>;
    findFileSync: (pattern: string) => string[] | null;
    readFile: (path: string) => string | null;
    writeFile: (path: string, data: string | Object) => void;
    getDirname: (path: string) => string;
    getRelativePath: (source: string, destination: string) => string;
    copyFile: (from: string, to: string) => void;
    getLibDirname(): string;
}
