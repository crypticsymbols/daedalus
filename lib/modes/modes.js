module.exports = function(vehicleConfig){

  var config = vehicleConfig;

  this.manual = function(controlState, vehicleState, controlFunc){
    controlFunc(controlState)
  }

  this.calibration = function(controlState, vehicleState, controlFunc){
    var stage = vehicleState.currentMode.options.stage;
    var pwmRange = config.throttle;
    controlState.attitude.xR = 0;
    controlState.attitude.yR = 0;
    controlState.attitude.zR = 0;
    controlState.throttle = pwmRange[stage];
    controlFunc(controlState);
  }

  this.stabilize = function(controlState, vehicleState, controlFunc){
    var imuData = vehicleState.imu()
    var trimX = controlState.attitude.xR
    var trimY = controlState.attitude.yR

    var accelX = imuData.ax;
    var accelY = imuData.ay;
    var gyroX = imuData.gx;
    var gyroY = imuData.gy;

    process.emit('log', imuData)

    controlState.attitude.x = (accelX / 10) + trimX
    controlState.attitude.y = (accelY / 10) + trimY

    controlFunc(controlState)
  }

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
