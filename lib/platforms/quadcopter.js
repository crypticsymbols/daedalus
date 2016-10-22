var motorControl = require('../motors');
var poweredLift = require('../util/poweredLiftMapping');
var utils = require('../util/shared');

module.exports = {
  init: function(opts){
    this.motorMap = opts.motorMap;
    this.minThrottle = opts.minThrottle;
    this.midThrottle = opts.midThrottle;
    this.maxThrottle = opts.maxThrottle;
    this.motorMap = opts.motorMap;
    // this.maxAbsoluteDeflection = opts.maxAbsoluteDeflection;
    return this;
  },
  translateInputs: function(raw){
    // throttle gets scaled to min/max PWM from %
    raw.throttle = utils.scalePercentageToValue(raw.throttle, this.minThrottle, this.maxThrottle);
    return raw;
  },
  controlInput: function(rawInputs){

    var controlInputs = this.translateInputs(rawInputs);
    // X - up/down, + is up
    // Y- left/right, + is right
    // Xmoment: + is pitch up, - is pitch down
    // YMoment - + is roll left (right up), - is roll left (left up)

    for (var pwmChannel in this.motorMap){
      var throttleForMotor = poweredLift.getMotorThrottle(controlInputs, this.motorMap[pwmChannel]);
      console.log(pwmChannel, throttleForMotor, controlInputs.throttle);
      motorControl.setThrottle(pwmChannel, throttleForMotor);
    }
  },
  calibrationRoutine: function(mode){
    var value;
    if (mode == 'high'){
      value = this.maxThrottle;
    } else if (mode == 'mid'){
      value = this.midThrottle;
    } else if (mode == 'low'){
      value = this.minThrottle;
    }
    for (var pwmChannel in this.motorMap){
      motorControl.setThrottle(pwmChannel, value);
    }
  }
}
