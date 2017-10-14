/**
* This nodejs module contain encode and decode urlbase64 utilities.
* The urlbase64 mode is similar to the standar base64 except that replace:
* <ul>
*   <li>'+' with '-'</li>
*   <li>'/' with '_'</li>
*   <li> remove trailing '='</li>
* </ul
* @author dmike <cipmiky@gmail.com>
*/

import { Transform } from 'stream';

/**
 * Default export. Factory function.
 * @return {UrlsafeBase64}
 */
export default function createUrlsafeBase64(): UrlsafeBase64 {
  return new UrlsafeBase64({});
}

/**
 * Constant enum da define encoding and decoding mode.
 */
export const enum Urlbase64Mode {
  ENCODE = "ENCODE",
  DECODE = "DECODE"
}

/**
 * Class that implemente the urlsafebase64 protocol.
 * This class can be used like a Stream or using the  method
 * [[update]]
 * [[digest]]
 * @see {@link https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_implementing_a_transform_stream|Trasform}
 */
@Sealed
export class UrlsafeBase64 extends Transform {
  private _handler = new binding.UrlsafeBase64Core();
  /**
   * Default constructor, that call the super constructor of Trasform stream.
   * @param  {Object} option Object
   */
  constructor(option: any) {
    super(option);
    option.writableObjectMode = true;
  }
  /**
   * Implement the Transform._transform function that
   * is called by the write method of Transform stream.
   * @private
   * @param  {Buffer}   chunk    The buffer to be trasformed
   * @param  {String}   encoding The encoding
   * @param  {Function} callback A callback function
   */
  _transform(chunk: Buffer | string | TypedArray, encoding: string, callback: (err?: Error) => void) {
    var _err = null;
    try {
      this.update(chunk);
    } catch (err) {
      _err = err;
    } finally {
      callback(_err);
    }
  }
  /**
   * Push the last byte on the stream before the end event
   * is emitted.
   * @private
   * @param  {Function} callback A callback function
   */
  _flush(callback: (chunk?: any) => void) {
    this.push(this._handler.digest());
    callback();
  }
  /**
   * Update the internal buffer with the input passed.
   * @param  {String|Buffer|TypedArray} chunk Input source to parse
   */
  update(chunk: Buffer | string | TypedArray) {
    this._handler.update(chunk);
  }
  /**
   * Make the encode or decode in base64
   * @return {String} The encode or decode string
   */
  digest() {
    return this._handler.digest();
  }
  /**
   * Set the mode to encode
   * @return {UrlsafeBase64} Return this for chaining
   */
  encode() {
    this._handler.encode();
    return this;
  }
  /**
   * Set the mode to decode
   * @return {UrlsafeBase64} Return this for chaining
   */
  decode() {
    this._handler.decode();
    return this;
  }
  /**
   * Get mode.
   * @return {string} Return mode: encode or decode
   */
  get mode() {
    return this._handler.mode;
  }
  /**
   * Check if the input contain valid base64 characters.
   * @param  {String} base64 The inpur string to validate
   * @return {Boolean}       True if is base64 valid.
   */
  static validate(base64: string) {
    return binding.UrlsafeBase64Core.validate(base64);
  }
}

/**
 * Alias type dor TypedArray
 */
export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray
  | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

/**
 * Decotarator that seal the object UrlsafeBase64
 * @private
 * @param  {Function} ctor [description]
 */
function Sealed(ctor: typeof UrlsafeBase64) {
  Object.seal(ctor);
  Object.seal(ctor.prototype);
}
/**
 * Internal namespace
 * @private
 */
namespace binding {
  /**
   * Internal class that implemente the urlsafebase64
   * protocol.
   * @private
   */
  export class UrlsafeBase64Core {
    private _buffer: Buffer = null;
    private _mode: Urlbase64Mode = Urlbase64Mode.ENCODE;

    /**
     *
     * @private
     */
    constructor() {

    }
    /**
     * Update the internal buffer with the input passed.
     * @private
     */
    update(chunk: Chunk) {
      let tmp_buffer = checkArgument(chunk);
      if (this._buffer !== null) {
        this._buffer = Buffer.concat([this._buffer, tmp_buffer], (tmp_buffer.length + this._buffer.length));
      } else {
        this._buffer = tmp_buffer;
      }
    }
    /**
     * Make the encode or decode in base64
     * @private
     */
    digest() {
      switch (this._mode) {
        case Urlbase64Mode.ENCODE:
          return _encode(this._buffer);
        case Urlbase64Mode.DECODE:
          return _decode(this._buffer.toString());
        default:
          assertNever(this._mode);
      }
    }
    /**
     * Set the mode to encode
     * @private
     */
    encode(): UrlsafeBase64Core {
      this._mode = Urlbase64Mode.ENCODE;
      return this;
    }
    /**
     * Set the mode to decode
     * @private
     */
    decode(): UrlsafeBase64Core {
      this._mode = Urlbase64Mode.DECODE;
      return this;
    }
    /**
     * Get mode.
     * @private
     */
    get mode() {
      return this._mode;
    }
    /**
     * @private
     */
    static validate(base64: string) {
      return /^[A-Za-z0-9\-_]+$/.test(base64);

    }
  }

  /**
   * Alias type to define a chunk
   * @private
   */
  type Chunk = Buffer | string | TypedArray;


  /**
   * Check compiler exhaustition
   *@private
   */
  function assertNever(x: never): never {
    throw new Error(`Unexpected object ${x}`);
  }

  /**
   * Internal function used to check the argumento of update
   * @private
   */
  function checkArgument(chunk: Chunk): Buffer {
    if (typeof chunk === 'string') {
      return Buffer.from(chunk);
    } else if (Buffer.isBuffer(chunk)) {
      return Buffer.from(chunk);
    } else {
      let view = Buffer.from(chunk.buffer);
      return Buffer.from(view);
    }
  }

  /**
   * Internal fucntion used to encode in url safe base64.
   * @private
   */
  function _encode(input: Buffer): string {
    return input.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  /**
   * Internal function used to decode the url safe base64
   * @private
   */
  function _decode(urlbase64: string): Buffer {
    let l = urlbase64.length;
    let base64 = urlbase64 + '='.repeat((4 - l % 4) % 4);
    base64.replace(/\-/g, '+').replace(/\_/g, '/');
    return Buffer.from(base64, 'base64');
  }
}
