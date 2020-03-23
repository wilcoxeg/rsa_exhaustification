// Code for restaurant study

var worlds = [{chair: true, footstool: true},
              {chair: true, footstool: false},
              {chair: false, footstool: true}]

// prior over world states
var worldPrior = function(prior) {
  var world = categorical({vs: [{chair: true, footstool: true},
              {chair: true, footstool: false},
              {chair: false, footstool: true}],
              ps: prior})
  return world
}

// set of utterances
var utterances = ["c", "f", "c&f", "c_not_f", "f_not_c",]

// utterance cost function
var cost = function(utterance, c1, c2) {
  if(utterance=="c" | utterance == "f") {
    return 0
  } else if (utterance == "c&f") {
    return c1
  } else if (utterance == "c_not_f" | utterance == "f_not_c") {
    return c2
  }
};

// meaning function to interpret the utterances
var meaning = function(utterance, world){
  if(utterance=="c") {
    return (world.chair == true)
  } else if (utterance == "f") {
    return (world.footstool == true)
  } else if (utterance == "c&f") {
    return (world.chair & world.footstool)
  } else if (utterance == "c_not_f") {
    return (world.chair & (! world.footstool)) 
  } else if (utterance == "f_not_c") {
    return (world.footstool & (! world.chair))
  }
}

// literal listener
var literalListener = function(utterance, prior){
  Infer({model: function(){
    var world = worldPrior(prior);
    condition(meaning(utterance, world))
    return world
  }})
}

// set speaker optimality
var alpha = 1

// pragmatic speaker
var speaker = function(obj, a, c1, c2, prior){
  Infer({model: function(){
    var utterance = uniformDraw(utterances)
    factor(a * (literalListener(utterance, prior).score(obj) - cost(utterance, c1, c2)))
    return utterance
  }})
}

// pragmatic listener
var pragmaticListener = function(utterance, a, c1, c2, prior){
  Infer({model: function(){
    var obj = worldPrior(prior)
    observe(speaker(obj, a, c1, c2, prior), utterance)
    return obj
  }})
}

// viz.table(pragmaticListener("c", 1, 1, 2, [0.54,0.14,0.32]))


var alphas = [0.01, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
var c1 = [0.01, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
var c2 = [0.01, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
var priors = [[0.491,0.206,0.303]]


/*
var alphas = [0.01, 1,2,3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
var c1 = [0.01, 1,2,3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
var c2 = [0.01, 1,2,3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
var priors = [[0.54,0.14,0.32]]
*/

var res = map(function(p, result) {
  var res = map(function(x, result){
    var res = map(function(y, result){
      var res = map(function(z, result){
        var alpha = x;
        var c1 = y;
        var c2 = z;
        var prior = p;
        var param_key = prior.toString() + "_" + alpha.toString() + "_" + c1.toString() + "_" + c2.toString()
        var prag_high = pragmaticListener("f", alpha, c1, c2, prior)
        var prag_low = pragmaticListener("c", alpha, c1, c2, prior)
        var spkr_both = speaker({chair:true, footstool:true}, alpha, c1, c2, prior)
        var spkr_high = speaker({chair:false, footstool:true}, alpha, c1, c2, prior)
        var spkr_low = speaker({chair:true, footstool:false}, alpha, c1, c2, prior)
        var result = [param_key,prag_high,prag_low,spkr_both,spkr_high,spkr_low]
        return(result)
      }, c2) 
      return(res)}, c1)
    return(res)}, alphas)
  return(res)}, priors)

print(res)