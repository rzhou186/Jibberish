var app = app || {};

(function() {
  "use strict";

  var Scraper = function() {};
  
  Scraper.prototype.scrape = function(url, success, failure) {
    // hacky url parsing
    var urlTokens = document.createElement('a');
    urlTokens.href = url;
    var hostname = urlTokens.hostname.toLowerCase();
    // if we are on reddit
    if (hostname.indexOf("reddit") >= 0) {
      // if we are on a page showing comments
      if (url.indexOf("/comments/") >= 0) {
        if (url[url.length-1] == "/") {
          url = url.substring(0, url.length-1);
        }
        var jsonURL = url + ".json";
        $.getJSON(jsonURL)
            .done(function(response) {
              success(parseRedditJSON(response));
            })
            .fail(failure);
      }
    }

    var parseRedditJSON = function(response) {
      return {
        source: "reddit",
        title: response[0].data.children[0].data.title,
        content: response[0].data.selftext,
        comments: parseRedditListing(response[1])
      }
    };

    var parseRedditListing = function(listing) {
      var result = [];
      var children = listing.data.children;
      for (var i = 0; i < children.length; i++) {
        var tmp = parseRedditT1(children[i]);
        result = result.concat(tmp);
      }
      return result;
    }

    var parseRedditT1 = function(obj) {
      var result = [];
      if (obj.data.body) {
        result.push(obj.data.body);
      }
      if (obj.data.replies) {
        result.concat(parseRedditListing(obj.data.replies));
      }
      return result;
    }
  };

  
  app.scraper = new Scraper();
})();
