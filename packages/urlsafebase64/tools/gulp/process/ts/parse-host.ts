import { ParseConfigHost, sys } from 'typescript';

export class ParseHost implements ParseConfigHost {
    useCaseSensitiveFileNames: boolean = sys.useCaseSensitiveFileNames;   
    
    readDirectory(rootDir: string, extensions: ReadonlyArray<string>, excludes: ReadonlyArray<string>, includes: ReadonlyArray<string>, depth?: number): string[] {
        return sys.readDirectory(rootDir, extensions, excludes, includes, depth);
    }

    fileExists(path: string): boolean {
        return sys.fileExists(path);
    }

    readFile(path: string): string {
        return sys.readFile(path);
    }
}