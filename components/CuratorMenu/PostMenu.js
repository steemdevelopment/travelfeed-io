import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import CuratorIcon from "@material-ui/icons/MoreVert";
import { getRoles } from "../../utils/token";
import Menu from "@material-ui/core/Menu";
import CustomJson from "./Actions/CustomJson";
import JsonAndMutate from "./Actions/JsonAndMutate";
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
                <CustomJson
                  author={this.props.author}
                  permlink={this.props.permlink}
                  action="curate"
                  title="Are you sure that you want to curate this post?"
                  desc="This post will be upvoted with 100% by @travelfeed and it's curation trail, resteemed and will receive a congratulation comment."
                />
                <CustomJson
                  author={this.props.author}
                  permlink={this.props.permlink}
                  action="honour"
                  title="Are you sure that you want to honour this post?"
                  desc="This post will be upvoted with 50% by @travelfeed and will receive a congratulation comment."
                />
                <JsonAndMutate
                  author={this.props.author}
                  permlink={this.props.permlink}
                  action="short"
                  title="Are you sure that you want to mark this post as too short?"
                  desc="This post will be blacklisted and receive a comment."
                  reason="Post is under the threshold of 250 words."
                />
                <JsonAndMutate
                  author={this.props.author}
                  permlink={this.props.permlink}
                  action="language"
                  title="Are you sure that you want to mark this post as having less than 250 words in English?"
                  desc="This post will be blacklisted and receive a comment."
                  reason="Post is under the threshold of 250 English words."
                />
                <JsonAndMutate
                  author={this.props.author}
                  permlink={this.props.permlink}
                  action="copyright"
                  title="Are you sure that you want to mark this post as violating copyright?"
                  desc="This post will be blacklisted and receive a comment."
                  reason="Post is violating copyright."
                />
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
