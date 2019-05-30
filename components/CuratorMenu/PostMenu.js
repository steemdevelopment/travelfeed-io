import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import CuratorIcon from '@material-ui/icons/MoreVert';
import PopupState, {
  bindMenu,
  bindTrigger,
} from 'material-ui-popup-state/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { getRoles } from '../../helpers/token';
import AuthorBlacklist from './Actions/AuthorBlacklist';
import CustomJson from './Actions/CustomJson';
import JsonAndMutate from './Actions/JsonAndMutate';
import PostBlacklist from './Actions/PostBlacklist';

class PostMenu extends Component {
  state = {
    roles: [],
  };

  componentDidMount() {
    const roles = getRoles();
    this.setState({
      roles,
    });
  }

  render() {
    const { roles } = this.state;
    const { author, permlink } = this.props;
    if (roles && roles.indexOf('curator') !== -1) {
      return (
        <PopupState variant="popover" popupId="demo-popup-menu">
          {popupState => (
            <React.Fragment>
              <IconButton {...bindTrigger(popupState)}>
                <CuratorIcon />
              </IconButton>
              <Menu {...bindMenu(popupState)}>
                <CustomJson
                  author={author}
                  permlink={permlink}
                  action="curate"
                  title="Are you sure that you want to curate this post?"
                  desc="This post will be upvoted with 100% by @travelfeed and it's curation trail, resteemed and will receive a congratulation comment."
                />
                <CustomJson
                  author={author}
                  permlink={permlink}
                  action="honour"
                  title="Are you sure that you want to honour this post?"
                  desc="This post will be upvoted with 50% by @travelfeed and will receive a congratulation comment."
                />
                <JsonAndMutate
                  author={author}
                  permlink={permlink}
                  action="short"
                  title="Are you sure that you want to mark this post as too short?"
                  desc="This post will be blacklisted and receive a comment."
                  reason="Post is under the threshold of 250 words."
                />
                <JsonAndMutate
                  author={author}
                  permlink={permlink}
                  action="language"
                  title="Are you sure that you want to mark this post as having less than 250 words in English?"
                  desc="This post will be blacklisted and receive a comment."
                  reason="Post is under the threshold of 250 English words."
                />
                <JsonAndMutate
                  author={author}
                  permlink={permlink}
                  action="copyright"
                  title="Are you sure that you want to mark this post as violating copyright?"
                  desc="This post will be blacklisted and receive a comment."
                  reason="Post is violating copyright."
                />
                <PostBlacklist author={author} permlink={permlink} />
                <AuthorBlacklist author={author} />
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
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
};

export default PostMenu;
