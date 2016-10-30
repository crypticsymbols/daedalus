// var Manual = {
//   handle: function(thing, cb){
//     cb(thing + ' manual')
//   }
// }

// var Stabilize = {
//   handle: function(thing, cb){
//     cb(thing + ' stabilize')
//   }
// }

// Guided, manual, land, loiter, altHold, gohome
// 
// - Stabilize
// - alt hold
// - line hold & change
// - point hold

// Mode needs to know
// - how ya doing
// - where ya wanna go
// - how can I make you do it
//    - stabilize: here's my XYZ control
//    - Go to point: here's my climb, descend, turn controls.
//      - run this in this order, or simultaneously, or combination.

// module.exports = {
//   manual: Manual,
//   stabilize: Stabilize
// }


// A mode changes current state into desired state
// 