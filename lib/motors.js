var navioInterface = require('node-navio');

var controller = navioInterface.pwmController();

module.exports = {
  setThrottle: function(channel, ms){
    controller.setPWM(channel, ms);
  }
}
