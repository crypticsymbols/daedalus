var ref = require('ref');
var ffi = require('ffi');

var throttleControl = ffi.Library(__dirname+'/../Navio/Examples/Servo/Servo', {
  "set":['void', ['float', 'float', 'float', 'float']],
  "setup":['Control', []]
});

module.exports = {
  setThrottle: function(a, b, c, d){
    // console.log(a, b, c, d);
    throttleControl.set(a, b, c, d);
  },
  setup: function(){
    throttleControl.setup();
  }
}
