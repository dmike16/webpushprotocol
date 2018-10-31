const ts = require('typescript');
const path = require('path');
const fs = require('fs');
const log = require('fancy-log');
const formatHost = require('./ts-format-host').createFormatHost();
const parsedHost = require('./ts-parsed-hot').createParsedHost();

// Read ts config file
const tsConfigFile = path.join(__dirname, '../tsconfig.json');
const configFile = ts.readConfigFile(tsConfigFile,
    (path) => ts.sys.readFile(path, 'utf-8'));
if (configFile.error) {
    formatHost.logDiagnostic(configFile.error);
    throw new Error('tsconfig file reading error');
}
const parsedConfigFile = ts.parseJsonConfigFileContent(configFile.config,
    parsedHost,
    ts.sys.getCurrentDirectory(), {});
if (parsedConfigFile.errors && parsedConfigFile.errors.length > 0) {
    parsedConfigFile.errors.forEach((diagnostic) => formatHost.logDiagnostic(diagnostic));
    throw new Error('tsconfig file parsing error');
}

// TODO Enable profile
// TODO Enale instrument code

// Mock require ts ext
const oldRequireTs = require.extensions['.ts'];
require.extensions['.ts'] = function (module, filename) {
    if (filename.match(/node_modules/)) {
        if (oldRequireTs) return oldRequireTs(module, filename);
        return module._compile(fs.readFileSync(filename, 'utf-8'), filename);
    }
    const source = fs.readFileSync(filename, 'utf-8');
    try {
        let result = ts.transpileModule(source, parsedConfigFile.options);
        if (false) {
            // Instrument the code
        }
        if (result.diagnostics.length > 0) {
            result.diagnostics.forEach((dia) => formatHost.logDiagnostic(dia));
            throw new Error('Error in ts compilation');
        }
        return module._compile(result.outputText, filename);
    } catch (error) {
        log.error(`Error in script ${filename}`);
        log.error(error.stack);
        throw error;
    }
};

// Mock default module name lookup to a handle local module
const Module = require('module');
const packages = require('./packages');
const oldResolveFilename = Module._resolveFilename;

Module._resolveFilename = function (request, parent) {
    if (request in packages) {
        return packages[request].main;
    } else {
        // TODO: handle case when thare a.json file and a .ts file with the same name
        if (Module.builtinModules.includes(request)) {
            return oldResolveFilename.call(this, request, parent);
        } else {
            let resolved = null;
            try {
                resolved = oldResolveFilename.call(this, request, parent);
            } catch (e) {
                throw e;
            }

            if (resolved.match(/[\\\/]node_modules[\\\/]/)) {
                return resolved;
            } else if (request.endsWith('.json')) {
                return resolved;
            } else {
                const maybeTs = resolved.replace('.json', '.ts');
                if (fs.existsSync(maybeTs)) return maybeTs;
                return resolved;
            }
        }
    }
};
