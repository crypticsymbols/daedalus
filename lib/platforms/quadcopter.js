var pwmControl = require('../util/pwm');
var poweredLift = require('../util/poweredLiftMapping');
var utils = require('../util/shared');

function Quadcopter(options){
  this.motorMap = options.motorMap;
  this.minThrottle = options.minThrottle;
  this.midThrottle = options.midThrottle;
  this.maxThrottle = options.maxThrottle;
  this.motorMap = options.motorMap;
  // this.maxAbsoluteDeflection = options.maxAbsoluteDeflection;
  return this;
};

Quadcopter.prototype.translateInputs = function(raw){
  // throttle gets scaled to min/max PWM from %
  raw.throttle = utils.scalePercentageToValue(raw.throttle, this.minThrottle, this.maxThrottle);
  return raw;
}

Quadcopter.prototype.controlInput = function(rawInputs){

  var controlInputs = this.translateInputs(rawInputs);

  for (var pwmChannel in this.motorMap){
    var throttleForMotor = poweredLift.getMotorThrottle(controlInputs, this.motorMap[pwmChannel]);
    console.log(pwmChannel, throttleForMotor, controlInputs.throttle);
    pwmControl.setChanneluS(pwmChannel, throttleForMotor);
  }
}

Quadcopter.prototype.calibrationRoutine = function(mode){
  var value;
  if (mode == 'high'){
    value = this.maxThrottle;
  } else if (mode == 'mid'){
    value = this.midThrottle;
  } else if (mode == 'low'){
    value = this.minThrottle;
  }
  for (var pwmChannel in this.motorMap){
    pwmControl.setChanneluS(pwmChannel, value);
  }
}

module.exports = Quadcopter
