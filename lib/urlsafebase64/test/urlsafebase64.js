'use strict';

const urlbase64 = require('../');
const mode = require('../lib/_urlsafebase64_constants');
const should = require('chai').should();

describe('urlbase64',function(){
  let testInstance;

  beforeEach(function(){
    testInstance = urlbase64.createUrlsafeBase64();
  });

  describe('#encode()',function(){
    it('The mode should be encoding', function(){
      return new Promise((res,rej)=>{
        testInstance.encode().mode.should.equal(mode.ENCODE);
        res();
      });
    });
  });

  describe('#decode()',function(){
    it('The mode should be decoding',function(){
      return new Promise((res,rej)=>{
        testInstance.decode().mode.should.equal(mode.DECODE);
        res();
      });
    });
  });

  describe('#update()',function(){
    it('Should fill the internal buffer',function(done){
      console.log(testInstance.mode);
      done();
    });
  });

  describe('#digest()',function(){
    it('Should encode in url base 64 the internal buffer');
    it('Should decode the internal buffer');
  });
});
