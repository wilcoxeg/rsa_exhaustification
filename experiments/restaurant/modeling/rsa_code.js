// Code for restaurant study

var worlds = [{sandwich: true, soup: true},
               {sandwich: true, soup: false}]

// prior over world states
var worldPrior = function(prior) {
  var world = categorical({vs: [{sandwich: true, soup: true},{sandwich: true, soup: false}],
              ps: [prior, 1-prior]})
  return world
}

// set of utterances
var utterances = ["sandwich", "sandwich and soup", "sandwich not soup"]

// utterance cost function
var cost = function(utterance, c1, c2) {
  if(utterance=="sandwich") {
    return 0
  } else if (utterance == "sandwich and soup") {
    return c1
  } else if (utterance == "sandwich not soup") {
    return c2
  }
};

// meaning function to interpret the utterances
var meaning = function(utterance, world){
  if(utterance=="sandwich") {
    return (world.sandwich == true)
  } else if (utterance == "sandwich and soup") {
    return (world.sandwich & world.soup)
  } else if (utterance == "sandwich not soup") {
    return (world.sandwich & (! world.soup))
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


//viz.table(pragmaticListener("sandwich", 1, 0.01, 20, 0.8333333))

var alphas = [0.01, 1,2,3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
var c1 = [0.01, 1,2,3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
var c2 = [0.01, 1,2,3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
var priors = [0.8333333, 0.8034188, 0.7523810, 0.7500000, 0.6407407, 0.4382716]

/*
var alphas = [0.01, 1,2,3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
var c1 = [0.01, 1,2,3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
var c2 = [0.01, 1,2,3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
var priors = [0.8333333, 0.8034188, 0.7523810, 0.7500000, 0.6407407, 0.4382716]
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
        var prag = pragmaticListener("sandwich", alpha, c1, c2, prior)
        var spkr_both = speaker({sandwich:true, soup:true}, alpha, c1, c2, prior)
        var spkr_single = speaker({sandwich:true, soup:false}, alpha, c1, c2, prior)
        var result = [param_key,prag,spkr_both, spkr_single]
        return(result)
      }, c2) 
      return(res)}, c1)
    return(res)}, alphas)
  return(res)}, priors)

print(res)