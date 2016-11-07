function Stabilize(vehicleConfig) {
  this.vehicleConfig = vehicleConfig
  this.heartbeat = 100

  // how much weight to give to user input
  const trimFactor = 10

  this.tick = (inputs, vehicleState, controlFunction) => {
    var imuData = vehicleState.getImuState()
    var trimX = inputs.attitude.xR
    var trimY = inputs.attitude.yR

    var accelX = imuData.ax
    var accelY = imuData.ay
    // var gyroX = imuData.gx
    // var gyroY = imuData.gy

    process.emit('log', {imu: imuData})

    inputs.attitude.x = (accelX / trimFactor) + trimX
    inputs.attitude.y = (accelY / trimFactor) + trimY

    controlFunction(inputs)
  }
  return this
}

module.exports = Stabilize

