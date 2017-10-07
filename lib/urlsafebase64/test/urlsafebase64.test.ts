import { Urlbase64Mode, UrlsafeBase64 } from '../src/Urlbase64';
import { expect } from 'chai';

import createUrlsafeBase64 from '../src/Urlbase64';

describe('UrlsafeBase64', function() {
  let testInstance: UrlsafeBase64;

  beforeEach(function() {
    testInstance = createUrlsafeBase64();
  });

  describe('#encode()', function() {
    it('The mode should be encoding', function() {
      return new Promise<void>((res, rej) => {
        try {
          expect(testInstance.encode().mode).to.be.equals(Urlbase64Mode.ENCODE);
          res();
        } catch (err) {
          rej(err);
        }
      });
    });
  });

  describe('#decode()', function() {
    it('The mode should be decoding', function() {
      return new Promise<void>((res, rej) => {
        try {
          expect(testInstance.decode().mode).to.be.equals(Urlbase64Mode.DECODE);
          res();
        } catch (err) {
          rej(err);
        }
      });
    });
  });

  describe('#update()', function() {
    it('Should fill the internal buffer');
  });

  describe('#digest()', function() {
    it('Should encode in url base 64 the internal buffer');
    it('Should decode the internal buffer');
  });
});
