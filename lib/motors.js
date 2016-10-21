var navioInterface = require('node-navio');

var controller = new navioInterface('pwm').PMW();

module.exports = {
  setThrottle: function(a, b, c, d){
    // console.log(a, b, c, d);
    controller.setPWM(a, b, c, d);
  }
}
