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
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PostsIcon from "@material-ui/icons/ChromeReaderMode";
import DraftIcon from "@material-ui/icons/Cloud";
import BookmarkIcon from "@material-ui/icons/Star";
import WalletIcon from "@material-ui/icons/AttachMoney";
import SettingsIcon from "@material-ui/icons/Settings";
import PublishIcon from "@material-ui/icons/Create";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import ProfileIcon from "@material-ui/icons/Person";
import RepliesIcon from "@material-ui/icons/Reply";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CommentsIcon from "@material-ui/icons/Comment";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: 200,
    width: `calc(100% - ${200}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: 200,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: 200,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class Header extends Component {
  state = {
    user: "",
    menuopen: false,
    open: false
  };
  getUser() {
    this.setState({ user: getUser() });
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
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    var subheader = <Fragment />;
    if (this.props.subheader !== undefined) {
      subheader = <span>{"| " + this.props.subheader}</span>;
    }
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
                      <Link href="/dashboard/publish" passHref>
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <PublishIcon />
                              <ListItemText inset primary="New Post" />
                            </ListItemIcon>
                          </MenuItem>
                        </a>
                      </Link>
                      <Link href={"/@" + this.state.user} passHref>
                        <a>
                          <MenuItem>
                            <ListItemIcon>
                              <ProfileIcon />
                              <ListItemText inset primary="Profile" />
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
    var appbar = (
      <AppBar position="fixed" color="inherit">
        <Grid container spacing={16} alignItems="center" justify="center">
          <Grid item lg={9} md={10} sm={12} xs={12}>
            <Toolbar>
              <Link href="/" passHref>
                <a style={{ flexGrow: 1 }} className="text-dark">
                  <Typography
                    variant="h6"
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
    );
    var drawer = <Fragment />;
    if (this.props.drawer !== undefined) {
      appbar = (
        <AppBar
          color="inherit"
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" passHref>
              <a style={{ flexGrow: 1 }} className="text-dark">
                <Typography
                  variant="h6"
                  className="font-weight-bold cpointer"
                  noWrap
                >
                  TravelFeed | Dashboard
                </Typography>
              </a>
            </Link>
            {me}
          </Toolbar>
        </AppBar>
      );
      drawer = (
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link href="/dashboard" passHref>
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </a>
            </Link>
            <Link href="/dashboard/publish" passHref>
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <PublishIcon />
                  </ListItemIcon>
                  <ListItemText primary="Publish" />
                </ListItem>
              </a>
            </Link>
            <Link href="/dashboard/drafts" passHref>
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <DraftIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItem>
              </a>
            </Link>
            <Link href="/dashboard/posts" passHref>
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <PostsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Posts" />
                </ListItem>
              </a>
            </Link>
            <Link href="/dashboard/comments" passHref>
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <CommentsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Comments" />
                </ListItem>
              </a>
            </Link>
            <Link href="/dashboard/replies" passHref>
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <RepliesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Replies" />
                </ListItem>
              </a>
            </Link>
            <Link href="/dashboard/notifications" passHref>
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Notifications" />
                </ListItem>
              </a>
            </Link>
          </List>
          <Divider />
          <List>
            <Link href="/dashboard/bookmarks" passHref>
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bookmarks" />
                </ListItem>
              </a>
            </Link>
            <Link href="/dashboard/profile" passHref>
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <ProfileIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
              </a>
            </Link>
            <Link href="/dashboard/wallet" passHref>
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <WalletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Wallet" />
                </ListItem>
              </a>
            </Link>
            <Link href="/dashboard/settings" passHref>
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </a>
            </Link>
          </List>
        </Drawer>
      );
    }
    return (
      <Fragment>
        <div style={{ flexGrow: 1 }}>{appbar}</div>
        {drawer}
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
