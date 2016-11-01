var navio = require('node-navio')

IMU = function(){

  this.controller = navio.imuReader();

  this.getIMU = function(){
    return this.controller.getIMU();
  }.bind(this)
  
  return this;
}

module.exports = IMU;
