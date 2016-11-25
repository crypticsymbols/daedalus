'use strict'
//
// Can all modes be broken down into smaller pieces?
//
// Really it's just a collection of rules about behavior in 3d space, which
// in this case is 6 physical axes (x,y,z,xR,yR,zR)
//
// Altitude hold just holds a 2D plane - if we focus on planes, we can hold walls
// or slopes, too. It's defined as a 1D hold.
//
// 2D holds could be useful for things like flying through a tunnel or stabilized
// takeoffs/landings.
//
// 3D holds at a point in space become trivial (lol) and very complex patterns
// can be described and controlled by the vehicle exposing only a 6 axis control.
//

module.exports = function(modeList, vehicleConfig, controlFunction, vehicleState) {
  // Things we need to control the vehicle
  var vControl = controlFunction
  var vConfig = vehicleConfig
  var vState = vehicleState
  modeList = modeList || ['manual']
  var currentMode

  var availableModes = {}
  modeList.map(function(modeName) {
    let ModeClass = require('./' + modeName)
    availableModes[modeName] = new ModeClass(vConfig, vState)
  })
  currentMode = modeList[0]

  // called on mode switch or internal heartbeat
  var kickCurrent = () => {
    var controlState = vState.getControlState()
    this.handleInputs(controlState)
  }

  // Ticker helper for modes that need to loop (stabilization, etc)
  var timer
  var tick = () => {
    kickCurrent()
  }
  var ensureTicker = (mS) => {
    if (!timer) {
      timer = setInterval(tick, mS)
    }
  }
  var stopTicker = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  // passes new control inputs to current mode, called by vehicle
  this.handleInputs = (inputs) => {
    // var options = currentMode.options
    let mode = this.getMode()
    mode.tick(inputs, vState, vControl)
  }

  // mode getter
  this.getMode = () => {
    return availableModes[currentMode]
  }

  var updateHeartbeats = () => {
    var mS = this.getMode().heartbeat
    if (mS && typeof mS === 'number') {
      ensureTicker(mS)
    } else {
      stopTicker()
    }
  }

  var setModeRunner = (mode) => {
    currentMode = mode.name
    this.getMode().setOptions(mode.options)
    kickCurrent()
    updateHeartbeats()
  }

  // mode setter
  this.setMode = (mode) => {
    let originalMode = currentMode
    if (!mode || !mode.name || !availableModes[mode.name]) {
      return false
    }
    try {
      setModeRunner(mode)
      return true
    } catch (e) {
      setModeRunner({name: originalMode})
      return false
    }
  }
}

