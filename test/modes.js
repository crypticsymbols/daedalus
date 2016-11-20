'use strict'
var expect = require('chai').expect
var ModeHandler = require('../lib/modes/modes')

describe('modes', function() {

  var mh = new ModeHandler(
    ['calibrate', 'manual'],
    {throttle: {min: 1000, mid: 1500, max: 2000}},
    function() {},
    {getControlState: function() {}}
  )

  it('fails safe when set to nonexistent mode name', function() {
    let originalMode = mh.getMode()
    // 1) it lets us know it failed
    expect(mh.setMode({name: 'Fake mode'})).to.eql(false)
    // 2) It did not change anything
    expect(mh.getMode()).to.eql(originalMode)
  })

  it('returns true on successful mode switch', function() {
    expect(mh.getMode().constructor.name).to.eql('Calibrate')
    expect(mh.setMode({name: 'manual', opts: {}})).to.eql(true)
    expect(mh.getMode().constructor.name).to.eql('Manual')
  })

  it('reverts on mode switch if any errors')
  it('loads available modes at runtime')
  it('has a default mode')
  it('has a heartbeat function')
  it('remembers the last config when switching back to a previous mode')
  it('initializes with default config from default mode')

})
