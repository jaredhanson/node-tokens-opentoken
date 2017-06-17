var otk = require('opentoken');


module.exports = function(options, keying) {
  if (typeof options == 'function') {
    keying = options;
    options = undefined;
  }
  options = options || {};
  
  
  return function opentoken_seal(claims, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    
    
    var audience = options.audience || [];
    if (audience.length > 1) {
      return cb(new Error('Unable to seal fernet tokens for multiple recipients'));
    }
    
    var query  = {
      usage: 'deriveKey',
      recipient: audience[0],
      algorithms: [ 'pbkdf2' ]
    }
    
    keying(query, function(err, keys) {
      if (err) { return cb(err); }
      
      var key = keys[0];
      var password = key.secret;
      
      // TODO: cipher suite option
      // FIXME: bug in opentoken cause cipherSuite parameter to be ignored when encoding
      var api = new otk.OpenTokenAPI(2, password);
      claims.subject = 'self';
      
      api.createToken(claims, function(err, token) {
        if (err) { return cb(err); }
        return cb(null, token);
      });
    });
    
  };
};
