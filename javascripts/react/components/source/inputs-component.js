/** @jsx React.DOM */
var app = app || {};

(function() {
  "use strict";

  var InputComponent = React.createClass({
    handleChange: function() {
      var newInput = this.refs.input.getDOMNode().value;
      this.props.updateInput(this.props.index, newInput);
    },

    render: function() {
      return (
        <input type="text" ref="input"
          defaultValue={this.props.input}
          onChange={this.handleChange} />
      );
    }
  });

  app.InputsComponent = React.createClass({
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

    render: function() {
      var inputComponents = [];
      var that = this;
      this.state.inputs.forEach(function(input, index) {
        inputComponents.push(
          <InputComponent input={input} index={index}
            updateInput={that.updateInput} />
        );
      });

      return (
        <div className="inputs">
          {inputComponents}
          <button onClick={this.addInput}>
            <span className="glyphicon glyphicon-plus-sign" />
            Add Input
          </button>
        </div>
      );
    }
  });
})();
