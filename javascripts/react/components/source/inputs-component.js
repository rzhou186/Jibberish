/** @jsx React.DOM */
var app = app || {};

(function() {
  "use strict";

  app.InputsComponent = React.createClass({
    render: function() {
      return (
        <div className="inputs">
          <input type="text"></input>
          <input type="text"></input>
          <button>
            <span className="glyphicon glyphicon-plus-sign"></span>
            Add Input
          </button>
        </div>
      );
    }
  });
})();
