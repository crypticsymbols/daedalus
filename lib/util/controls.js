var Controls = function(){

  var state = {}

  this.setState = function(inputs){
    Object.freeze(inputs)
    state = inputs
  }

  this.getState = function(){
    // cheap deep copy
    return JSON.parse(JSON.stringify(state));
  }

}

module.exports = Controls