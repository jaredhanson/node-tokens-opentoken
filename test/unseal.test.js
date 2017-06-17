/* global describe, it */

var setup = require('../lib/unseal');
var sinon = require('sinon');
var expect = require('chai').expect;


describe('unseal', function() {
  
  describe('using defaults', function() {
    var unseal, keying;
    
    describe('unsealing', function() {
      before(function() {
        keying = sinon.spy(function(q, cb){
          return cb(null, [ { secret: '12abcdef7890abcdef7890abcdef7890' } ]);
        });
      
        unseal = setup(keying);
      });
      
      var tkn;
      before(function(done) {
        var token = 'T1RLAQKwHntT6Nuqrownyf7EV4md28r-tRDDZ7R5gt0TPlfZpH_g4IhWAABwQ7jB_kmopB2RnQ4UMT1Ua_N1NTqPCdJaY9An7YvTSIfsD1t-FoKoCD5-MT79JBypCb0d8pkzEksCJJk1fG8g8IKeBmNufjcK5gZa5yQle_tykMgslb_tPvR4A9hDZy2rPWEefoZEUYckDL7P_zlm7A**';
        
        unseal(token, function(err, t) {
          tkn = t;
          done(err);
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
    }); // unsealing
    
  });
  
});
