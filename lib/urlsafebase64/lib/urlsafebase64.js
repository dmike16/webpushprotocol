/**
* This nodejs module contain encode and decode urlbase64 utilities.
* The urlbase64 mode is similar to the standar base64 except that replace:
* <ul>
*   <li>'+' with '-'</li>
*   <li>'/' with '_'</li>
*   <li> remove trailing '='</li>
* </ul
* @author dmike <cipmiky@gmail.com>
* @module urlsafebase64
*/
'use strict';
const binding = require('./_urlsafebase64');
const {Transform} = require('stream');

/**
 * @alias module:urlsafebase64.UrlsafeBase64
 * @classdesc Class that implemente the urlsafebase64 protocol.
 * This class can be used like a Stream or using the  method
 * [update]{@link module:urlsafebase64.UrlsafeBase64#update}
 * and [digest]{@link module:urlsafebase64.UrlsafeBase64#digest}
 * @see {@link https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_implementing_a_transform_stream|Trasform}
 */
class UrlsafeBase64 extends Transform{
  /**
   * Default constructor, that call the super constructor of Trasform stream.
   * @constructs UrlsafeBase64
   * @param  {Object} option Object
   */
  constructor(option){
    super(option);
    option.writableObjectMode = true;
    this._handler = new binding.UrlsafeBase64();
  }
  /**
   * Update the internal buffer with the input passed.
   * @param  {String|Buffer|TypedArray} chunk Input source to parse
   */
  update(chunk){
    this._handler.update(chunk);
  }
  /**
   * Make the encode or decode in base64
   * @return {String} The encode or decode string
   */
  digest(){
    return this._handler.digest();
  }
  /**
   * Check if the input contain valid base64 characters.
   * @param  {String} base64 The inpur string to validate
   * @return {Boolean}       True if is base64 valid.
   */
  static validate(base64){
    return binding.UrlsafeBase64.validate(base64);
  }
}


exports.createUrlsafeBase64 = ()=>new UrlsafeBase64({});
