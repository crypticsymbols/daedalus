var ref = require('ref');
var ffi = require('ffi');

var throttleControl = ffi.Library('../Navio/Examples/Servo/Servo', {
  "set":['void', ['float', 'float']]
});

module.exports = {
  setThrottle: function(a, b, c, d){
    throttleControl.set(a, b, c, d);
  }
}
