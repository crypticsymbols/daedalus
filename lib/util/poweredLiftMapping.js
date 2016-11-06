var math = require('./math')

var getControlInputPlane = function(attitudeInputs) {
  return [
    {x: 0, y: 0, z: 0}, // one point is our center, always 0,0,0
    {x: 0, y: 1, z: -attitudeInputs.xR}, // PITCH: X=0, Pos yR = +z (because Z faces down)
    {x: 1, y: 0, z: attitudeInputs.yR} // ROLL: X=1, Pos yR = +z
  ]
}

var getZFactor = function(points, motorX, motorY) {
  // @TODO inverse scale so closer motors get more throttle
  var point = math.pointZUnderPlane(points, motorX, motorY)
  // console.log(points, motorX, motorY, point.z)
  return point.z
}

var scaledThrottle = function(throttle, factor, maxScale) {
  var adjustment = factor * maxScale
  return throttle + adjustment
}

var throttleAdjustmentMaximum = function(throttle) {
  return throttle * 0.1
}

var scaleWithYaw = function(motorPoint, yawFactor, throttle) {
  var adjustment = throttle * yawFactor
  if (motorPoint.rotation == 'cw') {
    return throttle - adjustment
  } else if (motorPoint.rotation == 'ccw') {
    return throttle + adjustment
  } else {
    return throttle
  }
}

module.exports = {
  getMotorThrottle: function(controlInputs, motorPoint) {
    var motorX = motorPoint.x
    var motorY = motorPoint.y
    //
    // This would be a great place for a promise chain
    //
    var inputPlane = getControlInputPlane(controlInputs.attitude)
    var zResult = getZFactor(inputPlane, motorX, motorY)
    var scaleMax = throttleAdjustmentMaximum(controlInputs.throttle)
    var newVal = scaledThrottle(controlInputs.throttle, zResult, scaleMax)
    var withYaw = scaleWithYaw(motorPoint, controlInputs.attitude.zR, newVal)

    if (typeof (withYaw) === 'number' && !isNaN(withYaw)) { // funny how NaN is a number
      return withYaw
    } else {
      // if we messed up bad, return the original throttle setting.
      return controlInputs.throttle
    }
  }
}
