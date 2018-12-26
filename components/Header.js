import React, { Component, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import { getLoginURL } from "../utils/token";
import { getUser, logout } from "../utils/token";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

class Header extends Component {
  state = {
    user: null,
    open: false
  };
  getUser() {
    this.setState({ user: getUser() });
  }
  componentDidMount() {
    this.getUser();
  }
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };
  handleLogout = () => {
    logout();
    this.setState({ user: null });
  };
  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };
  render() {
    var subheader = <Fragment />;
    if (this.props.subheader !== undefined) {
      subheader = <span>{"| " + this.props.subheader}</span>;
    }
    const { open } = this.state;
    var me = (
      <Fragment>
        <Link href="/join" passHref>
          <Button color="primary" variant="outlined">
            Join Now
          </Button>
        </Link>
        <Link href={getLoginURL} passHref>
          <Button color="primary">Sign In</Button>
        </Link>
      </Fragment>
    );
    if (this.state.user != null) {
      me = (
        <Fragment>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            {this.state.user}
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
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
                        <MenuItem>Dashboard</MenuItem>
                      </Link>
                      <Link href={"/@" + this.state.user} passHref>
                        <MenuItem>Profile</MenuItem>
                      </Link>
                      <MenuItem onClick={() => this.handleLogout()}>
                        Logout
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
    return (
      <Fragment>
        <div style={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="inherit">
            <Grid container spacing={16} alignItems="center" justify="center">
              <Grid item lg={9} md={10} sm={12} xs={12}>
                <Toolbar>
                  <Link href="/" passHref>
                    <a style={{ flexGrow: 1 }} className="text-dark">
                      <Typography
                        variant="headline"
                        className="font-weight-bold cpointer"
                        noWrap
                      >
                        TravelFeed {subheader}
                      </Typography>
                    </a>
                  </Link>
                  {me}
                </Toolbar>
              </Grid>
            </Grid>
          </AppBar>
        </div>
      </Fragment>
    );
  }
}

export default Header;
