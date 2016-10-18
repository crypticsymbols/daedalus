var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var HTTP_PORT = 8080;

try{
  var motorControl = require('./lib/motors');
} catch (e) {
  console.log("can't load motor drivers")
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

var maxThrottle = 2000;
var minThrottle = 1300;

var mapControls = function(inputs){
  var throttle = ((maxThrottle - minThrottle) * (inputs.throttle / 100)) + minThrottle;
  console.log(inputs);
  var throttles = {
    left: (throttle * inputs.x) / 1000,
    right: (throttle * (1 / inputs.x)) / 1000,
    forward: (throttle * inputs.y) / 1000,
    rear: (throttle * (1 / inputs.y)) / 1000
  }

  try {
    motorControl.setThrottle(throttles.left, throttles.right, throttles.forward, throttles.rear);
  } catch (e){
    console.log(throttles);
  }
}

io.on('connection', function (socket) {
  console.log('socket connected');

  socket.on('flightCommand', function (data) {
    mapControls(data.values);
  });
  // 
  // Start apm
  // sudo ArduCopter-quad -A udp:<webapp IP>:<udpPort>
  // 
  // Start video
  // uv4l --driver raspicam --auto-video_nr --encoding h264 --width 640 --height 480 --enable-server on
});

server.listen(HTTP_PORT);
