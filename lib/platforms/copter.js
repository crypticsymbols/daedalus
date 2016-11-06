var PwmController = require('../util/pwm')
var ImuInterface = require('../util/imu')
var ControlHandler = require('../util/controls')
var poweredLift = require('../util/poweredLiftMapping')
var EventEmitter = require('events')
var util = require('util')
var ModeHandler = require('../modes/modes')

function Copter(options) {
  this.options = options
  this.pwmControl = new PwmController()
  this.controls = new ControlHandler(options)

  this.vehicleState = {
    getControlState: this.controls.getState,
    getImuState: new ImuInterface().getIMU
    // currentMode: {
      // name: 'calibration',
      // options: {stage: 'low'}
    // }
  }

  this.updateConfig = (values) => {
    // @TODO flesh this out
    this.setMode(values)
  }

  this.setMode = (mode) => {
    this.modeHandler.setMode(mode)
  }

  // This gets called from the updated control handler
  // and then we call our current mode
  this.handleControlInputs = (inputs) => {
    this.modeHandler.handleInputs(inputs)
  }

  // Direct human pilot input.
  // Set control state, passing the input handler which passes
  // validated, update control settings to mode handlers.
  this.updateControlInput = (rawInputs) => {
    this.controls.setState(rawInputs, this.handleControlInputs)
  }

  this.control = (controlValues) => {
    var motorMap = this.options.motorMap
    try {
      for (var pwmChannel in motorMap) {
        var throttleForMotor = poweredLift.getMotorThrottle(controlValues, motorMap[pwmChannel])
        this.pwmControl.setChanneluS(pwmChannel, throttleForMotor)
        console.log('set PWM ' + throttleForMotor + ' for channel ' + pwmChannel)
        process.emit('log', {motor: {channel: pwmChannel, throttle: throttleForMotor}})
      }
    } catch (e) {
      this.emit('error', e)
    }
    process.emit('log', controlValues)
  }

  this.modeHandler = new ModeHandler(this.options, this.control, this.vehicleState)

  return this
}

util.inherits(Copter, EventEmitter)

module.exports = Copter
