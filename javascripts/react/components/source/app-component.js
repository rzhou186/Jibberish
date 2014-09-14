/** @jsx React.DOM */
var app = app || {};

(function() {
  "use strict";

  app.AppComponent = React.createClass({
    getInitialState: function() {
      return {
        inputs: {
          urls: [],
          texts: []
        },
        outputs: {}
      };
    },

    addUrlInput: function() {
      this.setState({
        inputs: {
          urls: this.state.inputs.urls.concat(""),
          texts: this.state.inputs.texts
        }
      });
    },

    updateUrlInput: function(index, newUrlInput) {
      var newUrlInputs = this.state.inputs.urls.concat();
      newUrlInputs[index] = newUrlInput;
      this.setState({ 
        inputs: {
          urls: newUrlInputs,
          texts: this.state.inputs.texts
        }
      });
    },

    addTextInput: function() {
      this.setState({
        inputs: {
          urls: this.state.inputs.urls,
          texts: this.state.inputs.texts.concat("")
        }
      });
    },

    updateTextInput: function(index, newTextInput) {
      var newTextInputs = this.state.inputs.texts.concat();
      newTextInputs[index] = newTextInput;
      this.setState({ 
        inputs: {
          urls: this.state.inputs.urls,
          texts: newTextInputs
        }
      });
    },    

    submitInputs: function() {
      this.state.inputs.texts.forEach(function(textInput) {
        app.ngram.parseContent(textInput, 1, 3);
      });

      var promises = [];
      this.state.inputs.urls.forEach(function(urlInput) {
        promises.push(
          app.scraper.scrape(
            urlInput,
            function(data) {
              app.ngram.parseContent(data.comments, 1, 3);
              app.scraper.redditUpdate();
            },
            function(error) {
              console.log(error);
            }
          )
        );
      });
    },

    newOutput: function() {
      this.setState({
        outputs: {
          output: this.generate()
        }
      });
    },

    generate: function() {
      if (app.scraper.scraping) {
        return "Can't generate. Still scraping.";
      } else {
        return app.ngram.generate();
      }
    },

    wipeAll: function() {
      this.setState({
        inputs: {
          urls: [],
          texts: []
        },
        outputs: {}
      });
      this.app.ngram.clearModel();
    },

    render: function() {
      var InputsComponent = app.InputsComponent;
      var OutputsComponent = app.OutputsComponent;

      return (
        <div className="app">
          <InputsComponent inputs={this.state.inputs}
            addUrlInput={this.addUrlInput}
            addTextInput={this.addTextInput}
            updateUrlInput={this.updateUrlInput}
            updateTextInput={this.updateTextInput}
            submitInputs={this.submitInputs} />
          <OutputsComponent output={this.state.outputs.output}
            newOutput={this.newOutput}
            wipeAll={this.wipeall} />
        </div>
      );
    }
  });
})();
