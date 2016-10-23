var controller = require('node-navio').navioInterface.pwmController();

module.exports = {
  setThrottle: function(channel, uS){
    controller.setPWM(channel, uS);
  }
}
