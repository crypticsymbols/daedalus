var navio = require('node-navio')

PWM = function() {
  this.controller = navio.pwmController()

  this.setChanneluS = function(channel, uS) {
    this.controller.setPWM(channel, uS)
  }
}

module.exports = PWM
