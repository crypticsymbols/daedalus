/*eslint no-magic-numbers: false*/
'use strict'
var BaseMode = require('./baseMode')

class Stabilize extends BaseMode {

  constructor(vConfig, vState) {
    super(...arguments)
    this.heartbeat = 100
    this.startTime = process.hrtime()
    vState.ahrs.from.on('position_sample', function(data) {
      data = JSON.parse(data)
      var imuData = {
        ax: data.position.pitch / 10, 
        ay: data.position.roll / 10, 
        gx: 0,
        gy: 0,
      }
      process.emit('log', {imu: imuData})
    })
  }

  //
  //
  // one thing to remember is that tick() will
  // get called from the AHRS data pushes as
  // well as vehicle heartbeat... consider an
  // independent tick throttle
  //
  //

  tick(inputs, vehicleState, controlFunction) {
    const trimFactor = 10
    var imuData = vehicleState.getImuState()
    var trimX = inputs.attitude.xR
    var trimY = inputs.attitude.yR
    var accelX = imuData.ax
    var accelY = imuData.ay
    // process.emit('log', {imu: imuData})
    inputs.attitude.x = -(accelX / trimFactor) + trimX
    inputs.attitude.y = (accelY / trimFactor) + trimY
    controlFunction(inputs)
  }
}

module.exports = Stabilize

