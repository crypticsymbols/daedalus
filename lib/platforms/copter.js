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
  this.accelX = 0;
  this.accelY = 0;
  this.accelZ = 0;

  setInterval(function(){
    var imuData = this.imuReader.getIMU();
    this.accelX = imuData.ax;
    this.accelY = imuData.ay;
    this.accelZ = imuData.az;
    // data output is # of deci-Gs, so:
    // X:0,Y:0,Z:10 is flat and vertical, 
    // X:7,Y:0,Z:3 is tilted 45 degrees into X
    // console.log(this.accelX, this.accelY, this.accelZ)
  }.bind(this), 10)

  this.overrideXYfromAccelerometer = function(inputs){
    
    var trimX = inputs.attitude.x / 100
    var trimY = inputs.attitude.y / 100
    
    inputs.attitude.x = (this.accelX / 10) + trimX
    inputs.attitude.y = (this.accelY / 10) + trimY

    console.log(inputs.attitude.x, inputs.attitude.y);

    return inputs;
  }
// 
// 
// 
// 

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
    rawInputs = this.overrideXYfromAccelerometer(rawInputs);
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
