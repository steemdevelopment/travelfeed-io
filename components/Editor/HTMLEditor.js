import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React from 'react';
import uploadFile from '../../helpers/imageUpload';
import parseBody from '../../helpers/parseBody';
import { getUser } from '../../helpers/token';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const HtmlEditor = props => {
  const { data, onChange } = props;

  const handleImageUpload = (file, callback) => {
    return uploadFile(file, getUser()).then(res => {
      return callback(res);
    });
  };

  return (
    <div style={{ height: '600px', fontFamily: 'Roboto' }}>
      <MdEditor
        config={{ htmlClass: 'postcontent', synchScroll: true }}
        value={data}
        renderHTML={text =>
          parseBody(text, { lazy: false, secureLinks: false })
        }
        onChange={onChange}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
};

HtmlEditor.propTypes = {
  data: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HtmlEditor;
