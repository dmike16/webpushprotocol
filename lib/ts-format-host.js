const ts = require('typescript');
const log = require('fancy-log');
/**
 * Class FormatHost
 * @class
 */
class FormatHost {
  /**
   * @return {string} current direcory
   */
  getCurrentDirectory() {
    return ts.sys.getCurrentDirectory();
  }
  /**
   * @param {string} fileName
   * @return {string} canonical filename
   */
  getCanonicalFileName(fileName) {
    return fileName;
  }
  /**
   * @return {string} newLine char
   */
  getNewLine() {
    return ts.sys.newLine;
  }
  /**
   * Log Diagnostric
   * @param {*} diagnostic
   */
  logDiagnostic(diagnostic) {
    const message = ts.formatDiagnostic(diagnostic, this);
    log(message);
  }
}

exports.createFormatHost = function createFormatHost() {
  return new FormatHost();
};
