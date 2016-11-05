var camera, scene, renderer;
  var grid;

  var inputScene;
  var inputRenderer;
  var inputCamera;
  var inputGrid;

  var inputs = {
    attitude: {},
  }
  var feedback = {
    throttle: {},
    motors: {},
    attitudePlane: {},
    accelPlane: {},
    gyroPlane: {},
    levelPlane: {}
  }

  init();
  // animate();
  function init() {
    //
    // input viz setup
    //
    inputCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    inputCamera.position.z = 350;
    inputScene = new THREE.Scene();
    inputScene.background = new THREE.Color( 0xffffff );
    inputRenderer = new THREE.WebGLRenderer({alpha: true});
    inputRenderer.setPixelRatio( window.devicePixelRatio );
    inputRenderer.setSize( window.innerWidth/2, window.innerHeight/2 );
    document.getElementById('input_viz').appendChild( inputRenderer.domElement );


    //
    // feedback setup
    //
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 350;
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
    document.getElementById('feedback_viz').appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    //
    // axis helpers
    //
    scene.add( new THREE.AxisHelper( 500 ) );
    inputScene.add( new THREE.AxisHelper( 500 ) );
    //
    // base grid
    //
    var gridSize = 100;
    var gridStep = 10;
    grid = new THREE.GridHelper( gridSize, gridStep );
    scene.add( grid );
    //
    // input grid
    //
    inputGrid = new THREE.GridHelper( gridSize, gridStep );
    inputScene.add( inputGrid );
    //
    // throttle cylinders
    //
    var cylMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true} );
    var cylinder = new THREE.CylinderGeometry(20, 20, 80);
    cylinder.applyMatrix(new THREE.Matrix4().makeTranslation(0, 40, 0));
    //
    // input throttle
    //
    var inputCylinder = new THREE.CylinderGeometry(20, 20, 80);
    inputCylinder.applyMatrix(new THREE.Matrix4().makeTranslation(0, 40, 0));
    //
    // set up motors
    //
    feedback.motors[3] = new THREE.Mesh( cylinder, cylMaterial );
    feedback.motors[4] = new THREE.Mesh( cylinder, cylMaterial );
    feedback.motors[5] = new THREE.Mesh( cylinder, cylMaterial );
    feedback.motors[6] = new THREE.Mesh( cylinder, cylMaterial );
    feedback.throttle  = new THREE.Mesh( cylinder, cylMaterial );
    scene.add( feedback.motors[3] )
    scene.add( feedback.motors[4] )
    scene.add( feedback.motors[5] )
    scene.add( feedback.motors[6] )
    scene.add( feedback.throttle )
    //
    // common Plane
    //
    var plane = new THREE.BoxGeometry( 200, 200, 2 );
    //
    // attitude plane
    //
    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide, transparent: true, opacity: 0.5 } );
    feedback.attitudePlane = new THREE.Mesh( plane, material );
    feedback.attitudePlane.position.y = 100
    scene.add( feedback.attitudePlane )
    //
    // INPUT attitude plane
    //
    inputs.attitudePlane = new THREE.Mesh( plane, material );
    inputs.attitudePlane.position.z = -100
    // inputs.attitudePlane.rotation.y = -100
    inputScene.add( inputs.attitudePlane )
    //
    // Accelerometer plane
    //
    var material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide, transparent: true, opacity: 0.5 } );
    feedback.accelPlane = new THREE.Mesh( plane, material2 );
    feedback.accelPlane.position.y = 130
    scene.add( feedback.accelPlane )
    //
    // gyro plane
    //
    var material3 = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide, transparent: true, opacity: 0.5 } );
    feedback.gyroPlane = new THREE.Mesh( plane, material3 );
    feedback.gyroPlane.position.y = 160
    scene.add( feedback.gyroPlane )
    // plane.rotation.x = Math.PI/2
    // levelPlane.rotation.x = Math.PI/2
    // gyroPlane.rotation.x = Math.PI/2
    // levelPlane.rotation.z = 150
    // gyroPlane.rotation.z = 180

    // plane.updateMatrix();
    // plane.plane.applyMatrix( levelPlane.matrix );

    feedback.motors[3].position.z = 80
    feedback.motors[3].position.y = 0
    feedback.motors[3].position.x = 80

    feedback.motors[4].position.z = -80
    feedback.motors[4].position.y = -0
    feedback.motors[4].position.x = -80

    feedback.motors[5].position.z = 80
    feedback.motors[5].position.y = -0
    feedback.motors[5].position.x = -80

    feedback.motors[6].position.z = -80
    feedback.motors[6].position.y = -0
    feedback.motors[6].position.x = 80

    scene.rotation.x =0.5;
    scene.rotation.y =0.5;

    inputs.throttle  = new THREE.Mesh( inputCylinder, cylMaterial );
    inputs.throttle.rotation.x = Math.PI/2;
    inputScene.add( inputs.throttle )

    var sceneX = Math.PI/2+0.5;
    var sceneY = 0;
    var sceneZ = -Math.PI/2-0.5;

    inputScene.rotation.x = sceneX;
    inputScene.rotation.y = sceneY;
    inputScene.rotation.z = sceneZ;
    inputGrid.rotation.x = Math.PI/2;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function pwmToPercent(pwm){
    return (pwm-1100)/(1900-1100)
  }

  function myKeyPress(e){
    var keynum;

    if(window.event) { // IE
      keynum = e.keyCode;
    }
    // console.log(keynum)
    // q = 81
    // a = 65
    //
    // w = 87
    // s = 83
    //
    // e = 69
    // d = 68
    switch (keynum){
      case 81:
        inputs.attitudePlane.rotation.x += 0.09;
      case 65:
        inputs.attitudePlane.rotation.x -= 0.09;
      case 87:
        inputs.attitudePlane.rotation.y += 0.09;
      case 83:
        inputs.attitudePlane.rotation.y -= 0.09;
      case 69:
        inputs.attitudePlane.rotation.z += 0.09;
      case 68:
        inputs.attitudePlane.rotation.z -= 0.09;
    }
    // console.log(inputGrid.rotation.x, inputScene.rotation.y, inputScene.rotation.z)
  }
  document.addEventListener("keydown", myKeyPress, false);

  function animate(values) {
    // inputScene.rotation.z += 0.001;
    // inputScene.rotation.y += 0.001;
    // inputScene.rotation.x += 0.001;
    try{
      if (values && values.motor){
        var i = values.motor.channel;
        feedback.motors[i].scale.y = pwmToPercent(values.motor.throttle)
      }
      if (values && values.throttle){
        feedback.throttle.scale.y = pwmToPercent(values.throttle)
      }
      if (values && values.attitude){
        var x = values.attitude.x;
        var y = values.attitude.y;
        feedback.attitudePlane.rotation.x = -y
        feedback.attitudePlane.rotation.z = x
      }
      if (values && typeof(values.ax) == 'number'){
        var x = values.ax;
        var y = values.ay;
        feedback.accelPlane.rotation.x = -y
        feedback.accelPlane.rotation.z = x
        var x = values.gx;
        var y = values.gy;
        feedback.gyroPlane.rotation.z = -y
        feedback.gyroPlane.rotation.x = -x
      }
    } catch (e){
      console.log(e);
    }
    renderer.render( scene, camera );
  }
  function animateInput(values){
    try{
      if (values && values.throttle){
        inputs.throttle.scale.y = values.throttle;
      }
      if (values && values.attitude){
        var xR = values.attitude.xR;
        var yR = values.attitude.yR;
        var zR = values.attitude.zR;
        inputs.attitudePlane.rotation.x = xR
        inputs.attitudePlane.rotation.y = yR
        inputs.attitudePlane.rotation.z = zR
      }
    } catch (e){
      console.log(e);
    }
    inputRenderer.render( inputScene, inputCamera );
  }

