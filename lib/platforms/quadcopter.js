var pwmControl = require('../util/pwm');
var poweredLift = require('../util/poweredLiftMapping');
var utils = require('../util/shared');
var EventEmitter = require('events');
var util = require('util')

function Quadcopter(options){
  this.motorMap = options.motorMap;
  this.minThrottle = options.minThrottle;
  this.midThrottle = options.midThrottle;
  this.maxThrottle = options.maxThrottle;
  this.motorMap = options.motorMap;
  return this;
};

util.inherits(Quadcopter, EventEmitter);

Quadcopter.prototype.translateInputs = function(inputs, callback){
  try{
    // throttle gets scaled to min/max PWM from %
    inputs.throttle = utils.scalePercentageToValue(inputs.throttle, this.minThrottle, this.maxThrottle);
    callback(null, inputs);
  } catch (e){
    this.emit('error', e);
    callback(e);
  }
}

Quadcopter.prototype.handleControlInputs = function(inputs){
  try{
    for (var pwmChannel in this.motorMap){
      var throttleForMotor = poweredLift.getMotorThrottle(inputs, this.motorMap[pwmChannel]);
      // console.log(pwmChannel, throttleForMotor, inputs.throttle);
      pwmControl.setChanneluS(pwmChannel, throttleForMotor);
    }
    this.emit('controlInputUpdated', inputs);
  } catch (e){
    this.emit('error', e);
  }
}

Quadcopter.prototype.updateControlInput = function(rawInputs){
  this.translateInputs(rawInputs, function(err, data){
    if (err){
      this.emit('error', e);
    } else {
      this.handleControlInputs(data)
    }
  }.bind(this));
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
