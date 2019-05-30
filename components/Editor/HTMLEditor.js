import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';

class HtmlEditor extends Component {
  render() {
    return (
      <div className="border">
        <CodeMirror
          defaultValue={this.props.data}
          options={{
            mode: 'markdown',
          }}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default HtmlEditor;
