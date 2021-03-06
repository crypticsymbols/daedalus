'use strict';
var expect    = require("chai").expect;
var plm = require("../lib/util/poweredLiftMapping");
var testUtil = require('./testUtil');

describe("getMotorThrottle", function() {

  describe('should handle errors elegantly & provide fallbacks...', function(){

    // this should be part of moving this calc to async
    it("just isn't going to work")//, function(){
    //   var controlInputs = { throttle: 1000 }
    //   var motorPoint = {};
    //   var t = plm.getMotorThrottle(controlInputs, motorPoint);
    //   expect(t).to.be.closeTo(controlInputs.throttle, (controlInputs.throttle*0.25));
    // });

  });

  it('needs more tests specifically on control mixing')

  it('scales throttle for yaw', function(){

    var inputs = {
      attitude: {xR: 0, yR: 0, zR: -0.1},
      throttle: 1500
    }
    var mp1 = {x: 1, y: 1, rotation: 'cw'};
    var mp2 = {x: 1, y: 1, rotation: 'ccw'};

    var mp1t = plm.getMotorThrottle(inputs, mp1);
    var mp2t = plm.getMotorThrottle(inputs, mp2);

    expect(mp1t).to.not.equal(mp2t)
    expect(Math.abs(mp1t)).to.not.equal(Math.abs(mp2t))
  })

  it("can take all sorts of random maybe garbage input", function(){
    var random = testUtil.random;
    for (var i = 0; i < 10000; i++) {
      var controlInputs = {
        attitude: {xR: random(-1.1, 1.1), yR: random(-1.1, 1.1), zR: 0},
        throttle: random(1000, 2000, true)
      }
      var motorPoint = {x: random(-1.1, 1.1), y: random(-1.1, 1.1)};
      var t = plm.getMotorThrottle(controlInputs, motorPoint);
      // Expect max variance of 25%. the above randomness could represent extreme maneuvering
      expect(t).to.be.closeTo(controlInputs.throttle, (controlInputs.throttle*0.25));
    }
  });
  
  it("returns the correct scaled throttle value", function() {
    var controlInputs = {
      attitude: {xR: 0.04, yR: -0.1, zR: 0},
      throttle: 1749
    }
    var motorPoint = {x: 0.9, y: -0.9}; // normal-ish
    expect(plm.getMotorThrottle(controlInputs, motorPoint)).to.eql(1739.5554);

    var motorPoint = {x: 0.1, y: -0.1}; // real close
    expect(plm.getMotorThrottle(controlInputs, motorPoint)).to.eql(1747.9506);

    var motorPoint = {x: 1.9, y: -1.9}; // far out
    expect(plm.getMotorThrottle(controlInputs, motorPoint)).to.eql(1729.0614);
  });

  it("handles negatives and zeros elegantly when control plane is flat", function() {
    var controlInputs = {
      attitude: {xR: 0.0, yR: 0.0, zR: 0},
      throttle: 1749
    }
    var motorPoints = [
      {x: 1, y: -1},
      {x: 0.1, y: -0.1},
      {x: 1.9, y: -1.9},
      {x: 0, y: 0}
    ]
    for (let mp of motorPoints) {
     expect(plm.getMotorThrottle(controlInputs, mp)).to.eql(1749);
    }
  });

  it("can take integers or floats, and always returns a float", function() {
    var controlInputs = {
      attitude: {xR: 0.0, yR: -1, zR: 0},
      throttle: 1749.0
    }
    var motorPoint = {x: -1, y: 1.1}; // normal-ish
    expect(plm.getMotorThrottle(controlInputs, motorPoint)).to.eql(1923.9);
    var motorPoint = {x: 0, y: -0.1}; // real close
    expect(plm.getMotorThrottle(controlInputs, motorPoint)).to.eql(1749);
    var motorPoint = {x: -0, y: -1}; // far out
    expect(plm.getMotorThrottle(controlInputs, motorPoint)).to.eql(1749);
  });
  
});