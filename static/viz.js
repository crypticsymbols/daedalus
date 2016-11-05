var inputViz = function(element, config, mode){

  var mode = mode || 'input';
  var sceneX = Math.PI/2;
  var sceneY = 0;
  var sceneZ = -Math.PI/2;
  var camera, scene, renderer, grid, plane;
  var throttleCylinder, throttleCylinderMaterial;
  var inputPlane, earthPlane, accelPlane, gyroPlane;
  var motorMap = config.motorMap;

  var vehicle = {
    throttle: {},
    motors: {},
  }
  var setTheScene = function(){
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
    document.getElementById(element).appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    //
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    scene.rotation.x = sceneX+0.5;
    scene.rotation.y = sceneY;
    scene.rotation.z = sceneZ-0.6;
    scene.add( new THREE.AxisHelper( 500 ) );
    //
    grid = new THREE.GridHelper( 100, 10 );
    grid.rotation.x = sceneX;
    scene.add( grid )
    //
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 350;
    //
    plane = new THREE.BoxGeometry( 200, 200, 2 );
  }
  var configElements = function(){
    // Common throttle element
    throttleCylinderMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true} );
    throttleCylinder = new THREE.CylinderGeometry(20, 20, 80);
    throttleCylinder.applyMatrix(new THREE.Matrix4().makeTranslation(0, -40, 0));
    //
    // Plane elements
    //
    inputPlane = new THREE.Mesh( plane, new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide, transparent: true, opacity: 0.5 } ) );
    inputPlane.position.z = -100
    scene.add( inputPlane )
    //
    accelPlane = new THREE.Mesh( plane, new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide, transparent: true, opacity: 0.5 } ) );
    accelPlane.position.z = -150;
    scene.add( accelPlane )
    //
    gyroPlane = new THREE.Mesh( plane, new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide, transparent: true, opacity: 0.5 } ) );
    gyroPlane.position.z = -180;
    scene.add( gyroPlane )
    //
    // Throttle elements
    //
    vehicle.throttle  = new THREE.Mesh( throttleCylinder, throttleCylinderMaterial );
    scene.add( vehicle.throttle )
    vehicle.throttle.rotation.x = sceneX;
    //
    // per-vehicle motor config
    //
    for (var pwmChannel in motorMap){
      vehicle.motors[pwmChannel] = new THREE.Mesh( throttleCylinder, throttleCylinderMaterial );
      vehicle.motors[pwmChannel].rotation.x = sceneX;
      var xPos = motorMap[pwmChannel].x*80;
      var yPos = motorMap[pwmChannel].y*80;
      vehicle.motors[pwmChannel].position.x = xPos;
      vehicle.motors[pwmChannel].position.y = yPos;
      var sprite = makeTextSprite('PWM '+pwmChannel)
      sprite.position.x = xPos;
      sprite.position.y = yPos;
      scene.add( vehicle.motors[pwmChannel] );
      scene.add( sprite );
    }
  }

  function pwmToPercent(pwm){
    return (pwm-1100)/(1900-1100)
  }

  var update = function(values){
    try{
      if (values && values.throttle){
        if (mode == 'feedback'){
          vehicle.throttle.scale.y = pwmToPercent(values.throttle);
        } else {
          vehicle.throttle.scale.y = (values.throttle/100);
        }
      }
      if (values && values.attitude){
        var xR = values.attitude.xR;
        var yR = values.attitude.yR;
        var zR = values.attitude.zR;
        inputPlane.rotation.x = xR
        inputPlane.rotation.y = yR
        inputPlane.rotation.z = zR
      }
      if (values && values.motor){
        var i = values.motor.channel;
        var t = pwmToPercent(values.motor.throttle)
        vehicle.motors[i].scale.y = t;
      }
      renderer.render( scene, camera );
    } catch (e){
      console.log(e);
    }
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function makeTextSprite(message, opts) {
    var parameters = opts || {};
    var fontface = parameters.fontface || 'Helvetica';
    var fontsize = parameters.fontsize || 70;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = fontsize + "px " + fontface;
    var metrics = context.measureText(message);
    var textWidth = metrics.width;
    context.fillStyle = 'rgba(0, 0, 0, 1.0)';
    context.fillText(message, 0, fontsize);
    var texture = new THREE.Texture(canvas)
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    var spriteMaterial = new THREE.SpriteMaterial({
        map: texture
    });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(100, 50, 1.0);
    return sprite;
  }

  setTheScene();
  configElements();
  renderer.render( scene, camera );

  return {
    update: update
  }
};

