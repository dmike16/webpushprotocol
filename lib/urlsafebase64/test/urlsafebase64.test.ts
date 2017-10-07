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
      return testingPromise(()=>{
        expect(testInstance.encode().mode).to.be.equals(Urlbase64Mode.ENCODE);
      })
    });
  });

  describe('#decode()', function() {
    it('The mode should be decoding', function() {
      return testingPromise(()=>{
        expect(testInstance.decode().mode).to.be.equals(Urlbase64Mode.DECODE);
      })
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

function testingPromise(test:(arg?:void)=>void){
  return new Promise<void>((resolve,reject)=>{
    try{
      test();
      resolve();
    }catch(err){
      reject(err);
    }
  })
}
