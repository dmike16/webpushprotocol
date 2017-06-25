'use strict';

const urlbase64 = require('../').createUrlsafeBase64();
const mode = require('../lib/_urlsafebase64_constants');
const should = require('chai').should();

describe('urlbase64',function(){
  describe('#encode()',function(){
    it('The mode should be encoding');
  });

  describe('#decode()',function(){
    it('The mode should be decoding');
  });

  describe('#update()',function(){
    it('Should fill the internal buffer');
  });

  describe('#digest()',function(){
    it('Should encode in url base 64 the internal buffer');
    it('Should decode the internal buffer');
  });
});
