
var expect    = require("chai").expect;
var sinon    = require("sinon");

var copter = require('../lib/platforms/copter')
describe("control inputs", function() {

  it('sets correct PWM values', function(){

    var opts = {
      motorMap:{
        // pwmChannel: {x, y}
        3: {y: 1, x: 1},
        4: {y: -1, x: -1},
        5: {y: 1, x: -1},
        6: {y: -1, x: 1}
      },
      minThrottle: 1100.0,
      midThrottle: 1500.0,
      maxThrottle: 1900.0
    }

    var vehicle = new copter(opts);

    var spy = sinon.spy();
    vehicle.pwmControl = {
      setChanneluS: spy
    }

    vehicle.updateControlInput({
      attitude: {x: 0, y: 0, z: 0},
      throttle: 1777
    });

    expect(spy.callCount).to.be.equal(4);
    
  });

});