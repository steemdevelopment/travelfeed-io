import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { grey } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import DownIcon from '@material-ui/icons/ArrowDropDown';
import PublishIcon from '@material-ui/icons/Create';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DestinationsIcon from '@material-ui/icons/Explore';
import CookieIcon from '@material-ui/icons/GroupWork';
import FeedIcon from '@material-ui/icons/Home';
import PrivacyIcon from '@material-ui/icons/Lock';
import MapIcon from '@material-ui/icons/Map';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import ProfileIcon from '@material-ui/icons/Person';
import SignUpIcon from '@material-ui/icons/PersonAdd';
import TermsIcon from '@material-ui/icons/Toc';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { getUser, logout } from '../../helpers/token';
import Link from '../../lib/Link';
import Logout from '../Login/LogoutButton';
import LoginButton from './LoginButton';

class HeaderMenu extends Component {
  state = {
    user: '',
    menuopen: false,
    clickAwayListener: true,
  };

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    this.setState({ user: getUser() });
  }

  handleToggle = () => {
    this.setState(state => ({ menuopen: !state.menuopen }));
  };

  handleLogout = () => {
    logout();
    this.setState({ user: null });
    this.props.handleLogout();
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ menuopen: false });
  };

  render() {
    const { menuopen } = this.state;
    let me = <Fragment />;
    if (this.state.user == null) {
      me = (
        <Fragment>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={menuopen ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <div
              className="d-none d-xl-block d-lg-block"
              style={{ color: grey[200] }}
            >
              <MoreVert />
            </div>
            <div
              className="d-block d-xl-none d-lg-none"
              style={{ color: grey[200] }}
            >
              <MenuIcon />
            </div>
          </Button>
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
                  <ClickAwayListener
                    onClickAway={
                      this.state.clickAwayListener
                        ? this.handleClose
                        : undefined
                    }
                  >
                    <MenuList>
                      <div className="d-xl-none d-lg-none d-md-none d-block">
                        <Link color="textPrimary" href="/destinations" passHref>
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <DestinationsIcon />
                              </ListItemIcon>
                              <ListItemText primary="Destinations" />
                            </MenuItem>
                          </a>
                        </Link>
                        <Link color="textPrimary" href="/map" passHref>
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <MapIcon />
                              </ListItemIcon>
                              <ListItemText primary="Map" />
                            </MenuItem>
                          </a>
                        </Link>
                        <Divider />
                      </div>
                      <div className="d-block d-xl-none d-lg-none">
                        <LoginButton
                          isMenu
                          onClickOpen={() =>
                            this.setState({ clickAwayListener: false })
                          }
                          onClickClose={() =>
                            this.setState({ clickAwayListener: true })
                          }
                        />
                        <Link color="textPrimary" href="/join" passHref>
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <SignUpIcon />
                              </ListItemIcon>
                              <ListItemText primary="Join Now" />
                            </MenuItem>
                          </a>
                        </Link>
                        <Divider />
                      </div>
                      <Link color="textPrimary" href="/about/privacy" passHref>
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <PrivacyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Privacy" />
                          </MenuItem>
                        </a>
                      </Link>
                      <Link color="textPrimary" href="/about/terms" passHref>
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <TermsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Terms" />
                          </MenuItem>
                        </a>
                      </Link>
                      <Link color="textPrimary" href="/about/cookies" passHref>
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <CookieIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cookies" />
                          </MenuItem>
                        </a>
                      </Link>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Fragment>
      );
    }
    if (this.state.user != null && this.state.user !== '') {
      me = (
        <Fragment>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={menuopen ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className="p-0s"
          >
            <Avatar
              className="cpointer"
              src={`https://steemitimages.com/u/${this.state.user}/avatar/small`}
            />
            <DownIcon className="text-light" />
          </Button>
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
                      {(this.props.isDashboard && (
                        <Link color="textPrimary" href="/" passHref>
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <FeedIcon />
                              </ListItemIcon>
                              <ListItemText primary="TravelFeed" />
                            </MenuItem>
                          </a>
                        </Link>
                      )) || (
                        <Link color="textPrimary" href="/dashboard" passHref>
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <DashboardIcon />
                              </ListItemIcon>
                              <ListItemText primary="TravelBlog" />
                            </MenuItem>
                          </a>
                        </Link>
                      )}
                      <Link
                        color="textPrimary"
                        href="/dashboard/publish"
                        passHref
                      >
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <PublishIcon />
                            </ListItemIcon>
                            <ListItemText primary="New Post" />
                          </MenuItem>
                        </a>
                      </Link>
                      <Link color="textPrimary" href="/bookmarks" passHref>
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <ProfileIcon />
                            </ListItemIcon>
                            <ListItemText primary="Bookmarks" />
                          </MenuItem>
                        </a>
                      </Link>
                      <Divider />
                      <div className="d-xl-none d-lg-none d-md-none d-block">
                        <Link color="textPrimary" href="/destinations" passHref>
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <DestinationsIcon />
                              </ListItemIcon>
                              <ListItemText primary="Destinations" />
                            </MenuItem>
                          </a>
                        </Link>
                        <Link color="textPrimary" href="/map" passHref>
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <MapIcon />
                              </ListItemIcon>
                              <ListItemText primary="Map" />
                            </MenuItem>
                          </a>
                        </Link>
                        <Divider />
                      </div>
                      <Link color="textPrimary" href="/about/privacy" passHref>
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <PrivacyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Privacy" />
                          </MenuItem>
                        </a>
                      </Link>
                      <Logout handleLogout={this.handleLogout} />
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Fragment>
      );
    }
    return <Fragment>{me}</Fragment>;
  }
}

HeaderMenu.defaultProps = {
  handleLogout: undefined,
};

HeaderMenu.propTypes = {
  isDashboard: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func,
};

export default HeaderMenu;
