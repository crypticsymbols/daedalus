var motorControl = require('../motors');

module.exports = {
  init: function(opts){
    this.minThrottle = opts.minThrottle;
    this.midThrottle = opts.midThrottle;
    this.maxThrottle = opts.maxThrottle;
  },
  controlInput: function(inputs){
    var throttle = ((this.maxThrottle - this.minThrottle) * (inputs.throttle / 100)) + this.minThrottle;
    console.log(inputs);
    var throttles = {
      left: (throttle * inputs.x) / 1000,
      right: (throttle * (1 / inputs.x)) / 1000,
      forward: (throttle * inputs.y) / 1000,
      rear: (throttle * (1 / inputs.y)) / 1000
    }

    try {
      motorControl.setThrottle(3, throttles.left);
      motorControl.setThrottle(4, throttles.right);
      motorControl.setThrottle(5, throttles.forward);
      motorControl.setThrottle(6, throttles.rear);
    } catch (e){
      console.log(throttles);
    }
  }
}
