var pwmController = require('../util/pwm');
var imuInterface = require('../util/imu');
var controlHandler = require('../util/controls');
var poweredLift = require('../util/poweredLiftMapping');
var utils = require('../util/shared');
var EventEmitter = require('events');
var util = require('util')
var modeHandler = require('../modes/modes')

var Modes = require('../modes/modes')
function Copter(options){
  this.motorMap = options.motorMap;
  this.minThrottle = options.minThrottle;
  this.midThrottle = options.midThrottle;
  this.maxThrottle = options.maxThrottle;
  this.motorMap = options.motorMap;
  
  this.pwmControl = new pwmController();
  this.controls = new controlHandler();

  this.vehicleState = {
    imu: new imuInterface().getIMU,
  //   gps: OBJECT,
  //   alt: OBJECT,
  //   baro: OBJECT,
  //   etc: OBJECT,
  }

  // 
  // 
  // mode: calculate correction/adjustment needed
  //  - passed in a callback (platform specific) that goes to x, y, or z
  // 
  // 

  this.controls.setState({attitude: {xR:0, yR:0, zR:0, throttle: 0}})

  this.mode = 'stabilize';
  this.modes = new modeHandler();

  this.heartbeat = function(){
    this.modes[this.mode](this.controls.getState(), this.handleControlInputs, this.vehicleState)
  }.bind(this)
  setInterval(this.heartbeat, 10)

  this.handleControlInputs = function(inputs){
    // var inputs = override || this.controls.getState();
    process.emit('log', inputs)
    try{
      for (var pwmChannel in this.motorMap){
        var throttleForMotor = poweredLift.getMotorThrottle(inputs, this.motorMap[pwmChannel]);
        this.pwmControl.setChanneluS(pwmChannel, throttleForMotor);
        console.log(pwmChannel, throttleForMotor)
        process.emit('log', {motor: {channel: pwmChannel, throttle: throttleForMotor}})
      }
    } catch (e){
      this.emit('error', e);
    }
  }.bind(this)

  this.updateControlInput = function(rawInputs){
    this.translateInputs(rawInputs, function(err, data){
      if (err){
        this.emit('error', e);
      } else {
        this.controls.setState(data);
        this.handleControlInputs(data);
      }
    }.bind(this));
  }
  
  this.translateInputs = function(inputs, callback){
    try{
      // throttle gets scaled to min/max PWM from %
      inputs.throttle = utils.scalePercentageToValue(inputs.throttle, this.minThrottle, this.maxThrottle);
      callback(null, inputs);
    } catch (e){
      this.emit('error', e);
      callback(e);
    }
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
