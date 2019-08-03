import dynamic from 'next/dynamic';
import React from 'react';

const Editor = dynamic(() => import('./EasyEditor/editor.js'), {
  ssr: false,
});

const EasyEditor = props => {
  const { data, onChange } = props;

  return (
    <div className="postcontent">
      <Editor
        autofocus
        holderId="editorjs-container"
        onChange={onChange}
        data={data}
      />
    </div>
  );
};

export default EasyEditor;
