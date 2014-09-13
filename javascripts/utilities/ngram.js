var app = app || {};

(function() {
  "use strict";

  var Ngram = function() {
    this.currNGrams = [];
    this.map = {};
    this.min = 2;
    this.max = 2;
    this.maxGen = 200;
    this.maxKey = "";
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
    }
    // hack TODO: Make more elegant?
    var key = words.slice(words.length - n, words.length).join(" ");
    if (!(key in this.map))
      this.map[key] = [];
    this.map[key].push("STOP");
  }

  Ngram.prototype.parseContent = function(contents, min, max) {
    for (var n = 0; n <= this.max - this.min; n++ ) {
      for (var i = 0; i < contents.length; i++) {
        this.parseString(contents[i], n);
      }
    }
    var max = 0;
    for (var key in this.map) {
      if (this.map[key].length > max) {
        this.maxKey = key;
        max = this.map[key].length;
      }
    }
    console.log("Most common key is " + this.maxKey);
  };

  // Take a random seed string, start generating
  Ngram.prototype.generate = function() {
    var string = this.maxKey.split(" ");
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

  app.ngram = new Ngram();
})();
