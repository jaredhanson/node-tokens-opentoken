//var swt = require('simplewebtoken');


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
    
    
    
  };
};
