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
  var Parse = function(str, curr) {
    n = this.min + curr;

    // Current str is too short
    if (str.length < n) 
      return;
    str = str.toLowerCase();

    var words = str.split(" ");
    for (var i = 0; i < words.length - n; i++) {
      var key = words.slice(i, i + n).join();
      if (!(key in this.map))
        this.map[key] = [];
      this.map[key].push(words[i + n + 1]);
    }
    var key = words.slice(words.length - n, words.length).join();
    // hack TODO: Make more elegant?
    this.map[key].push("STOP");
  }

  Ngram.prototype.parse = function(contents[], min, max) {
    for (var n = 0; n <= max - min; n++ ) {
      for (var i = 0; i < contents.length; i++) {
        this.Parse(contents[i], n);
      }
    }
    var max = 0;
    for (var key in this.map) {
      if (map[key].length > max) {
        this.maxKey = key;
        max = map[key].length;
      }
    }
    console.log("Most common key is " + this.maxKey);
  };

  // Take a random seed string, start generating
  Ngram.prototype.generate = function() {
    var string = this.maxKey;
    for 
  };

  app.ngram = new Ngram();
})();
