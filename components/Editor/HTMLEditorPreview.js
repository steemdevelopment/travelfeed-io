import React, { Component } from "react";
import PropTypes from "prop-types";
import parseBody from "../../helpers/parseBody";

class HtmlEditorPreview extends Component {
  render() {
    let htmlBody = "";
    console.log(this.props.preview);
    if (this.props.preview) {
      htmlBody = parseBody(this.props.preview, {});
    }
    const bodyText = { __html: htmlBody };
    return (
      <div>
        Preview
        <div
          className="postcontent border mt-2 w-100 h-100 pl-2"
          dangerouslySetInnerHTML={bodyText}
        />
      </div>
    );
  }
}

export default HtmlEditorPreview;
