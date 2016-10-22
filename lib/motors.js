var navioInterface = require('node-navio');

var controller = navioInterface.pwmController();

module.exports = {
  setThrottle: function(channel, uS){
    controller.setPWM(channel, uS);
  }
}
