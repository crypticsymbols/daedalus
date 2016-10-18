var ref = require('ref');
var ffi = require('ffi');

var hello = ffi.Library('./Servo', {
  "run":['void', ['float', 'float']]
});

hello.run(1.0);
