var motorControl = require('../motors');
var poweredLift = require('../util/poweredLiftMapping');

module.exports = {
  init: function(opts){
    this.motorMap = opts.motorMap;
    this.minThrottle = opts.minThrottle;
    this.midThrottle = opts.midThrottle;
    this.maxThrottle = opts.maxThrottle;
    this.motorMap = opts.motorMap;
    return this;
  },
  controlInput: function(controlInputs){

    // X - up/down, + is up
    // Y- left/right, + is right
    // 
    // Xmoment: + is pitch up, - is pitch down
    // YMoment - + is roll left (right up), - is roll left (left up)

    for (var pwmChannel in this.motorMap){
      var throttleForMotor = poweredLift.getMotorThrottle(controlInputs, this.motorMap[pwmChannel]);
      console.log(pwmChannel, throttleForMotor);
      motorControl.setThrottle(pwmChannel, throttleForMotor);
    }

  }
}
