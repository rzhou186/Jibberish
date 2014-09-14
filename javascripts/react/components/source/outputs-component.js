/** @jsx React.DOM */
var app = app || {};

(function() {
  "use strict";

  var OutputComponent = React.createClass({
    render: function() {
      var output = this.props.output;
      if (!output) {
        output = 
          <span className="empty">
            No current outputs.
          </span>;
      }

      return (
        <div className="output">
          {output}
        </div>
      );
    }
  });

  app.OutputsComponent = React.createClass({
    render: function() {
      return (
        <div className="outputs">
          <div className="title">Outputs</div>
          <OutputComponent output={this.props.output}/>
          <button onClick={this.props.newOutput}>
            <span className="glyphicon glyphicon-comment" />
            Speak
          </button>
          <button onClick={this.props.wipeAll}>
            <span className="glyphicon glyphicon-floppy-remove" />
            Wipe
          </button>
        </div>
      );
    }
  });
})();
