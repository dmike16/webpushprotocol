const ts = require('typescript');

/**
 * Class ParsedHost
 */
class ParseHost {
  /**
   * Class constructor
   */
  constructor() {
    this.useCaseSensitiveFileNames = ts.sys.useCaseSensitiveFileNames;
  }
  /**
   * Read directory method
   * @param {string} rootDir
   * @param {string} extensions
   * @param {string} excludes
   * @param {string} includes
   * @param {*} depth
   * @return {string[]} direcory
   */
  readDirectory(rootDir, extensions, excludes, includes, depth) {
    return ts.sys.readDirectory(rootDir, extensions, excludes, includes, depth);
  }
  /**
   * @param {string} path
   * @return {boolean}
   */
  fileExists(path) {
    return ts.sys.fileExists(path);
  }
  /**
   * @param {string} path
   * @return {string} file content
   */
  readFile(path) {
    return ts.sys.readFile(path);
  }
}

exports.createParsedHost = function parsedHost() {
  return new ParseHost();
};
