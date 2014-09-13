var app = app || {};

(function() {
  "use strict";

  var Scraper = function() {};
  
  Scraper.prototype.scrape = function(url, success, failure) {
    // hacky url parsing
    url = completeURL(url);
    var urlTokens = document.createElement('a');
    urlTokens.href = url;
    var hostname = urlTokens.hostname.toLowerCase();
    console.log(url);

    // if we are on reddit
    if (hostname.indexOf('reddit') >= 0) {
      // Iterate through all links to comments pages
      // Calls the callback once for EACH PAGE
      if (url.indexOf("/comments/") >= 0) {
        $.getJSON(url + '.json')
          .done(function(response) {
            success(parseRedditJSON(response));
          })
          .fail(failure);
      } else {
        $.getJSON(url + '.json')
            .done(function(obj) {
              // get links from data
              obj.data.children.forEach(function(child) {
                var threadUrl = 'http://www.reddit.com' + child.data.permalink;
                console.log(threadUrl);
                $.getJSON(threadUrl + '.json')
                    .done(function(response) {
                      success(parseRedditJSON(response));
                    })
                    .fail(failure);
              });
            })
            .fail(failure);
      }
    }
  };

  var prefix1 = 'http://';
  var prefix2 = 'https://';

  // Adding the prefix to URLs
  var completeURL = function(url, domain) {
    if (url.substr(0, prefix1.length) !== prefix1 && 
        url.substr(0, prefix2.length) !== prefix2) {
      url = prefix1 + url;
    }
    return url;
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

  app.scraper = new Scraper();
})();
