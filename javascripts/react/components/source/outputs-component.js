/** @jsx React.DOM */
var app = app || {};

(function() {
  "use strict";

  var OutputComponent = React.createClass({
    getInitialState: function() {
      return {
        loading: false
      }
    },

    componentDidMount: function() {
      app.loader.on("loading", function(loading) {
        this.setState({
          loading: loading
        });
      }, this);
    },

    render: function() {
      if (this.state.loading) {
        return (
          <div className="output">
            <span className="loading">
              <img src="../../../../images/loader.gif" height="18" />
            </span>
          </div>  
        );
      }

      var output = this.props.output;
      if (!output) {
        return (
          <div className="output">
            <span className="empty">
              No current outputs.
            </span>
          </div>  
        );
      }

      return (
        <div className="output">
          &quot;{output}&quot;
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
