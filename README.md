# daedalus.js

Node.js fly-by-wire for Raspberry Pi/Navio+. This is pre-alpha, do NOT use this to control anything that is not tethered to the ground.

The goal is to create an extensible autopilot system for any vehicle platform (quadcopters, aircraft, rovers, submarines...) that's easy to hack on.

If you're interested in contributing, please let me know and I'll help you get set up! I only have a quadcopter, so I'd love any input on implementing different platforms.

### To-Do:
* Flesh out stubbed tests, add more
* Remove output filters on controls
* De-tune attitude axes by 10x?
* AHRS - map axes to vehicle XYZ
* Rough altitude sensing
* Modes!
* - make stabilize hold level
* - Start "sport" mode
* Camera interface such that handlers can be extended to other devices (gimbals, cargo drop, etc)
* Camera module
* Untethered flight testing!
* Navigation handlers: actions (hold / change 1 to 3 axes, platform specific handling of each desired state)
* Abstract components...
  * Control = Component, like camera? Everything gets a control handler and namespace our vehicle commands to component?
* Longer range connectivity - high gain wifi/4G, xBee if bandwidth can handle video?
* abstract filters to their own class
* Fail-safe modes
* Recruit interested people who want to help! Hex/Octo/Y copter? Heli? Fixed Wing? I'm trying to keep the broad view but I only have a quad to work with.

    NEW XYZ SYSTEM NOTES

    from: https://www.av8n.com/physics/coords.htm

    6.    Body system
    In a boat, aircraft, or spacecraft, the conventional body axes are defined as follows: The X axis extends out the front of the craft. The Y axis extends out the starboard side. The Z axis extends out the bottom.

    These axes are rigidly fixed to the structure of the craft, and rotate with the craft. In particular, when the craft is maneuvering, you cannot assume that the Z axis is vertical or that the X or Y axis is horizontal relative to the local surface of the earth.

    Having the Z axis point downward may seem counterintuitive at first glance, but this system has many advantages.

    {dX, dY, dZ} is a right-handed orthogonal system.
    Rotation in the XY plane i.e. rotation around the +Z axis represents positive yaw, i.e. clockwise as seen from the top of the craft, looking in the +Z direction.
    Rotation in the YZ plane i.e. rotation around the +X axis represents positive roll, i.e. clockwise as seen from behind the craft, looking forward along +X direction.
    Rotation in the ZX plane i.e. rotation around the +Y axis represents positive pitch, i.e. nose up, i.e. clockwise as seen when looking along +Y direction.

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

++++++++++++++++++++++++++++++++++++++++

Flight commands -> vehicle movement controller
~~~ i.e. ~~~
namespaced commands -> component controller

Mode handlers could exist for components like camera too
-- ex. "follow me" mode

movement controllers
- 6 axes
-- "powered lift", "fixed wing", "rover", etc

Control modes (manual, stabilize & trim full), vs Navigaton (go to point, hold axis, etc) modes?

