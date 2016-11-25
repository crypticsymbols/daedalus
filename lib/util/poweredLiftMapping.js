var math = require('./math')

function getControlInputPlane(attitudeInputs) {
  return [
    {x: 0, y: 0, z: 0}, // one point is our center, always 0,0,0
    {x: 0, y: 1, z: -attitudeInputs.xR}, // PITCH: X=0, Pos yR = +z (because Z faces down)
    {x: 1, y: 0, z: attitudeInputs.yR} // ROLL: X=1, Pos yR = +z
  ]
}

function getZFactor(points, motorX, motorY) {
  // @TODO inverse scale so closer motors get more throttle
  var point = math.pointZUnderPlane(points, motorX, motorY)
  // console.log(points, motorX, motorY, point.z)
  return point.z
}

function scaledThrottle(throttle, factor, maxScale) {
  var adjustment = factor * maxScale
  return throttle + adjustment
}

function throttleAdjustmentMaximum(throttle) {
  return throttle * 0.1
}

function scaleWithYaw(motorPoint, yawFactor, throttle) {
  var adjustment = throttle * yawFactor
  if (motorPoint.rotation === 'cw') {
    return throttle - adjustment
  } else if (motorPoint.rotation === 'ccw') {
    return throttle + adjustment
  } else {
    return throttle
  }
}

// Consider restructuring to:
//
// set motor points
// set limits
// set control inputs
// -- throttle -> "power", could be 0-relative or % based on mode!
// -- pitch
// -- roll
// -- yaw
// extract throttle values
//
// allow vehicle to override any function in constructor

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
