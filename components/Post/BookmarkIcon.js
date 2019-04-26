import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import BookmarkIconBorder from "@material-ui/icons/BookmarkBorder";

// Query mongo. If is in bookmarks...

class BookmarkIcon extends Component {
  render() {
    return (
      <IconButton>
        <BookmarkIconBorder />
      </IconButton>
    );
  }
}

export default BookmarkIcon;
