'use strict'
// App specific config
var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const HTTP_PORT = 1337

// vehicle setup
var math = require('./lib/util/math')
var util = require('./lib/util/shared')
var opts = {
  motorMap: {
    // pwmChannel: {x, y, rotation}
    3: {y: 1, x: 1, rotation: 'cw'},
    4: {y: -1, x: -1, rotation: 'cw'},
    5: {y: -1, x: 1, rotation: 'ccw'},
    6: {y: 1, x: -1, rotation: 'ccw'}
  },
  throttle: {
    min: 1100,
    mid: 1500,
    max: 1900
  },
  axisScale: {
    xR: 1,
    yR: 1,
    zR: 1
  },
  inputFilters: {
    throttle: [
      (value) => {
        return math.ellipticalScale(value)
      },
      (value, opts) => {
        let min = opts.throttle.min
        let max = opts.throttle.max
        return util.scalePercentageToValue(value, min, max)
      }
    ]
  }
    // let eScaled = math.ellipticalScale(throttleValue)
    // var min = opts.throttle.min
    // var max = opts.throttle.max
    // return utils.scalePercentageToValue(eScaled, min, max)
}

var Copter = require('./lib/platforms/copter')
var vehicle = new Copter(opts)

vehicle.on('error', function(msg) {
  console.log('VEHICLE ERROR: \n', msg)
})

io.on('connection', function(socket) {
  console.log('socket connected')

  socket.emit('metadata', opts)

  process.on('log', function(data) {
    socket.emit('log', data)
  })

  socket.on('flightCommand', function(data) {
    vehicle.updateControlInput(data.values)
  })

  socket.on('configCommand', function(data) {
    vehicle.updateConfig(data)
  })
})

//
//
//
//
//
//
//
//
//
//

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/static/index.html')
})

app.get('/gamepad.js', function(req, res) {
  res.sendFile(__dirname + '/static/gamepad.js')
})

app.get('/viz.js', function(req, res) {
  res.sendFile(__dirname + '/static/viz.js')
})

app.get('/inputViz.js', function(req, res) {
  res.sendFile(__dirname + '/static/inputViz.js')
})

app.get('/front.js', function(req, res) {
  res.sendFile(__dirname + '/static/front.js')
})

server.listen(HTTP_PORT)
