import { FormatDiagnosticsHost, sys, Diagnostic, formatDiagnostic } from "typescript";
const log = require("fancy-log");

export class FormatHost implements FormatDiagnosticsHost {

    static logDiagnostic(diagnostic: Diagnostic, diagnosticHost: FormatDiagnosticsHost) {
        const message = formatDiagnostic(diagnostic, diagnosticHost);
        log(message);
    }

    getCurrentDirectory(): string {
        return sys.getCurrentDirectory();
    }
    getCanonicalFileName(fileName: string): string {
        return fileName;
    }
    getNewLine(): string {
        return sys.newLine;
    }
}
