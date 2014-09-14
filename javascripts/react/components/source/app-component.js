/** @jsx React.DOM */
var app = app || {};

(function() {
  "use strict";

  app.AppComponent = React.createClass({
    getInitialState: function() {
      return { 
        inputs: [""],
        outputs: {}
      };
    },

    addInput: function() {
      this.setState({
        inputs: this.state.inputs.concat("")
      });
    },

    updateInput: function(index, newInput) {
      var newInputs = this.state.inputs.concat();
      newInputs[index] = newInput;
      this.setState({ inputs: newInputs });
    },

    submitInputs: function() {
      var promises = [];
      this.state.inputs.forEach(function(input) {
        promises.push(
          app.scraper.scrape(
            input,
            function(data) {
              app.ngram.parseContent(data.comments, 1, 3);
            },
            function(error) {
            }
          )
        );
      });

      var that = this;
      $.when.apply($, promises).then(function() {
        that.setState({
          outputs: {
            output: app.ngram.generate()
          }
        });
      });
    },

    newOutput: function() {
      this.setState({
        outputs: {
          output: app.ngram.generate()
        }
      });
    },

    render: function() {
      var InputsComponent = app.InputsComponent;
      var OutputsComponent = app.OutputsComponent;

      return (
        <div className="app">
          <InputsComponent inputs={this.state.inputs}
            addInput={this.addInput}
            updateInput={this.updateInput}
            submitInputs={this.submitInputs} />
          <OutputsComponent output={this.state.outputs.output}
            newOutput={this.newOutput} />
        </div>
      );
    }
  });
})();
