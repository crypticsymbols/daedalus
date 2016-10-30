# daedalus
Node.js fly-by-wire for Navio+

# ABSOLUTELY DO NOT USE THIS AT ALL YET
# YOU WILL PROBABLY DIE
## (but I intend to open source this)
"You know what's easier than figuring out APM/ArduPilot? This." - Nobody

### To-Do:
* Unit / Integration testing, now that I have a general idea of what this project even looks like
* limit control inputs to percentages, so miscalibrated input devices won't kill you
* Wrap more Navio drivers (PWM implemented, but no sensors)
* Frontend (Angular? React?)
* Figure out what kind of error/exception/"oh shit" handling or fail safes should exist
* Get camera running and streaming over network (uv4l seems fastest and easiest)
* input filters - exponent/elliptical response maps for inputs
* Recruit interested people who want to help! Hex/Octo/Y copter? Heli? Fixed Wing? I'm trying to keep the broad view but I only have a quad to work with.
* Implement layers towards automated operation: self-knowledge (sensor access), platform-level knowledge of how to perform certain tasks (pitch, roll, yaw, climb, land, go to point...), mode-level (stabilized, manual, auto, waypoint) logic for instructing platform to perform those tasks
* Better connectivity (4G modem, antenna tracker)

X/Y Notes
X - up/down, + is up
Y- left/right, + is right
Xmoment: + is pitch up, - is pitch down
YMoment - + is roll left (right up), - is roll left (left up)

Platform / mode action notes

Platform takes inputs
mode: inputs -> what action to take
platform: implement actions

loiter:
  rover: do nothing
  boat: do nothing
  copter: hover on point
  plane: circle around point

Go to point
  rover: turn and forward
  boat: turn and forward
  copter: copter climb and goto
  plane: plane climb and set course


SETUP
sudo dd bs=1m if=/Users/aaron/Downloads/emlid-raspbian-20160718.img of=/dev/rdisk2
wifi info into wpa_supplicant.conf, 
  also this into /etc/network/interfaces:
  iface wlan0 inet dhcp
    #wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
    wpa-ssid "whoop whoop"
    wpa-psk "veritas77"
net.ipv6.conf.all.disable_ipv6=1 > /etc/sysctl.d/local.conf
pubkey to auth_keys
# Install NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
source ~/.bashrc
nvm install 5.11

git clone https://github.com/crypticsymbols/daedalus.git
cd daedalus
npm install --production