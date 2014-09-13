/** @jsx React.DOM */
var app = app || {};

(function() {
  "use strict";

  app.AppComponent = React.createClass({
    getInitialState: function() {
      return { inputs: [""] };
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
          <OutputsComponent />
        </div>
      );
    }
  });
})();
