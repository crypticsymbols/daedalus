var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var HTTP_PORT = 8080;

// try{
  var motorControl = require('./lib/motors');
// } catch (e) {
//   console.log("can't load motor drivers")
// }

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

var maxThrottle = 1900.0;
var midThrottle = 1500.0;
var minThrottle = 1100.0;

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

  socket.on('calibrationCommand', function (data) {
    var value;
    if (data.mode == 'high'){
      value = maxThrottle / 1000;
      console.log('Sending motor control value of '+ value)
      motorControl.setThrottle(value, value, value, value);
    } else if (data.mode == 'mid'){
      value = midThrottle / 1000;
      console.log('Sending motor control value of '+ value)
      motorControl.setThrottle(value, value, value, value);
    } else if (data.mode == 'low'){
      value = minThrottle / 1000;
      console.log('Sending motor control value of '+ value)
      motorControl.setThrottle(value, value, value, value);
    }
  });

  // Start video
  // uv4l --driver raspicam --auto-video_nr --encoding h264 --width 640 --height 480 --enable-server on

});

server.listen(HTTP_PORT);
