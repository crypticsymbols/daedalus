module.exports = {}

module.exports.scalePercentageToValue = function(percent, min, max){
  return (min + ((max - min) * (percent/100)));
}
