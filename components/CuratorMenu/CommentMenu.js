import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import CuratorIcon from "@material-ui/icons/MoreVert";
import { getRoles } from "../../utils/token";
import Menu from "@material-ui/core/Menu";
import PostBlacklist from "./Actions/PostBlacklist";
import AuthorBlacklist from "./Actions/AuthorBlacklist";

import PopupState, {
  bindTrigger,
  bindMenu
} from "material-ui-popup-state/index";

class PostMenu extends Component {
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
        <PopupState variant="popover" popupId="demo-popup-menu">
          {popupState => (
            <React.Fragment>
              <IconButton {...bindTrigger(popupState)}>
                <CuratorIcon />
              </IconButton>
              <Menu {...bindMenu(popupState)}>
                <PostBlacklist
                  author={this.props.author}
                  permlink={this.props.permlink}
                />
                <AuthorBlacklist author={this.props.author} />
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      );
    }
    return <Fragment />;
  }
}

PostMenu.propTypes = {
  author: PropTypes.string,
  permlink: PropTypes.string
};

export default PostMenu;
