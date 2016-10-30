var navio = require('node-navio')

IMU = function(){

  this.controller = navio.imuReader();

  this.getIMU = function(){
    return this.controller.getIMU();
  }
  return this;
}

module.exports = IMU;
