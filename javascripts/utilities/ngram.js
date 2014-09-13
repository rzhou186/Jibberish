var app = app || {};

(function() {
  "use strict";

  var Ngram = function() {
    this.map = {};
    this.seeds = [];
    this.min = 2;
    this.max = 2;
    this.maxGen = 200;
  };

  // Add n-grams for current str
  Ngram.prototype.parseString = function(str, curr) {
    var n = this.min + curr;

    // Current str is too short
    if (str.length < n) 
      return;
    str = str.toLowerCase();

    var words = str.split(" ");
    for (var i = 0; i < words.length - n; i++) {
      var key = words.slice(i, i + n).join(" ");
      if (!(key in this.map))
        this.map[key] = [];
      this.map[key].push(words[i + n]);
      if (i === 0) this.seeds.push(key);
    }
    // hack TODO: Make more elegant?
    var key = words.slice(words.length - n, words.length).join(" ");
    if (!(key in this.map))
      this.map[key] = [];
    this.map[key].push("STOP");
  };

  Ngram.prototype.parseContent = function(contents, min, max) {
    for (var n = 0; n <= this.max - this.min; n++ ) {
      for (var i = 0; i < contents.length; i++) {
        this.parseString(contents[i], n);
      }
    }
  };

  // Clear the model
  Ngram.prototype.clearModel = function() {
    this.map = {};
  };

  Ngram.prototype.setMin = function(min) {
    this.min = min;
  };

  Ngram.prototype.setMax = function(max) {
    this.max = max;
  };

  Ngram.prototype.setMaxGen = function(maxGen) {
    this.maxGen = maxGen;
  };

  // Take a random seed string, start generating
  Ngram.prototype.generate = function() {
    var seedIndex = Math.floor(Math.random() * this.seeds.length);
    var string = this.seeds[seedIndex].split(" ");
    while (string.length < this.maxGen) {
      var candidates = [];
      for (var i = this.min; i <= Math.min(this.max, string.length); i++) {
        var currKey = string.slice(string.length - i, string.length);
        candidates = candidates.concat(this.map[currKey.join(" ")]);
      }
      if (candidates.length < 1)
        break;
      var rand = Math.floor(Math.random() * candidates.length);
      var next = candidates[rand];
      if (next === "STOP") {
        console.log("Hit STOP word.");
        break;
      }
      string.push(next);
    }
    return string.join(" ");
  };

  //  Sanitizing strings
  var sanitize = function(str) {

  };

  // Joining together (capitalization and stuff)
  var join = function(words) {

  };

  app.ngram = new Ngram();
})();
