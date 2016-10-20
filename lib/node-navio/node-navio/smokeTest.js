var addon = require('bindings')('pwm');

var obj = new addon.PWM();
console.log( obj.setPWM(1.1, 1.1, 1.1, 1.1) );
console.log( obj.setPWM(1.2, 1.2, 1.2, 1.2) );
console.log( obj.setPWM(0.9, 0.9, 0.9, 0.9) );