module.exports = {};

module.exports.random = function(min, max, noMunge) {
  // gives random number from a range, with garbage thrown
  // in to randomly check error handling.
  var seed = Math.random() * (max - min) + min;
  var flag = parseInt(seed.toString().slice(-2));
  switch (!noMunge && flag) {
    case 11: // make sure there are some non-decimals
      return Math.round(seed);
    case 22: // some undefined for good measure
      return undefined;
    case 33:
      return NaN;
    case 34:
      return null;
    case 35:
      return;
    case 44:
      return 'Nobody expects the spanish inquisition!';
    case 55:
      return -1;
  }
  return seed;
}
