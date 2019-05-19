// https://github.com/stfy/react-editor.js Copyright (c) 2019 Semenyuk Timofey

import React, { Component } from "react";
import PropTypes from "prop-types";
import EditorJS from "@editorjs/editorjs";
import commonTools from "./common-tools";
import json2Html from "./json2Html";

class Editor extends Component {
  static defaultProps = {
    holder: "editorjs-holder",
    customTools: {},
    excludeDefaultTools: [],
    onChange: () => {},
    onReady: () => {},
    data: {},
    autofocus: true
  };

  static propTypes = {
    holder: PropTypes.string,
    customTools: PropTypes.object,
    excludeDefaultTools: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    data: PropTypes.object,
    autofocus: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this._tools = this._initTools(props.tools, props.excludeTools);

    this._onChange = props.onChange;
    this._onReady = props.onReady;

    this._el = React.createRef();
  }

  componentDidMount() {
    this._initEditor();
  }

  componentWillUnmount() {
    this._destroyEditor();
  }

  _initEditor = () => {
    const { holder, autofocus, data } = this.props;
    const tools = this._tools;
    this.editor = new EditorJS({
      holder,
      autofocus,
      data,
      tools,
      onChange: this._handleChange,
      onReady: this._handleReady
    });
  };

  _destroyEditor = () => {
    if (!this.editor) return;
    // this.editor.destroy();
    this.editor = null;
  };

  _initTools = () => {
    const { customTools, excludeDefaultTools } = this.props;
    const toolsList = { ...commonTools, ...customTools };

    if (excludeDefaultTools.length !== 0) {
      return Object.keys(toolsList)
        .filter(tool => !excludeDefaultTools.includes(tool))
        .reduce((acc, curr) => ({ ...acc, [curr]: toolsList[curr] }), {});
    }

    return toolsList;
  };

  _handleChange = async () => {
    if (this.editor) {
      const data = await this.editor.save();
      // HTML serializer
      // const html = json2Html(data);
      // console.log(JSON.stringify(data));
      // console.log(html);
      this._onChange(data);
    }
  };

  _handleReady = () => {
    this._onReady();
  };

  render() {
    const { holder } = this.props;
    return React.createElement("div", {
      id: holder,
      className: "border",
      ref: this._el
    });
  }
}

export default Editor;
