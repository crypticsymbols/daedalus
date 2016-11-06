module.exports = function(vehicleConfig, controlFunction, vehicleState) {
  //
  // Things we need to control the vehicle
  //
  var vControl = controlFunction
  var vConfig = vehicleConfig
  var vState = vehicleState

  // Default mode, @todo make configable in constructor
  var currentMode = {
    name: 'manual'
  }

  // Ticker helper for modes that need to loop (stabilization, etc)
  var timer
  var tick = () => { console.log('tick', Math.random()) }
  var ensureTicker = (mS) => {
    if (!timer) {
      timer = setInterval(tick, mS)
    }
  }
  var stopTicker = () => {
    clearInterval(timer)
    timer = null
  }

  var allModes = {
    manual: (inputs) => {
      stopTicker()
      controlFunction(inputs)
    },
    stabilize: (inputs) => {
      const mS = 100
      ensureTicker(mS)
      controlFunction(inputs)
    }
  }

  // passes new control inputs to current mode, called by vehicle
  this.handleInputs = (inputs) => {
    this.getMode()(inputs)
  }

  // mode getter
  this.getMode = () => {
    return allModes[currentMode.name]
  }

  // Initialize after a mode switch.
  // Mode switches (ex, to "return to home") should
  // not have to be then triggered by external control signals
  var kickCurrent = () => {
    var mode = this.getMode()
    var controlState = vState.getControlState()
    mode(controlState)
  }

  // mode setter
  this.setMode = (mode) => {
    currentMode = mode
    kickCurrent()
    return currentMode
  }
  //
  // mode definitions
  //
  // var config = vehicleConfig;

  // this.manual = function(controlState, vehicleState, controlFunc){
    // controlFunc(controlState)
  // }

  // this.calibration = function(controlState, vehicleState, controlFunc){
    // var stage = vehicleState.currentMode.options.stage;
    // var pwmRange = config.throttle;
    // controlState.attitude.xR = 0;
    // controlState.attitude.yR = 0;
    // controlState.attitude.zR = 0;
    // controlState.throttle = pwmRange[stage];
    // controlFunc(controlState);
  // }

  // this.stabilize = function(controlState, vehicleState, controlFunc){
    // var imuData = vehicleState.imu()
    // var trimX = controlState.attitude.xR
    // var trimY = controlState.attitude.yR

    // var accelX = imuData.ax;
    // var accelY = imuData.ay;
    // var gyroX = imuData.gx;
    // var gyroY = imuData.gy;

    // process.emit('log', {imu: imuData})

    // controlState.attitude.x = (accelX / 10) + trimX
    // controlState.attitude.y = (accelY / 10) + trimY

    // controlFunc(controlState)
  // }
}

// this.modes = {
//   'manual': Manual(this.controlState, this.controlFunc),
//   'stabilize': Stabilize(this.controlState, this.controlFunc, IMUData),
//   'altHold': AltHold(this.controlState, this.controlFunc, altimeter),
//   // Xhold
//   // YHold
//   // ZHold
//   // X-R Hold
//   // Y-R Hold
//   // Z-R Hold
//   // PlaneHold: althold, hillHold
//   // PathHold: straight to point, follow arc (is a path just 2 planes?)
//   // PointHold: hover, circle (circle uses pathhold:arc)
//   // ContourHold: nap'o'earth, follow wall, etc.
//   'goToPoint': GoTo(this.controlState, this.controlFunc, gps, alt),
// }
