import dynamic from 'next/dynamic';
import React from 'react';
import parseBody from '../../helpers/parseBody';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const HtmlEditor = props => {
  const { data, onChange } = props;

  return (
    <div style={{ height: '600px', fontFamily: 'Roboto' }}>
      <MdEditor
        config={{ htmlClass: 'postcontent', synchScroll: true }}
        value={data}
        renderHTML={text => parseBody(text, { lazy: false })}
        onChange={onChange}
      />
    </div>
  );
};

export default HtmlEditor;
