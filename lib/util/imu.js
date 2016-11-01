var navio = require('node-navio')

IMU = function(){

  var reader = navio.imuReader();

  var lastValues = {}
  var movingAverages = {}

  var add = function(axis, value){
    lastValues[axis] = lastValues[axis] || [];
    var a = lastValues[axis];
    var l = a.length
    if (l >= 10){
      a.shift();
    }
    a.push(value);
    var ret = 0;
    for (var i = 0; i < l; i++) {
      ret += a[i];
    }
    movingAverages[axis] = ret/l;
  }
  
  var fetch = function(){
    var imuValues = reader.getIMU();
    for (axis in imuValues){
      add(axis, imuValues[axis]);
    }
  }
  
  setInterval(fetch, 10)

  this.getIMU = function(){
    return movingAverages;
  }
  
  return this;
}

module.exports = IMU;
