'use strict'
var expect = require('chai').expect
var Controls = require('../lib/util/controls')
var sinon = require('sinon')

describe('controls', function() {

  describe('input / output filters', function() {
    it('takes inputs with no filter')
    it('outputs with no filter')
    it('inputs with a filter(s)')
    it('outputs with a filter(s)')
  })

  it('has immutable control state data', function() {
    let controls = new Controls()
    let set = {derp: 'okay', foo: {bar: 'baz'}}

    controls.setState(set)
    let out = controls.getState()

    expect(set).to.eql(out)
    expect(set).not.to.equal(out)
    // Change output and confirm it no longer equals the set value
    out.derp = 'invalid control value!'
    expect(out).not.to.eql(set)
    expect(controls.getState()).to.eql(set)
  })

  it('validates inputs and will not break', function() {

  })

  it('calls a callback provided to setState with updated values', function() {
    let callback = sinon.spy()
    let controls = new Controls()
    let args = {foo: 'bar'}
    controls.setState(args, callback)
    expect(callback.calledWith(args)).to.equal(true)
    expect(callback.callCount).to.be.equal(1)
  })

})

