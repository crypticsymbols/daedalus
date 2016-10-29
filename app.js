// App specific config
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var HTTP_PORT = 1337;

// vehicle setup
opts = {
  motorMap:{
    // pwmChannel: {x, y}
    3: {y: 1, x: 1},
    4: {y: -1, x: -1},
    5: {y: 1, x: -1},
    6: {y: -1, x: 1}
  },
  minThrottle: 1100.0,
  midThrottle: 1500.0,
  maxThrottle: 1900.0,
  // maxAbsoluteDeflection: 0.1
}

var copter = require('./lib/platforms/copter');
var vehicle = new copter(opts);

vehicle.on('controlInputUpdated', function(msg){
  console.log('updated control inputs: \n', msg)
})

vehicle.on('error', function(msg){
  console.log('VEHICLE ERROR: \n', msg)
})

io.on('connection', function (socket) {
  console.log('socket connected');

  socket.on('flightCommand', function (data) {
    vehicle.updateControlInput(data.values);
  });

  socket.on('calibrationCommand', function (data) {
    vehicle.calibrationRoutine(data.mode);
  });

});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

app.get('/gamepad.js', function (req, res) {
  res.sendFile(__dirname + '/static/gamepad.js');
});

server.listen(HTTP_PORT);
