var navioInterface = require('node-navio');

var controller = navioInterface.pwmController();

module.exports = {
  setThrottle: function(channel, uS){
    console.log(channel, uS)
    controller.setPWM(channel, uS);
  }
}
