import PropTypes from 'prop-types';
import React from 'react';
import parseBody from '../../helpers/parseBody';

const HtmlEditorPreview = props => {
  let htmlBody = '';
  if (props.preview) {
    htmlBody = parseBody(props.preview, {});
  }
  const bodyText = { __html: htmlBody };
  return (
    <div>
      Preview
      <div
        className="postcontent border mt-2 w-100 h-100 pl-2"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={bodyText}
      />
    </div>
  );
};

HtmlEditorPreview.propTypes = {
  preview: PropTypes.string.isRequired,
};

export default HtmlEditorPreview;
