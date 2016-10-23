var controller = require('node-navio').pwmController();

module.exports = {
  setChanneluS: function(channel, uS){
    controller.setPWM(channel, uS);
  }
}
