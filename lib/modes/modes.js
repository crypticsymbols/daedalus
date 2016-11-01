module.exports = function(){

  this.manual = function(controlState, controlFunc){
    controlFunc(controlState)
  }

  this.stabilize = function(controlState, controlFunc, vehicleState){
    var imuData = vehicleState.imu()
    var trimX = controlState.attitude.x / 100
    var trimY = controlState.attitude.y / 100

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