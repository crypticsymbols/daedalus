'use strict'
var expect = require('chai').expect
var ModeHandler = require('../lib/modes/modes')

describe('modes', function() {

  it('fails safe when set to nonexistent mode name', function() {
    let mh = new ModeHandler(null, null, {
      getControlState: function() {}
    })
    let originalMode = mh.getMode()
    //
    // 1) it lets us know it failed
    expect(mh.setMode({name: 'Fake mode'})).to.eql(false)
    //
    // 2) It did not change anything
    expect(mh.getMode()).to.eql(originalMode)
  })

  it('returns true on successful mode switch', function() {
    let mh = new ModeHandler({
      throttle: {min: 1000, mid: 1500, max: 2000}
    }, function() {}, {
      getControlState: function() {}
    })
    expect(mh.getMode().constructor.name).to.eql('Calibrate')
    expect(mh.setMode({name: 'manual', opts: {}})).to.eql(true)
    expect(mh.getMode().constructor.name).to.eql('Manual')
  })

  it('reverts on mode switch in any errors')

})
