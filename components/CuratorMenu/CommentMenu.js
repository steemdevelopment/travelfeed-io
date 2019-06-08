import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import CuratorIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { getRoles } from '../../helpers/token';
import AuthorBlacklist from './Actions/AuthorBlacklist';
import PostBlacklist from './Actions/PostBlacklist';

class CommentMenu extends Component {
  state = {
    roles: [],
    menuopen: false,
  };

  componentDidMount() {
    const roles = getRoles();
    this.setState({
      roles,
    });
  }

  handleToggle = () => {
    this.setState(state => ({ menuopen: !state.menuopen }));
  };

  handleClose = () => {
    this.setState({ menuopen: false });
  };

  render() {
    const { roles, menuopen } = this.state;
    const { author, permlink } = this.props;
    if (roles && roles.indexOf('curator') !== -1) {
      return (
        <React.Fragment>
          <IconButton onClick={this.handleToggle}>
            <CuratorIcon />
          </IconButton>
          <Popper
            open={menuopen}
            anchorEl={this.anchorEl}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <MenuList>
                    <PostBlacklist author={author} permlink={permlink} />
                    <AuthorBlacklist author={author} />
                  </MenuList>
                </Paper>
              </Grow>
            )}
          </Popper>
        </React.Fragment>
      );
    }
    return <Fragment />;
  }
}

CommentMenu.propTypes = {
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
};

export default CommentMenu;
