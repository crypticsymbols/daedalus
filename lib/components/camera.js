'use strict'

class Camera {
  // constructor() {}

  // commands

  // controls
}

module.exports = Camera

module.exports.install = function() {
  let commands = [
    // install uv4l
    'curl http://www.linux-projects.org/listing/uv4l_repo/lrkey.asc | sudo apt-key add -',
    'sudo echo "deb http://www.linux-projects.org/listing/uv4l_repo/raspbian/ jessie main" >> /etc/apt/sources.list',
    'sudo apt-get update && sudo apt-get install uv4l',
    // RT Kernel in Navio distribution needs some hacks for uv4l <-> GPU
    'wget files.emlid.com/uv4l-raspicam_1.9.40_armhf_hack.deb',
    'sudo dpkg -i uv4l-raspicam_1.9.40_armhf_hack.deb && sudo apt-get install -f',
    // install uv4l server which will stream over network, no Node involved
    'sudo apt-get install uv4l-server'
  ]
  commands.map(function(cmd) {
    // shell call goes here...
    return cmd
  })
}

module.exports.run = function() {
  let command = [
    'uv4l',
    '--driver raspicam',
    '--auto-video_nr',
    '--rotation 180',
    '--encoding mjpeg',
    '--width 640',
    '--height 480',
    '--enable-server on'
  ].join(' ')
  // placeholder
  child_process.spawn(command)
}



