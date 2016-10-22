// App specific config
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var HTTP_PORT = 8080;

// vehicle setup
opts = {
  motorMap:{
    // pwmChannel: {x, y}
    3: {y: 1, x: -1},
    4: {y: 1, x: 1},
    5: {y: -1, x: 1},
    6: {y: -1, x: -1}
  },
  minThrottle: 1100.0,
  midThrottle: 1500.0,
  maxThrottle: 1900.0
}

var vehicle = require('./lib/platforms/quadcopter').init(opts);

io.on('connection', function (socket) {
  console.log('socket connected');

  socket.on('flightCommand', function (data) {
    vehicle.controlInput(data.values);
  });

  socket.on('calibrationCommand', function (data) {
    vehicle.calibrationCommand(data.mode);
  });

  // Start video
  // uv4l --driver raspicam --auto-video_nr --encoding h264 --width 640 --height 480 --enable-server on

});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

server.listen(HTTP_PORT);
