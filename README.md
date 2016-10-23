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