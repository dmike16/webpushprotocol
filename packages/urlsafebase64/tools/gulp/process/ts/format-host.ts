import { FormatDiagnosticsHost, sys, Diagnostic, formatDiagnostic } from 'typescript';
import log = require('fancy-log');

export class FormatHost implements FormatDiagnosticsHost {
    getCurrentDirectory(): string {
        return sys.getCurrentDirectory();
    }
    getCanonicalFileName(fileName: string): string {
        return fileName;
    }
    getNewLine(): string {
        return sys.newLine;
    }

    static logDiagnostic(diagnostic: Diagnostic, diagnosticHost: FormatDiagnosticsHost) {
        const message = formatDiagnostic(diagnostic, diagnosticHost);
        log(message);
    }
}