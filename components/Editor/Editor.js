// https://github.com/stfy/react-editor.js Copyright (c) 2019 Semenyuk Timofey

import EditorJS from '@editorjs/editorjs';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import commonTools from './CommonTools';

class Editor extends Component {
  static defaultProps = {
    holder: 'editorjs-holder',
    customTools: {},
    excludeDefaultTools: [],
    onChange: () => {},
    onReady: () => {},
    data: {},
    autofocus: true,
  };

  static propTypes = {
    holder: PropTypes.string,
    customTools: PropTypes.objectOf(PropTypes.object),
    excludeDefaultTools: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    data: PropTypes.objectOf(PropTypes.object),
    autofocus: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.tools = this.initTools(props.tools);

    this.onChange = props.onChange;
    this.onReady = props.onReady;

    this.el = React.createRef();
  }

  componentDidMount() {
    this.initEditor();
  }

  componentWillUnmount() {
    this.destroyEditor();
  }

  initEditor = () => {
    const { holder, autofocus, data } = this.props;
    const { tools } = this;
    this.editor = new EditorJS({
      holder,
      autofocus,
      data,
      tools,
      onChange: this.handleChange,
      onReady: this.handleReady,
    });
  };

  destroyEditor = () => {
    if (!this.editor) return;
    // this.editor.destroy();
    this.editor = null;
  };

  initTools = () => {
    const { customTools, excludeDefaultTools } = this.props;
    const toolsList = { ...commonTools, ...customTools };

    if (excludeDefaultTools.length !== 0) {
      return Object.keys(toolsList)
        .filter(tool => !excludeDefaultTools.includes(tool))
        .reduce((acc, curr) => ({ ...acc, [curr]: toolsList[curr] }), {});
    }

    return toolsList;
  };

  handleChange = async () => {
    if (this.editor) {
      const data = await this.editor.save();
      // HTML serializer
      // const html = json2Html(data);
      // console.log(JSON.stringify(data));
      // console.log(html);
      this.onChange(data);
    }
  };

  handleReady = () => {
    this.onReady();
  };

  render() {
    const { holder } = this.props;
    return React.createElement('div', {
      id: holder,
      className: 'border',
      ref: this.el,
    });
  }
}

Editor.propTypes = {
  tools: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Editor;
