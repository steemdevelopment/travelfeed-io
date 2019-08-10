import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import uploadFile from '../../helpers/imageUpload';
import parseBody from '../../helpers/parseBody';
import { getUser } from '../../helpers/token';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const HtmlEditor = props => {
  const { data, onChange } = props;
  const [showHtml, setShowHtml] = useState(true);
  const [value, setValue] = useState(props.data);
  const [timer, setTimer] = useState(undefined);

  useEffect(() => {
    if (window.innerWidth < 576) {
      setShowHtml(false);
    }
  }, []);

  const handleImageUpload = (file, callback) => {
    return uploadFile(file, getUser()).then(res => {
      return callback(res);
    });
  };

  const triggerChange = () => {
    onChange(value);
  };

  const handleHtmlEditorChange = ({ text }) => {
    // Fire change when user stops typing:
    // https://gist.github.com/krambertech/76afec49d7508e89e028fce14894724c
    setTimer(clearTimeout(timer));

    setValue(text);

    setTimer(setTimeout(triggerChange, 1000));
  };

  return (
    <div style={{ height: '600px', fontFamily: 'Roboto' }}>
      <MdEditor
        config={{
          view: {
            menu: true,
            md: true,
            html: showHtml,
          },
          synchScroll: true,
        }}
        value={data}
        renderHTML={text =>
          parseBody(text, { lazy: false, secureLinks: false })
        }
        onChange={handleHtmlEditorChange}
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
