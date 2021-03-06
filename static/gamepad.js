/*
 * Gamepad API Test
 * Written in 2013 by Ted Mielczarek <ted@mielczarek.org>
 *
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 *
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */

var gamepad = function(callback){

  var callback = callback;

  var controllers = {};
  var rAF = window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.requestAnimationFrame;

  function connecthandler(e) {
    addgamepad(e.gamepad);
  }
  function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad;
    rAF(updateStatus);
  }

  function disconnecthandler(e) {
    removegamepad(e.gamepad);
  }

  function removegamepad(gamepad) {
    delete controllers[gamepad.index];
  }

  function updateStatus() {
    scangamepads();
    for (j in controllers) {
      callback(controllers[j])
    }
    rAF(updateStatus);
  }

  function scangamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < gamepads.length; i++) {
      if (gamepads[i]) {
        if (!(gamepads[i].index in controllers)) {
          addgamepad(gamepads[i]);
        } else {
          controllers[gamepads[i].index] = gamepads[i];
        }
      }
    }
  }

  setInterval(scangamepads, 500);
}

