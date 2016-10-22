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
  console.log(points)
  // (1 / zResult) will invert the Z val b/c Z represents leverage, shorter arm = more power
  var point = math.pointZUnderPlane(points, motorX, motorY);
  return 1 / point.z
}

var scaledThrottle = function(throttle, factor, maxScale){
  var adjustment = factor * maxScale;
  return throttle + adjustment;
}

var throttleAdjustmentMaximum = function(throttle){
  return throttle * 0.1
}

module.exports = {
  getMotorThrottle: function(controlInputs, motorPoint){
    var motorX = motorPoint.x;
    var motorY = motorPoint.y;
    var inputPlane = getControlInputPlane(controlInputs.attitude);
    var zResult = getZFactor(inputPlane, motorX, motorY);
    var scaleMax = throttleAdjustmentMaximum(controlInputs.throttle);
    return scaledThrottle(controlInputs.throttle, zResult, scaleMax)
  }
};