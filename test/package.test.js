/* global describe, it */

var pkg = require('..');
var expect = require('chai').expect;


describe('tokens-opentoken', function() {
  
  it('should export hello world', function() {
    expect(pkg.seal).to.be.a('function');
    expect(pkg.unseal).to.be.a('function')
  });
  
});
