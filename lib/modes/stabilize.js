/*eslint no-magic-numbers: false*/
'use strict'
var BaseMode = require('./baseMode')

class Stabilize extends BaseMode {

  constructor() {
    super()
    this.heartbeat = 100
    this.startTime = process.hrtime()
  }

  filter() { //move to class or C++ later
    var startTime = this.startTime
    var nowTime = process.hrtime()
    // var diffSec = ((nowTime[0]-startTime[0]) * 1000000)
    // var diffMs = +((nowTime[1] - startTime[1]))
    var startNs = (startTime[0] * 1000000000) + startTime[1]
    var endNs = (nowTime[0] * 1000000000) + nowTime[1]
    // var nS = (endNs-startNs)
    // var uS = nS/1000
    var mS = (endNs-startNs)/1000/1000
    // var S = mS/1000
    // console.log('Sec: ' + S + ' mS: ' + mS + 'uS: ' + uS + ' nS: ' + nS)
    // console.log(' mS: ' + mS)
    //
    // get gyro angle estimate by multiplying rate/sec by time since last tick
    //
    // normalize accel value by scaling by total acel in 3d
    //
    // get accel estimate by converting value to deg tilt
    //
    //
    //
  }

  tick(inputs, vehicleState, controlFunction) {
    // how much weight to give to user input
    // this.filter()

    const trimFactor = 10
    var imuData = vehicleState.getImuState()
    var trimX = inputs.attitude.xR
    var trimY = inputs.attitude.yR

    var accelX = imuData.ax
    var accelY = imuData.ay
    // var gyroX = imuData.gx
    // var gyroY = imuData.gy

    process.emit('log', {imu: imuData})

    inputs.attitude.x = -(accelX / trimFactor) + trimX
    inputs.attitude.y = (accelY / trimFactor) + trimY

    controlFunction(inputs)
  }
}

module.exports = Stabilize

