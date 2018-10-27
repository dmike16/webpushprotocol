const path = require('path');
const pgksRoot = path.resolve(__dirname, '..', 'packages');

// Create packeges object
const vapid = _createPackage('vapid');
const jwt = _createPackage('jwt');
const httpece = _createPackage('httpece');
const urlsafebase64 = _createPackage('urlsafebase64');

/**
 * Create package object
 * @param {string} name packages name
 * @return {object} the packge object
 */
function _createPackage(name) {
    return { root: path.join(pgksRoot, name), main: path.join(pgksRoot, name, 'src/index.ts') };
}

module.exports = {
    vapid, jwt, httpece, urlsafebase64,
};
