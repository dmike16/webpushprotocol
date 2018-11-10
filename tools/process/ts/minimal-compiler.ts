import * as ts from "typescript";
import { FormatHost } from "./format-host";
import { ParseHost } from "./parse-host";

export async function minimalCompiler(
    tsconfig: string,
    extraFiles: string[] = [], extraOptions: ts.CompilerOptions = {}) {
    const diagnosticHost = new FormatHost();
    const configFile = ts.readConfigFile(tsconfig, (path: string) => ts.sys.readFile(path, "utf-8"));
    // If contains error stop
    if (configFile.error) {
        FormatHost.logDiagnostic(configFile.error, diagnosticHost);
        throw new Error("tsconfig file reading error");
    }
    const parsedConfigFile = ts.parseJsonConfigFileContent(configFile.config, new ParseHost(),
        ts.sys.getCurrentDirectory(), extraOptions);
    if (parsedConfigFile.errors && parsedConfigFile.errors.length > 0) {
        parsedConfigFile.errors.forEach((diagnostic) => FormatHost.logDiagnostic(diagnostic, diagnosticHost));
        throw new Error("tsconfig file parsing error");
    }
    const files = [...extraFiles, ...(parsedConfigFile.raw.files || [])];
    const program = ts.createProgram(files, parsedConfigFile.options);
    const result = program.emit();
    const allDiagnostic = ts.getPreEmitDiagnostics(program).concat(result.diagnostics);

    allDiagnostic.forEach((diagnostic) => FormatHost.logDiagnostic(diagnostic, diagnosticHost));
    if (result.emitSkipped) {
        throw new Error("Compilation Error");
    }
}
