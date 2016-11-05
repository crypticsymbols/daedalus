var pwmController = require('../util/pwm');
var imuInterface = require('../util/imu');
var controlHandler = require('../util/controls');
var poweredLift = require('../util/poweredLiftMapping');
var EventEmitter = require('events');
var util = require('util')
var modeHandler = require('../modes/modes')
var Modes = require('../modes/modes')

function Copter(options){

  this.options = options;
  this.pwmControl = new pwmController();
  this.controls = new controlHandler(options);
  this.modes = new modeHandler(this.options);
  this.vehicleState = {
    imu: new imuInterface().getIMU,
    currentMode: {
      name: 'calibration',
      options: {stage: 'low'}
    }
  }

  this.setMode = function(mode){
    this.vehicleState.currentMode = mode;
    var controls = this.controls.getState();
    this.handleControlInputs(controls);
  }

  this.updateConfig = function(values){
    //
    // @TODO flesh this out
    //
    this.setMode(values);
  }

  this.control = function(controlValues){
    var motorMap = this.options.motorMap;
    try{
      for (var pwmChannel in motorMap){
        var throttleForMotor = poweredLift.getMotorThrottle(controlValues, motorMap[pwmChannel]);
        this.pwmControl.setChanneluS(pwmChannel, throttleForMotor);
        // console.log('set PWM '+throttleForMotor+' for channel '+pwmChannel);
        process.emit('log', {motor: {channel: pwmChannel, throttle: throttleForMotor}})
      }
    } catch (e){
      this.emit('error', e);
    }
    process.emit('log', controlValues)
  }.bind(this);

  this.handleControlInputs = function(inputs){
    // This gets called from the updated control handler
    // and then we call our current mode
    var modeController = this.modes[this.vehicleState.currentMode.name];
    modeController(inputs, this.vehicleState, this.control)
  }.bind(this)

  this.updateControlInput = function(rawInputs){
    this.controls.setState(rawInputs, this.handleControlInputs);
  }.bind(this);

  return this;
};




util.inherits(Copter, EventEmitter);
module.exports = Copter
