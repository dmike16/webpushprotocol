import { Urlbase64Mode, UrlsafeBase64 } from '../src/Urlbase64';

import createUrlsafeBase64 from '../src/Urlbase64';
import { expect } from 'chai';

describe('UrlsafeBase64', function() {
  let testInstance: UrlsafeBase64;

  beforeEach(function() {
    testInstance = createUrlsafeBase64();
  });

  describe('#encode()', function() {
    it('The mode should be encoding', function() {
      return testingPromise(() => {
        expect(testInstance.encode().mode).to.be.equals(Urlbase64Mode.ENCODE);
      })
    });
  });

  describe('#decode()', function() {
    it('The mode should be decoding', function() {
      return testingPromise(() => {
        expect(testInstance.decode().mode).to.be.equals(Urlbase64Mode.DECODE);
      })
    });
  });

  describe('#update()', function() {
    it('Should fill the internal buffer', function() {
      return testingPromise(() => {
        let s = 'ABCDEFG';
        testInstance.update(s)
        expect(testInstance.digest()).to.have.lengthOf.above(1);
      })
    });
  });

  describe('#digest()', function() {
    let message: string;
    let urlbase64_test :string;
      beforeEach(function() {
        message = '+ Hello urlsafebase64 +';
        urlbase64_test = Buffer.from(message).toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      });
    it('Should encode in url base 64 the internal buffer', function() {
      testInstance.update(message);
      expect(testInstance.digest()).to.be.equals(urlbase64_test);
    });
    it('Should decode the internal buffer',function(){
      testInstance.on('data',(chunk)=>{
        expect(chunk.toString()).to.be.equals(message);
      });
      testInstance.write(urlbase64_test);
      testInstance.decode().end();
    });
  });
});

function testingPromise(test: (arg?: void) => void) {
  return new Promise<void>((resolve, reject) => {
    try {
      test();
      resolve();
    } catch (err) {
      reject(err);
    }
  })
}
