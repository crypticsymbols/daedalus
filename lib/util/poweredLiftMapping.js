var math = require('./math');

var getControlInputPlane = function(attitudeInputs){
  // return 3 points representing a plane
  // the tilt of which represents our control inputs
  return [
    {x: 0, y: 0, z: 0}, // one point is our center, always 0,0,0
    {x: 0, y: 1, z: attitudeInputs.y}, // one point represents pitch by changing Z at X=0, Y=1
    {x: 1, y: 0, z: attitudeInputs.x} // last point represents roll by changing Z at X=1, Y=0
  ]
}

var getZFactor = function(points, motorX, motorY){
  // 
  // Something should go here to account that for some frames (Y) some motors
  // can be closer to the center for a given axis (Y, with forward being 
  // down, in the pitch axis)

  // 
  var point = math.pointZUnderPlane(points, motorX, motorY);
  // console.log(point)
  return point.z
}

var scaledThrottle = function(throttle, factor, maxScale){
  // console.log(throttle, factor, maxScale)
  var adjustment = factor * maxScale;
  return throttle + adjustment;
}

var throttleAdjustmentMaximum = function(throttle){
  return throttle * 0.1
}

var scaleWithYaw = function(motorPoint, yawFactor, throttle){
  var adjustment = throttle * yawFactor;
  if (motorPoint.rotation == 'cw'){
    return throttle - adjustment;
  } else if (motorPoint.rotation == 'ccw') {
    return throttle + adjustment;
  } else {
    return throttle;
  }
}

module.exports = {
  getMotorThrottle: function(controlInputs, motorPoint){
    var motorX = motorPoint.x;
    var motorY = motorPoint.y;
    // 
    // This would be a great place for a promise chain
    // 
    var inputPlane = getControlInputPlane(controlInputs.attitude);
    var zResult = getZFactor(inputPlane, motorX, motorY);
    var scaleMax = throttleAdjustmentMaximum(controlInputs.throttle);
    var newVal = scaledThrottle(controlInputs.throttle, zResult, scaleMax);
    var withYaw = scaleWithYaw(motorPoint, controlInputs.attitude.zR, newVal)

    if (typeof (withYaw) === 'number' && !isNaN(withYaw)){ // funny how NaN is a number
      return withYaw;
    } else {
      // if we messed up bad, return the original throttle setting.
      return controlInputs.throttle;
    }
  }
};
