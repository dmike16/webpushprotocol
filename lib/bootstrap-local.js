const ts = require('typescript');
const path = require('path');
const fs = require('fs');
const log = require('fancy-log');
const formatHost = require('./ts-format-host').createFormatHost();
const parsedHost = require('./ts-parsed-hot').createParsedHost();
/**
 * Read ts config file
 */
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
/**
 * TODO Enable profile
 */
/**
 * TODO Enale instrument code
 */
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
