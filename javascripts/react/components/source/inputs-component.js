/** @jsx React.DOM */
var app = app || {};

(function() {
  "use strict";

  var UrlInputComponent = React.createClass({
    handleChange: function() {
      var newUrlInput = this.refs.urlInput.getDOMNode().value;
      this.props.updateUrlInput(this.props.index, newUrlInput);
    },

    render: function() {
      return (
        <input className="input" type="text" ref="urlInput"
          onChange={this.handleChange} />
      );
    }
  });

  var TextInputComponent = React.createClass({
    handleChange: function() {
      var newTextInput = this.refs.textInput.getDOMNode().value;
      this.props.updateTextInput(this.props.index, newTextInput);
    },

    render: function() {
      return (
        <textarea className="input" ref="textInput" 
          onChange={this.handleChange} />
      );
    }
  });

  app.InputsComponent = React.createClass({
    render: function() {
      var urlInputComponents = [];
      var updateUrlInput = this.props.updateUrlInput;

      this.props.inputs.urls.forEach(function(urlInput, index) {
        urlInputComponents.push(
          <UrlInputComponent urlInput={urlInput} index={index}
            updateUrlInput={updateUrlInput} />
        );
      });

      var textInputComponents = [];
      var updateTextInput = this.props.updateTextInput;

      this.props.inputs.texts.forEach(function(textInput, index) {
        textInputComponents.push(
          <TextInputComponent textInput={textInput} index={index}
            updateTextInput={updateTextInput} />
        );
      });

      var inputComponents = 
        <div>
          {urlInputComponents}
          {textInputComponents}
        </div>;

      if (this.props.inputs.urls.length === 0 && this.props.inputs.texts.length === 0) {
        inputComponents = 
          <div className="empty">
            No current inputs.
          </div>;
      }

      return (
        <div className="inputs">
          <div className="title">Inputs</div>
          {inputComponents}
          <button onClick={this.props.submitInputs}>
            <span className="glyphicon glyphicon-play-circle" />
            Run
          </button>
          <button onClick={this.props.addTextInput}>
            <span className="glyphicon glyphicon-plus-sign" />
            Add Text
          </button>
          <button onClick={this.props.addUrlInput}>
            <span className="glyphicon glyphicon-plus-sign" />
            Add URL
          </button>
        </div>
      );
    }
  });
})();
