// App specific config
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var HTTP_PORT = 8080;

// Calibration config, will get moved into userland
var maxThrottle = 1900.0;
var midThrottle = 1500.0;
var minThrottle = 1100.0;

// vehicle setup
opts = {
  motors:{
    3: {x: 1, y: 1},
    4: {x: 1, y: -1},
    5: {x: -1, y: -1},
    6: {x: -1, y: 1}
  },
  minThrottle: minThrottle,
  midThrottle: midThrottle,
  maxThrottle: maxThrottle
}

var vehicle = require('./lib/platforms/quadcopter').init(opts);




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
    motorControl.setThrottle(3, throttles.left);
    motorControl.setThrottle(4, throttles.right);
    motorControl.setThrottle(5, throttles.forward);
    motorControl.setThrottle(6, throttles.rear);
  } catch (e){
    console.log(throttles);
  }
}

io.on('connection', function (socket) {
  console.log('socket connected');

  socket.on('flightCommand', function (data) {
    vehicle.controlInput(data.values);
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

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

server.listen(HTTP_PORT);
