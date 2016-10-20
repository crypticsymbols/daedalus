var navioInterface = require('./node-navio');

var controller = navioInterface.pwmController();

module.exports = {
  setThrottle: function(a, b, c, d){
    // console.log(a, b, c, d);
    controller.setPWM(a, b, c, d);
  }
}
