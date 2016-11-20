'use strict'
// App specific config
var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const HTTP_PORT = 1337

var vehicle = require('./vehicleConfig')

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
