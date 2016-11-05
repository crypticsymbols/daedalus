var pwmController = require('../util/pwm');
var imuInterface = require('../util/imu');
var controlHandler = require('../util/controls');
var poweredLift = require('../util/poweredLiftMapping');
// var utils = require('../util/shared');
var EventEmitter = require('events');
var util = require('util')
var modeHandler = require('../modes/modes')

var Modes = require('../modes/modes')
function Copter(options){

  this.options = options;

  this.pwmControl = new pwmController();
  this.controls = new controlHandler(options);

  this.vehicleState = {
    imu: new imuInterface().getIMU
  }

  this.mode = 'manual';
  this.modes = new modeHandler();

  this.handleControlInputs = function(inputs){
    var motorMap = this.options.motorMap;
    try{
      for (var pwmChannel in motorMap){
        var throttleForMotor = poweredLift.getMotorThrottle(inputs, motorMap[pwmChannel]);
        this.pwmControl.setChanneluS(pwmChannel, throttleForMotor);
        process.emit('log', {motor: {channel: pwmChannel, throttle: throttleForMotor}})
      }
    } catch (e){
      this.emit('error', e);
    }
    process.emit('log', inputs)
  }.bind(this)

  this.updateControlInput = function(rawInputs){
    this.controls.setState(rawInputs, this.handleControlInputs);
  }

  this.calibrationRoutine = function(mode){
    var value;
    if (mode == 'high'){
      value = this.maxThrottle;
    } else if (mode == 'mid'){
      value = this.midThrottle;
    } else if (mode == 'low'){
      value = this.minThrottle;
    }
    for (var pwmChannel in this.motorMap){
      this.pwmControl.setChanneluS(pwmChannel, value);
    }
  }

  return this;
};




util.inherits(Copter, EventEmitter);
module.exports = Copter
