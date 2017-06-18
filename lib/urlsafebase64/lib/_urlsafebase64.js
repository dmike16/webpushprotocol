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
* @module _urlsafebase64
*/
'use srtict';

const mode = require('./_urlsafebase64_constants');

/**
 * Internal function used to check the argumento of UrlsafeBase64#update
 * @private
 * @param  {Buffer|String|TypedArray} chunk input argument pass
 * @return {Buffer}       The buffer that wraps the input
 */
function checkArgument(chunk) {
  if(typeof chunk === 'string' || Buffer.isBuffer(chunk)){
    return Buffer.from(chunk);
  }else if(typeof chunk.buffer instanceof ArrayBuffer){
    let view = Buffer.from(chunk.buffer);
    return Buffer.from(view);
  }else{
    throw new TypeError('The argument must be a string, a Buffer or a TypedArray');
  }
}

/**
 * Internal fucntion used to encode in url safe base64.
 * @private
 * @param       {Buffer} input The buffer to encode
 * @return      {String}       The encode string
 */
function _encode(input) {
  return input.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
/**
 * Internal function used to decode the url safe base64
 * @private
 * @param       {String} urlbase64 The encode string
 * @return      {String}           The decoded string
 */
function _decode(urlbase64){
  let l = urlbase64.length;
  let base64 = urlbase64 + '='.repeat((4-l%4)%4);
  base64.replace(/\-/g,'+').replace(/\_/g,'/');
  return Buffer.from(base64,'base64');
}

/**
 * Internal class that implemente the urlsafebase64
 * protocol.
 * @private
 * @class UrlsafeBase64 UrlsafeBase64
 */
class UrlsafeBase64 {
  constructor() {
    this._buffer = null;
    this._mode = mode.ENCODE;
  }
  /**
   * Update the internal buffer with the input passed.
   * @param  {Buffer|String|TypedArray} chunk The chunk to be processed
   */
  update(chunk) {
    this._buffer = checkArgument(chunk);
  }
  /**
   * Make the encode or decode in base64
   * @return {String} The encode or decode string
   */
  digest() {
    switch (this._mode) {
      case mode.ENCODE:
        console.log('[INFO] ENCODE');
        return _encode(this._buffer);
      case mode.DECODE:
        console.log('[INFO] DECODE');
        return _decode(this._buffer);
      default:
        return this._buffer.toString('utf-8');
    }
  }
  /**
   * Set the mode to encode
   * @return {UrlsafeBase64} Return this for chaining
   */
  encode() {
    this._mode = mode.ENCODE;
    return this;
  }
  /**
   * Set the mode to decode
   * @return {UrlsafeBase64} Return this for chaining
   */
  decode() {
    this._mode = mode.DECODE;
    return this;
  }
  /**
   * [validate description]
   * @param  {String} base64 The inpur string to validate
   * @return {Boolean}       True if is base64 valid.
   */
  static validate(base64){
    return /^[A-Za-z0-9\-_]+$/.test(base64);

  }

}

exports.UrlsafeBase64 = UrlsafeBase64;
