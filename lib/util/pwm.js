if (process.platform == 'linux'){
  var navio = require('node-navio')
} else {
  var navio = {
    pwmController: function(){
      return { setPWM: function(){} }
    }
  }
}

PWM = function(){

  this.controller = navio.pwmController();

  this.setChanneluS = function(channel, uS){
    this.controller.setPWM(channel, uS);
  }

}


module.exports = PWM;