import dynamic from 'next/dynamic';
import React from 'react';
// import parseBody from '../../helpers/parseBody';

const Editor = dynamic(() => import('./EasyEditor/editor.js'), {
  ssr: false,
});

// TODO: Convert to markdown (not to HTML as previously!). Reverse conversion from markdown.

const EasyEditor = props => {
  const { data, onChange } = props;

  return (
    <div className="postcontent">
      <Editor
        autofocus
        holderId="editorjs-container"
        // excludeDefaultTools={['header']}
        onChange={data => console.log(data)}
        // customTools={{
        //   header: CustomHeader,
        // }}
        onReady={() => console.log('Start!')}
        data={{
          time: 1554920381017,
          blocks: [
            {
              type: 'paragraph',
              data: {
                text: 'Hello Editor.js',
              },
            },
          ],
          version: '2.12.4',
        }}
      />
    </div>
  );
};

export default EasyEditor;
