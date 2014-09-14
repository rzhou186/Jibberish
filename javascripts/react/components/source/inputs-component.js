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
        <input className="input" type="text" ref="input"
          defaultValue={this.props.input}
          onChange={this.handleChange} />
      );
    }
  });

  app.InputsComponent = React.createClass({
    render: function() {
      var inputComponents = [];
      var updateInput = this.props.updateInput;

      this.props.inputs.forEach(function(input, index) {
        inputComponents.push(
          <InputComponent input={input} index={index}
            updateInput={updateInput} />
        );
      });

      return (
        <div className="inputs">
          <div className="title">Inputs</div>
          {inputComponents}
          <button onClick={this.props.submitInputs}>
            <span className="glyphicon glyphicon-play-circle" />
            Run
          </button>
          <button onClick={this.props.addInput}>
            <span className="glyphicon glyphicon-plus-sign" />
            Add Input
          </button>
        </div>
      );
    }
  });
})();
