module.exports = {}

module.exports.scalePercentageToValue = function(percent, min, max){
  // console.log(percent)
  return (min + ((max - min) * (percent/100)));
}
