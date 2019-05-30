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
    if (this.state.roles && this.state.roles.indexOf('curator') !== -1) {
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
  permlink: PropTypes.string,
};

export default PostMenu;
