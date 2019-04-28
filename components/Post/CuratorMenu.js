import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import CuratorIcon from "@material-ui/icons/MoreVert";
import { getRoles } from "../../utils/token";

class BookmarkIcon extends Component {
  state = {
    roles: []
  };
  componentDidMount() {
    const roles = getRoles();
    this.setState({
      roles
    });
  }
  render() {
    if (this.state.roles.indexOf("curator") !== -1) {
      return (
        <IconButton>
          <CuratorIcon />
        </IconButton>
      );
    }
    return <Fragment />;
  }
}

export default BookmarkIcon;
