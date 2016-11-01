var camera, scene, renderer;
  var mesh;
  var cylMesh;
  var motors = {};
  var throttle;
  var plane;
  var levelPlane;
  init();
  animate();
  function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    //
    window.addEventListener( 'resize', onWindowResize, false );

    var size = 100;
    var step = 10;

    mesh = new THREE.GridHelper( size, step );
    scene.add( mesh );

    var cylMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true} );
    var cylinder = new THREE.CylinderGeometry(20, 20, 80);
    cylinder.applyMatrix(new THREE.Matrix4().makeTranslation(0, 40, 0));
    m1 = new THREE.Mesh( cylinder, cylMaterial );
    m2 = new THREE.Mesh( cylinder, cylMaterial );
    m3 = new THREE.Mesh( cylinder, cylMaterial );
    m4 = new THREE.Mesh( cylinder, cylMaterial );
    throttle = new THREE.Mesh( cylinder, cylMaterial );

    // Plane
    var geometry = new THREE.PlaneGeometry( 200, 200 );
    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide, transparent: true, opacity: 0.5 } );
    var material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide, transparent: true, opacity: 0.5 } );
    plane = new THREE.Mesh( geometry, material );
    levelPlane = new THREE.Mesh( geometry, material2 );
    plane.rotation.x = Math.PI/2
    levelPlane.rotation.x = Math.PI/2
    plane.position.y = 100
    levelPlane.position.y = 150

    scene.add( m1 );
    scene.add( m2 );
    scene.add( m3 );
    scene.add( m4 );
    scene.add( throttle );
    scene.add( plane );
    scene.add( levelPlane );

    m1.position.z = 80
    m1.position.y = 0
    m1.position.x = 80

    m2.position.z = -80
    m2.position.y = -0
    m2.position.x = -80

    m3.position.z = 80
    m3.position.y = -0
    m3.position.x = -80

    m4.position.z = -80
    m4.position.y = -0
    m4.position.x = 80

    motors[3] = m1;
    motors[4] = m2;
    motors[5] = m3;
    motors[6] = m4;

    scene.rotation.x =0.5;
    scene.rotation.y =0.5;
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  function pwmToPercent(pwm){
    return (pwm-1100)/(1900-1100)
  }
  // function slopToRad(slope){
  //   return Math.atan(slope)
  // }
  function animate(values) {
    try{
      if (values && values.motor){
        var i = values.motor.channel;
        motors[i].scale.y = pwmToPercent(values.motor.throttle)
      }
      if (values && values.throttle){
        throttle.scale.y = pwmToPercent(values.throttle)
      }
      if (values && values.attitude){
        var x = values.attitude.y;
        var y = values.attitude.x;
        plane.rotation.x = Math.atan(1/x)
        plane.rotation.y = (Math.PI / 2)+Math.atan(1/y)
      }
      if (values && values.lX){
        var x = values.lX;
        var y = values.lY;
        levelPlane.rotation.x = Math.atan(1/x)
        levelPlane.rotation.y = (Math.PI / 2)+Math.atan(1/y) 
      }
    } catch (e){
      console.log(e);
    }
    renderer.render( scene, camera );

  }