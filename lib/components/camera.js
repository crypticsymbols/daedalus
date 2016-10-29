// 
// uv4l handling for raspberry pi camera
// 

// curl http://www.linux-projects.org/listing/uv4l_repo/lrkey.asc | sudo apt-key add -
// sudo echo "deb http://www.linux-projects.org/listing/uv4l_repo/raspbian/ jessie main" >> /etc/apt/sources.list
// sudo apt-get update && sudo apt-get install uv4l 
// wget files.emlid.com/uv4l-raspicam_1.9.40_armhf_hack.deb
// sudo dpkg -i uv4l-raspicam_1.9.40_armhf_hack.deb && sudo apt-get install -f
//  sudo apt-get install uv4l-server
//  for auto start camera install uv4l-raspicam-extras
//  
//  
//  
// uv4l --driver raspicam --auto-video_nr --rotation 180 --encoding mjpeg --width 640 --height 480 --enable-server on