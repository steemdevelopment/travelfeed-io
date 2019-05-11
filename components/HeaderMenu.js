import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { getLoginURL } from "../utils/token";
import { getUserActive, logout } from "../utils/token";
import Grow from "@material-ui/core/Grow";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PublishIcon from "@material-ui/icons/Create";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import ProfileIcon from "@material-ui/icons/Person";
import DownIcon from "@material-ui/icons/ArrowDropDown";
import FeedIcon from "@material-ui/icons/Home";
import Divider from "@material-ui/core/Divider";
import MoreVert from "@material-ui/icons/MoreVert";
import MenuIcon from "@material-ui/icons/Menu";
import TermsIcon from "@material-ui/icons/Toc";
import PrivacyIcon from "@material-ui/icons/Lock";
import CookieIcon from "@material-ui/icons/GroupWork";
import LoginIcon from "@material-ui/icons/VpnKey";
import SignUpIcon from "@material-ui/icons/PersonAdd";
import DestinationsIcon from "@material-ui/icons/Explore";
import MapIcon from "@material-ui/icons/Map";
import { grey } from "@material-ui/core/colors";
import PropTypes from "prop-types";

class HeaderMenu extends Component {
  state = {
    user: "",
    menuopen: false
  };
  getUser() {
    this.setState({ user: getUserActive() });
  }
  componentDidMount() {
    this.getUser();
  }
  handleToggle = () => {
    this.setState(state => ({ menuopen: !state.menuopen }));
  };
  handleLogout = () => {
    logout();
    this.setState({ user: null });
  };
  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ menuopen: false });
  };
  render() {
    const { menuopen } = this.state;
    var me = <Fragment />;
    if (this.state.user == null) {
      me = (
        <Fragment>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={menuopen ? "menu-list-grow" : undefined}
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
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <div className="d-xl-none d-lg-none d-md-none d-block">
                        <Link href="/destinations" passHref>
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <DestinationsIcon />
                                <ListItemText inset primary="Destinations" />
                              </ListItemIcon>
                            </MenuItem>
                          </a>
                        </Link>
                        <Link href="/map" passHref>
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <MapIcon />
                                <ListItemText inset primary="Map" />
                              </ListItemIcon>
                            </MenuItem>
                          </a>
                        </Link>
                        <Divider />
                      </div>
                      <div className="d-block d-xl-none d-lg-none">
                        <a href={getLoginURL}>
                          <MenuItem>
                            <ListItemIcon>
                              <LoginIcon />
                              <ListItemText inset primary="Login" />
                            </ListItemIcon>
                          </MenuItem>
                        </a>
                        <Link href="/join" passHref>
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <SignUpIcon />
                                <ListItemText inset primary="Join Now" />
                              </ListItemIcon>
                            </MenuItem>
                          </a>
                        </Link>
                        <Divider />
                      </div>
                      <Link href="/about/privacy" passHref>
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <PrivacyIcon />
                              <ListItemText inset primary="Privacy" />
                            </ListItemIcon>
                          </MenuItem>
                        </a>
                      </Link>
                      <Link href="/about/terms" passHref>
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <TermsIcon />
                              <ListItemText inset primary="Terms" />
                            </ListItemIcon>
                          </MenuItem>
                        </a>
                      </Link>
                      <Link href="/about/cookies" passHref>
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <CookieIcon />
                              <ListItemText inset primary="Cookies" />
                            </ListItemIcon>
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
    if (this.state.user != null && this.state.user != "") {
      me = (
        <Fragment>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={menuopen ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className="p-0s"
          >
            <Avatar
              className="cpointer"
              src={`https://steemitimages.com/u/${
                this.state.user
              }/avatar/small`}
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
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <div className="d-xl-none d-lg-none d-md-none d-block">
                        <Link href="/destinations" passHref>
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <DestinationsIcon />
                                <ListItemText inset primary="Destinations" />
                              </ListItemIcon>
                            </MenuItem>
                          </a>
                        </Link>
                        <Link href="/map" passHref>
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <MapIcon />
                                <ListItemText inset primary="Map" />
                              </ListItemIcon>
                            </MenuItem>
                          </a>
                        </Link>
                        <Divider />
                      </div>
                      {(this.props.isDashboard && (
                        <Link href="/" passHref>
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <FeedIcon />
                                <ListItemText inset primary="TravelFeed" />
                              </ListItemIcon>
                            </MenuItem>
                          </a>
                        </Link>
                      )) || (
                        <Link
                          as="/dashboard/"
                          href="/dashboard?page=dashboard"
                          passHref
                        >
                          <a>
                            <MenuItem>
                              <ListItemIcon>
                                <DashboardIcon />
                                <ListItemText inset primary="TravelBlog" />
                              </ListItemIcon>
                            </MenuItem>
                          </a>
                        </Link>
                      )}
                      <Link
                        as="/dashboard/publish"
                        href="/dashboard/?page=publish"
                        passHref
                      >
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <PublishIcon />
                              <ListItemText inset primary="New Post" />
                            </ListItemIcon>
                          </MenuItem>
                        </a>
                      </Link>
                      <Link href="/bookmarks" passHref>
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <ProfileIcon />
                              <ListItemText inset primary="Bookmarks" />
                            </ListItemIcon>
                          </MenuItem>
                        </a>
                      </Link>
                      <Divider />
                      <Link href="/about/privacy" passHref>
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <PrivacyIcon />
                              <ListItemText inset primary="Privacy" />
                            </ListItemIcon>
                          </MenuItem>
                        </a>
                      </Link>
                      <MenuItem onClick={() => this.handleLogout()}>
                        <ListItemIcon>
                          <LogoutIcon />
                          <ListItemText inset primary="Logout" />
                        </ListItemIcon>
                      </MenuItem>
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

HeaderMenu.propTypes = {
  isDashboard: PropTypes.bool
};

export default HeaderMenu;
