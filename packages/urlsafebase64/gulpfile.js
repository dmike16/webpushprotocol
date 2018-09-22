/**
 * Gulp file usgin ts-node + typescript
 */
'use strict';

const path = require('path');
const tsconfigPath = path.join(__dirname, 'tools/gulp/tsconfig.json');
require('../bootstrap-local').bootstrap(tsconfigPath);
module.exports = require('./tools/gulp/gulpfile');