import ClickAwayListener from '@material-ui/core/ClickAwayListener';
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
import ChangeRoles from './Actions/ChangeRoles';

class BlogMenu extends Component {
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
    const { author, isCurator } = this.props;
    if (roles && roles.indexOf('curator') !== -1) {
      return (
        <Fragment>
          <IconButton onClick={this.handleToggle}>
            <CuratorIcon className="text-light" />
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
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <AuthorBlacklist author={author} />
                      {roles.indexOf('admin') !== -1 && (
                        <ChangeRoles author={author} isCurator={isCurator} />
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Fragment>
      );
    }
    return <Fragment />;
  }
}

BlogMenu.propTypes = {
  author: PropTypes.string.isRequired,
  isCurator: PropTypes.bool.isRequired,
};

export default BlogMenu;
