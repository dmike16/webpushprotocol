/**
* This nodejs module contain encode and decode urlbase64 utilities.
* The urlbase64 mode is similar to the standar base64 except that replace:
* <ul>
*   <li>'+' with '-'</li>
*   <li>'/' with '_'</li>
*   <li> remove trailing '='</li>
* </ul
* @author dmike <cipmiky@gmail.com>
* @module urlbase64
*/
'use strict';
const binding = require('./_urlsafebase64');
const {Transform} = require('stream');

class UrlsafeBase64{
  constructor(option){
    this._handler = new binding.UrlsafeBase64();
  }

  update(chunk,mode){
    this._handler.update(chunk,mode);
  }

  digest(){
    return this._handler.digest();
  }
}


exports.createUrlsafeBase64 = ()=>new UrlsafeBase64({});
