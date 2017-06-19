/* global describe, it */

var otk = require('opentoken');
var setup = require('../lib/unseal');
var sinon = require('sinon');
var expect = require('chai').expect;


describe('unseal', function() {
  
  describe('using defaults', function() {
    var unseal, keying;
    
    describe('decrypting', function() {
      before(function() {
        keying = sinon.spy(function(q, cb){
          return cb(null, [ { secret: '12abcdef7890abcdef7890abcdef7890' } ]);
        });
      
        unseal = setup(keying);
      });
      
      var tkn;
      before(function(done) {
        var api = new otk.OpenTokenAPI(2, '12abcdef7890abcdef7890abcdef7890');
        var claims = { foo: 'bar' };
        claims.subject = 'self';
      
        api.createToken(claims, function(err, token) {
          if (err) { return done(err); }
          
          unseal(token, function(err, t) {
            tkn = t;
            done(err);
          });
        });
      });
      
      after(function() {
        keying.reset();
      });
      
      it('should query for key', function() {
        expect(keying.callCount).to.equal(1);
        var call = keying.getCall(0);
        expect(call.args[0]).to.deep.equal({
          usage: 'deriveKey',
          algorithms: [ 'pbkdf2' ],
        });
      });
      
      it('should unseal token', function() {
        expect(tkn).to.be.an('object');
        expect(Object.keys(tkn)).to.have.length(2);
        
        // TODO:
        /*
        expect(tkn.headers.issuer).to.equal('self');
        expect(tkn.headers.audience).to.deep.equal([ 'self' ]);
        // TODO: assert expiration
        expect(tkn.claims).to.deep.equal({
          Foo: 'bar'
        });
        */
      });
    }); // decrypting
    
  }); // using defaults
  
}); // unseal
