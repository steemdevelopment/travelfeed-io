import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import React from 'react';
import CodeMirror from 'react-codemirror';

const HtmlEditor = () => {
  const { data, onChange } = this.props;
  return (
    <div className="border">
      <CodeMirror
        defaultValue={data}
        options={{
          mode: 'markdown',
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default HtmlEditor;
