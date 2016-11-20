'use strict'
var expect = require('chai').expect
var Controls = require('../lib/util/controls')
var sinon = require('sinon')

describe('controls', function() {

  describe('control defaults and shape', function() {
    it('provides default control values')
    it('validates inputs with control map')
  })

  describe('input / output filters', function() {
    it('inputs/outputs with no filter', function() {
      let controls = new Controls()
      let vals = {foo: 'bar', baz: {derp: 'doo'}}
      controls.setState(vals)
      expect(controls.getState()).to.eql(vals)
    })

    var tFunc1 = (v) => {
      return v * 10
    }
    var tFunc2 = (v) => {
      return v + 1
    }
    var axisFunc = (v) => {
      return v * 3
    }

    it('inputs with a filter(s)', function() {
      let opts = {
        inputFilters: {
          throttle: [tFunc1, tFunc2],
          'attitude.xR': axisFunc
        }
      }
      let controls = new Controls(opts)
      controls.setState({throttle: 7, attitude: {xR: 0.02}})
      let out = controls.getState()
      expect(out.throttle).to.equal(71)
      expect(out.attitude.xR).to.equal(0.06)
    })

    it('outputs with a filter(s)', function() {
      let opts = {
        outputFilters: {
          throttle: [tFunc1, tFunc2],
          'attitude.xR': axisFunc
        }
      }
      let controls = new Controls(opts)
      controls.setState({throttle: 7, attitude: {xR: 0.02}})
      let out = controls.getState()
      expect(out.throttle).to.equal(71)
      expect(out.attitude.xR).to.equal(0.06)
    })

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

  it('calls a callback provided to setState with updated values', function() {
    let callback = sinon.spy()
    let controls = new Controls()
    let args = {foo: 'bar'}
    controls.setState(args, callback)
    expect(callback.calledWith(args)).to.equal(true)
    expect(callback.callCount).to.be.equal(1)
  })

})

