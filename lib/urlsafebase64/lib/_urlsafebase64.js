/**
* This nodejs module contain encode and decode urlbase64 utilities.
* The urlbase64 mode is similar to the standar base64 except that replace:
* <ul>
*   <li>'+' with '-'</li>
*   <li>'/' with '_'</li>
*   <li> remove trailing '='</li>
* </ul
* @author dmike <cipmiky@gmail.com>
* @private
* @module urlbase64
*/
'use srtict';

const mode = require('./_urlsafebase64_constants');

function checkArgument(chunk, m) {
  //TODO
}

function _encode(input) {
  if (!Buffer.isBuffer(input)) {
    //TODO
  }

  return input.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function _decode(urlbase64){
  //TODO
  let l = urlbase64.length;
  let base64 = urlbase64 + '='.repeat((4-l%4)%4);

  return Buffer.from(base64,'base64');
}

function _validate(urlbase64){
  //TODO
}

/**
*
*
*/
class UrlsafeBase64 {
  constructor() {
    this._buffer = null;
    this._mode = mode.ENCODE;
  }

  update(chunk) {
    this._buffer = checkArgument(chunk);
  }

  digest() {
    //TODO
    switch (this._mode) {
      case mode.ENCODE:
        console.log('[INFO] ENCODE');
        break;
      case mode.DECODE:
        console.log('[INFO] DECODE');
        break;
      default:
        return this._buffer.toString('utf-8');
    }
  }

  encode() {
    this._mode = mode.ENCODE;
    return this;
  }

  decode() {
    this._mode = mode.DECODE;
    return this;
  }

}

exports.UrlsafeBase64 = UrlsafeBase64;
