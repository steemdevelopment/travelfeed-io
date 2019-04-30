import React, {Component} from "react";
import Editor from "rich-markdown-editor";

class Example extends Component {
  render() {
    return <Editor defaultValue="Hello world!" />;
  }
}

export default Example;
