var motorControl = require('../motors');

module.exports = {
  init: function(opts){
    this.minThrottle = opts.minThrottle;
    this.midThrottle = opts.midThrottle;
    this.maxThrottle = opts.maxThrottle;
    return this;
  },
  controlInput: function(inputs){
    // powered lift = normalize inputs with throttle

    // map relative x,y to motors based on the motors' x,y values
    var motors = {
      3: {x: 1, y: 1},
      4: {x: 1, y: -1},
      5: {x: -1, y: -1},
      6: {x: -1, y: 1}
    }
    // var d = {
      var pitchMap = function(){
        // positive x
        var pitchMap = {};
        for(var channel in motors){
          if (motors[channel].x > 0){
            pitchMap[channel] = motors[channel].x;
          }
        }
        return pitchMap;
      }();
      var rollMap = function(){
        // positive y
        var rollMap = {};
        
        return rollMap;
      }();
    // }
    var xyMap = function(){
      var map = {x: {}, y: {}};
      for(var channel in motors){
        map.x[channel] = motors[channel].x;
        map.y[channel] = motors[channel].y;
        // if (motors[channel].y > 0){
        //   rollMap[channel] = motors[channel].y;
        // }
      }
      return map;
    }();

    console.log(xyMap);

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
