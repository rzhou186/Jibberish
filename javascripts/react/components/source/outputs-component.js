/** @jsx React.DOM */
var app = app || {};

(function() {
  "use strict";

  var OutputComponent = React.createClass({
    render: function() {
      return (
        <div className="output">
          
        </div>
      );
    }
  });

  app.OutputsComponent = React.createClass({
    render: function() {
      return (
        <div className="outputs">
          <OutputComponent />
        </div>
      );
    }
  });
})();
