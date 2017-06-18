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

/**
* Encode the input argument in a url safe base 64 mode.
* @alias module:urlbase64.encode
* @param {buffer} input
*/
function _encode(input) {
  if (!Buffer.isBuffer(input)) {
    //TODO
  }

  return input.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
* @alias module:urlbase64.decode
* @param {string} urlbase64
*/
function _decode(urlbase64){
  //TODO
  let l = urlbase64.length;
  let base64 = urlbase64 + '='.repeat((4-l%4)%4);

  return Buffer.from(base64,'base64');
}

function _validate(urlbase64){
  //TODO
}

module.exports = {
  encode : _encode,
  decode : _decode,
  validate : _validate
};
