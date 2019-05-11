import React, { Fragment, Component } from "react";
import Header from "../components/Header";
import Grid from "@material-ui/core/Grid";
import NotFound from "../components/NotFound";
import { getUser } from "../utils/token";
import Link from "next/link";
import Stats from "../components/Dashboard/Stats";
import Comments from "../components/Dashboard/Comments";
import Drafts from "../components/Dashboard/Drafts";
import Notifications from "../components/Dashboard/Notifications";
import Posts from "../components/Dashboard/Posts";
import Profile from "../components/Dashboard/Profile";
import Publish from "../components/Dashboard/Publish";
import Replies from "../components/Dashboard/Replies";
import Settings from "../components/Dashboard/Settings";
import Wallet from "../components/Dashboard/Wallet";
import HeaderMenu from "../components/HeaderMenu";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PostsIcon from "@material-ui/icons/ChromeReaderMode";
import DraftIcon from "@material-ui/icons/FileCopy";
import WalletIcon from "@material-ui/icons/AttachMoney";
import SettingsIcon from "@material-ui/icons/Settings";
import PublishIcon from "@material-ui/icons/Create";
import ProfileIcon from "@material-ui/icons/Person";
import RepliesIcon from "@material-ui/icons/Reply";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CommentsIcon from "@material-ui/icons/Comment";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { blueGrey } from "@material-ui/core/colors";

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: "flex"
  },
  paper: {
    background: blueGrey[50]
  },
  appBar: {
    zIndex: 201,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
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
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 200, //smaller zIndex than default in order to display editor tooltips over drawer
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
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
    flexGrow: 1
  }
});
class Dashboard extends Component {
  state = { user: "", open: true, active: "" };
  static async getInitialProps(props) {
    const { page } = props.query;
    return { page };
  }
  handleLogout() {
    this.setState({ user: "" });
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  getUser() {
    this.setState({ user: getUser() });
  }
  setActive = item => {
    this.setState({ active: item });
  };
  componentDidMount() {
    this.getUser();
    if (window.innerWidth < 750) {
      this.setState({ open: false });
    }
  }
  render() {
    const { classes } = this.props;
    if (this.state.user == "") {
      return (
        <Fragment>
          <Header />
        </Fragment>
      );
    }
    if (this.state.user == null) {
      return (
        <Fragment>
          <Header />
          <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
            className="pt-4 pb-4"
            style={{ paddingLeft: "75px" }}
          >
            <Grid item lg={7} md={8} sm={11} xs={12}>
              <NotFound statusCode="logged_out" />
            </Grid>
          </Grid>
        </Fragment>
      );
    }
    const appbar = (
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
                TravelBlog |{" "}
                {// capitalize
                this.state.active.charAt(0).toUpperCase() +
                  this.state.active.slice(1)}
              </Typography>
            </a>
          </Link>
          <HeaderMenu
            isDashboard={true}
            handleLogout={this.handleLogout.bind(this)}
          />
        </Toolbar>
      </AppBar>
    );
    const drawer = (
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: this.state.open,
          [classes.drawerClose]: !this.state.open
        })}
        classes={{
          paper: classNames(classes.paper, {
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
          <Link as="/dashboard" href="/dashboard?page=dashboard" passHref>
            <a>
              <ListItem
                selected={this.state.active == "dashboard" ? true : false}
                button
              >
                <ListItemIcon className={classNames(classes.listitem)}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </a>
          </Link>
          <Link as="/dashboard/publish" href="/dashboard?page=publish" passHref>
            <a>
              <ListItem
                selected={this.state.active == "publish" ? true : false}
                button
              >
                <ListItemIcon>
                  <PublishIcon />
                </ListItemIcon>
                <ListItemText primary="Publish" />
              </ListItem>
            </a>
          </Link>
          <Link as="/dashboard/drafts" href="/dashboard?page=drafts" passHref>
            <a>
              <ListItem
                selected={this.state.active == "drafts" ? true : false}
                button
              >
                <ListItemIcon>
                  <DraftIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItem>
            </a>
          </Link>
          <Link as="/dashboard/posts" href="/dashboard?page=posts" passHref>
            <a>
              <ListItem
                selected={this.state.active == "posts" ? true : false}
                button
              >
                <ListItemIcon>
                  <PostsIcon />
                </ListItemIcon>
                <ListItemText primary="Posts" />
              </ListItem>
            </a>
          </Link>
          <Link
            as="/dashboard/comments"
            href="/dashboard?page=comments"
            passHref
          >
            <a>
              <ListItem
                selected={this.state.active == "comments" ? true : false}
                button
              >
                <ListItemIcon>
                  <CommentsIcon />
                </ListItemIcon>
                <ListItemText primary="Comments" />
              </ListItem>
            </a>
          </Link>
          <Link as="/dashboard/replies" href="/dashboard?page=replies" passHref>
            <a>
              <ListItem
                selected={this.state.active == "replies" ? true : false}
                button
              >
                <ListItemIcon>
                  <RepliesIcon />
                </ListItemIcon>
                <ListItemText primary="Replies" />
              </ListItem>
            </a>
          </Link>
          <Link
            as="/dashboard/notifications"
            href="/dashboard?page=notifications"
            passHref
          >
            <a>
              <ListItem
                selected={this.state.active == "notifications" ? true : false}
                button
              >
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
          <Link as="/dashboard/profile" href="/dashboard?page=profile" passHref>
            <a>
              <ListItem
                selected={this.state.active == "profile" ? true : false}
                button
              >
                <ListItemIcon>
                  <ProfileIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </a>
          </Link>
          <Link as="/dashboard/wallet" href="/dashboard?page=wallet" passHref>
            <a>
              <ListItem
                selected={this.state.active == "wallet" ? true : false}
                button
              >
                <ListItemIcon>
                  <WalletIcon />
                </ListItemIcon>
                <ListItemText primary="Wallet" />
              </ListItem>
            </a>
          </Link>
          <Link
            as="/dashboard/settings"
            href="/dashboard?page=settings"
            passHref
          >
            <a>
              <ListItem
                selected={this.state.active == "settings" ? true : false}
                button
              >
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
    if (this.props.page == "publish") {
      var content = <Publish />;
      {
        if (this.state.active != "publish") {
          this.setActive("publish");
        }
      }
    } else if (this.props.page == "drafts") {
      content = <Drafts />;
      {
        if (this.state.active != "drafts") {
          this.setActive("drafts");
        }
      }
    } else if (this.props.page == "posts") {
      content = <Posts user={this.state.user} />;
      {
        if (this.state.active != "posts") {
          this.setActive("posts");
        }
      }
    } else if (this.props.page == "comments") {
      content = <Comments user={this.state.user} />;
      {
        if (this.state.active != "comments") {
          this.setActive("comments");
        }
      }
    } else if (this.props.page == "replies") {
      content = <Replies user={this.state.user} />;
      {
        if (this.state.active != "replies") {
          this.setActive("replies");
        }
      }
    } else if (this.props.page == "notifications") {
      content = <Notifications user={this.state.user} />;
      {
        if (this.state.active != "notifications") {
          this.setActive("notifications");
        }
      }
    } else if (this.props.page == "profile") {
      content = <Profile user={this.state.user} />;
      {
        if (this.state.active != "profile") {
          this.setActive("profile");
        }
      }
    } else if (this.props.page == "wallet") {
      content = <Wallet />;
      {
        if (this.state.active != "wallet") {
          this.setActive("wallet");
        }
      }
    } else if (this.props.page == "settings") {
      content = <Settings />;
      {
        if (this.state.active != "settings") {
          this.setActive("settings");
        }
      }
    } else {
      content = <Stats user={this.state.user} />;
      {
        if (this.state.active != "dashboard") {
          this.setActive("dashboard");
        }
      }
    }
    return (
      <div className={classes.root}>
        {appbar}
        {drawer}
        <main className={classes.content}>{content}</main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object,
  page: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(Dashboard);
