var otk = require('opentoken');


module.exports = function(options, keying) {
  if (typeof options == 'function') {
    keying = options;
    options = undefined;
  }
  options = options || {};
  
  return function opentoken_unseal(sealed, cb) {
    // TODO: Parse this and pull out the issuer and audience, pass to query
    
    // The decryption keys have been obtained, query for the verification keys.
    var query  = {
      usage: 'deriveKey',
      algorithms: [ 'pbkdf2' ]
    }
    
    keying(query, function(err, keys) {
      if (err) { return cb(err); }
      
      // TODO: Implement support for checking multiple keys
      
      var key = keys[0];
      var password = key.secret;
      
      var api = new otk.OpenTokenAPI(2, password);
      api.parseToken(sealed, function (err, claims) {
        if (err) { return done(err); }
        
        // TODO: Parse out expiration and the like (is it supposed tohave fractional seconds?)
        var tkn = {
          headers: {
          },
          claims: claims
        }
        return cb(null, tkn);
      });
    });
  };
};
