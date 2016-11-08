'use strict'
var BaseMode = require('./baseMode')

class Stabilize extends BaseMode {

  constructor() {
    super()
    this.heartbeat = 100
  }

  tick(inputs, vehicleState, controlFunction) {
    // how much weight to give to user input
    const trimFactor = 10
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
}

module.exports = Stabilize

