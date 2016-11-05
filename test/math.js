'use strict';
var expect    = require("chai").expect;
var math = require("../lib/util/math");

describe("pointZUnderPlane", function() {

  it('returns a known correct value', function(){
    var planeDef = [
      {x:1, y:2, z:3},
      {x:1, y:0, z:1},
      {x:-2, y:1, z:0}
    ]
    expect(math.pointZUnderPlane(planeDef, 7, -2)).to.eql({x: 7, y: -2, z: 3})
  });

});
