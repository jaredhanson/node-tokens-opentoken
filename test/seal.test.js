var otk = require('opentoken');
var setup = require('../lib/seal');
var sinon = require('sinon');
var expect = require('chai').expect;


describe('seal', function() {
  
  describe('using defaults', function() {
    var seal, keying;

    before(function() {
      keying = sinon.spy(function(q, cb){
        if (!q.recipient) {
          return cb(null, [ { secret: '12abcdef7890abcdef7890abcdef7890' } ]);
        }
      });
      
      seal = setup(keying);
    });
    
    
    describe('encrypting to self', function() {
      var token;
      var now = new Date();
      
      before(function(done) {
        seal({ foo: 'bar' }, function(err, t) {
          token = t;
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
          recipient: undefined,
          usage: 'deriveKey',
          algorithms: [ 'pbkdf2' ]
        });
      });
      
      it('should generate a token', function() {
        expect(token.length > 1).to.be.true;
      });
      
      describe('verifying token', function() {
        var claims;
        before(function(done) {
          var api = new otk.OpenTokenAPI(2, '12abcdef7890abcdef7890abcdef7890');
          api.parseToken(token, function (err, data) {
            if (err) { return done(err); }
            claims = data;
            done();
          });
        });
        
        it('should be valid', function() {
          expect(claims).to.be.an('object');
          expect(claims.foo).to.equal('bar');
        });
      });
    }); // encrypting to self
  
  }); // using defaults
  
}); // seal
