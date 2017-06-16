//var swt = require('simplewebtoken');


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
      usage: 'verify',
      algorithms: [ 'hmac-sha256' ]
    }
    
    
  };
};
