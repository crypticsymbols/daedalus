var socket = io.connect();

    var controlMap = {
      throttle: 1,
      yaw: 0,
      pitch: 3,
      roll: 2
    }

    var buttons = {
      b: 1,
      a: 0,
      x: 2,
      y: 3,
    }

    var controlState = {
      attitude: {
        x: 0,
        y: 0,
        zR: 0 // Yaw, idk
      },
      throttle: 0
    }

    gamepad(function(inputs){
      var newControlState = {
        attitude: {
          xR: inputs.axes[2],
          yR: inputs.axes[3],
          zR: inputs.axes[0],
        },
        throttle: -(inputs.axes[1]*100)
      }
      newControlState.buttons = inputs.buttons.map(function(v, i){
        return {pressed: v.pressed, value: v.value}
      });
      handleStateUpdate(newControlState);
    });

    var calibrationMode = false;
    function toggleCalibration(){
      calibrationMode = !calibrationMode;
      document.getElementById('calibrationMode').checked = calibrationMode;
    }
    document.getElementById('calibrationMode').checked = calibrationMode;

    var flightMode = function(){
      return !calibrationMode;
    }

    var handleStateUpdate = function(state){
      if (JSON.stringify(state) != JSON.stringify(controlState) && flightMode()){
        this.controlState = state;
        sendState();
      }
      visualize(state);
    }

    function sendCalibration(mode){
      socket.emit('calibrationCommand', {
        mode: mode
      })
    }

    function sendState(){
      socket.emit('flightCommand', {
        values: controlState
      });
    }

    var viz, feedbackViz;
    var visualize = function(data){
      try{
        viz.update(data);
      } catch(e){
        console.log(e);
      }
    }
    socket.on('metadata', function(config){
      viz = new inputViz('feedback_viz', config)
      feedbackViz = new inputViz('feedback_viz', config, 'feedback')
    });
    socket.on('log', function(data){
      feedbackViz.update(data)
    });
