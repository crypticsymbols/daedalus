
var expect    = require("chai").expect;
var sinon    = require("sinon");

var copter = require('../lib/platforms/copter')

describe('vehicle state', function(){
  it('is immutable');
})

describe("control inputs", function() {

  it('sets CORRECT PWM values')

  it('sets PWM values', function(){

    var opts = {
      motorMap:{
        // pwmChannel: {x, y}
        3: {y: 1, x: 1},
        4: {y: -1, x: -1},
        5: {y: 1, x: -1},
        6: {y: -1, x: 1}
      },
      throttle:{
        min: 1100,
        mid: 1500,
        max: 1900
      },
      axisScale: {
        xR: 1,
        yR: 1,
        zR: 1
      }
    }

    var vehicle = new copter(opts);

    var spy = sinon.spy();
    vehicle.pwmControl = {
      setChanneluS: spy
    }

    vehicle.updateControlInput({
      attitude: {xR: 0, yR: 0, zR: 0},
      throttle: 1777
    });

    expect(spy.callCount).to.be.equal(4);

  });

});
