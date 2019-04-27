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
          <Link href="/join" passHref>
            <a>
              <Button color="primary" variant="outlined">
                Join Now
              </Button>
            </a>
          </Link>
          <a href={getLoginURL}>
            <Button color="primary">Sign In</Button>
          </a>
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
          >
            <Avatar
              className="cpointer"
              src={`https://steemitimages.com/u/${
                this.state.user
              }/avatar/small`}
            />
            <DownIcon />
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
                      <Link href="/dashboard" passHref>
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <DashboardIcon />
                              <ListItemText inset primary="Dashboard" />
                            </ListItemIcon>
                          </MenuItem>
                        </a>
                      </Link>
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
                      <Link
                        as="/dashboard/posts"
                        href="/dashboard/?page=posts"
                        passHref
                      >
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <ProfileIcon />
                              <ListItemText inset primary="My Posts" />
                            </ListItemIcon>
                          </MenuItem>
                        </a>
                      </Link>
                      <a>
                        <MenuItem onClick={() => this.handleLogout()}>
                          <ListItemIcon>
                            <LogoutIcon />
                            <ListItemText inset primary="Logout" />
                          </ListItemIcon>
                        </MenuItem>
                      </a>
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

export default HeaderMenu;
