var pwmController = require('../util/pwm');
var imuInterface = require('../util/imu');
var poweredLift = require('../util/poweredLiftMapping');
var utils = require('../util/shared');
var EventEmitter = require('events');
var util = require('util')

var Modes = require('../modes/modes')
function Copter(options){
  this.motorMap = options.motorMap;
  this.minThrottle = options.minThrottle;
  this.midThrottle = options.midThrottle;
  this.maxThrottle = options.maxThrottle;
  this.motorMap = options.motorMap;
  this.pwmControl = new pwmController();
  
  this.imuReader = new imuInterface();

  // 
  // 
  // 
  // setInterval(function(){
  //   try{
  //     console.log(this.imuReader.getIMU())
  //   } catch (e){
  //     console.log(e)
  //   }
  // }.bind(this), 10)
// 
// 
// 
// 

//   this.mode = 'manual'
// this.modes = Modes;
//   this.setMode = function(mode){
//     this.mode = mode;
//   }
// var derp = function(msg){
//   console.log(msg)
// }
//   this.handleWithMode = function(msg){
//     this.modes[this.mode].handle(msg, derp)
//   }

  this.translateInputs = function(inputs, callback){
    
    // this.handleWithMode('hallooooo')
    // this.setMode('stabilize')
    // this.handleWithMode('nope')
    // this.modes.stabilize()

    // 
    // Probably will relocate to mode handlers
    // 
    try{
      // throttle gets scaled to min/max PWM from %
      inputs.throttle = utils.scalePercentageToValue(inputs.throttle, this.minThrottle, this.maxThrottle);
      callback(null, inputs);
    } catch (e){
      this.emit('error', e);
      callback(e);
    }
  }

  this.handleControlInputs = function(inputs){
    try{
      for (var pwmChannel in this.motorMap){
        var throttleForMotor = poweredLift.getMotorThrottle(inputs, this.motorMap[pwmChannel]);
        // console.log(this.pwmControl);
        // console.log(pwmChannel, throttleForMotor, inputs.throttle);
        this.pwmControl.setChanneluS(pwmChannel, throttleForMotor);
      }
      this.emit('controlInputUpdated', inputs);
    } catch (e){
      this.emit('error', e);
    }
  }

  this.updateControlInput = function(rawInputs){
    this.translateInputs(rawInputs, function(err, data){
      if (err){
        this.emit('error', e);
      } else {
        this.handleControlInputs(data)
      }
    }.bind(this));
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
