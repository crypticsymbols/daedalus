var Controls = function(){

  var state = {}

  this.setState = function(inputs){
    Object.freeze(inputs)
    state = inputs
  }

  this.getState = function(){
    return Object.create(state);
  }

}

module.exports = Controls