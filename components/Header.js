import React, { Component, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";
import PropTypes from "prop-types";
import GeoCoder from "./Header/Geocoder";
import { withStyles } from "@material-ui/core/styles";
import { grey, teal } from "@material-ui/core/colors";
import LoginButtons from "./Header/LoginButtons";
import DestinationsNav from "./Header/DestinationsNav";
import DownIcon from "@material-ui/icons/ArrowDropDown";
import { getUserActive } from "../utils/token";
import DestinationsIcon from "@material-ui/icons/Explore";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    backgroundColor: teal[800]
  },
  heading: {
    fontWeight: "bold",
    color: grey[200]
  },
  whitebutton: {
    color: grey[200]
  }
});

class Header extends Component {
  state = {
    user: undefined,
    showDest: false
  };
  getUser() {
    this.setState({ user: getUserActive() });
  }
  toggleDest() {
    this.setState(state => ({ showDest: !state.showDest }));
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div style={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="secondary" className={classes.root}>
            <div
              className="d-xl-block d-lg-block d-md-block d-none container-fluid"
              style={{ height: "65px" }}
            >
              <div className="row h-100 p-2">
                <div className="my-auto col-xl-4 col-lg-3 col-md-4">
                  <Link href="/" passHref>
                    <a style={{ flexGrow: 1 }} className="text-dark">
                      <Typography
                        variant="h6"
                        className={classes.heading}
                        noWrap
                      >
                        <span className="d-none d-xl-block">
                          TravelFeed{" "}
                          {this.props.subheader && (
                            <span>{"| " + this.props.subheader}</span>
                          )}
                        </span>
                        <span className="d-block d-xl-none">
                          {(this.props.subheader && (
                            <span>{"TF | " + this.props.subheader}</span>
                          )) ||
                            "TravelFeed"}
                        </span>
                      </Typography>
                    </a>
                  </Link>
                </div>
                <div className="col-xl-2 col-lg-2 d-xl-block d-lg-block d-md-none my-auto text-center">
                  <Button
                    color="default"
                    className={classes.whitebutton}
                    onClick={() => this.toggleDest()}
                  >
                    Destinations <DownIcon />
                  </Button>
                </div>
                <div
                  className={`d-xl-none d-lg-none d-md-block ${(this.state
                    .user &&
                    "col-md-2") ||
                    "col-md-3"} my-auto text-center`}
                >
                  <IconButton
                    className="text-light p-2"
                    onClick={() => this.toggleDest()}
                  >
                    <DestinationsIcon />
                  </IconButton>
                </div>
                <div
                  className={`${(this.state.user &&
                    "col-xl-4 col-lg-5 col-md-4") ||
                    "col-xl-3 col-lg-3 col-md-3"} my-auto text-center`}
                >
                  <GeoCoder />
                </div>
                {!this.state.user && (
                  <div className="my-auto col-xl-2 col-lg-3 d-md-none d-xl-block d-lg-block text-right">
                    <LoginButtons />
                  </div>
                )}
                <div
                  className={`my-auto ${(this.state.user && "col-2") ||
                    "col-xl-1 col-lg-1 col-md-2"} text-right`}
                >
                  <HeaderMenu isDashboard={false} />
                </div>
              </div>
            </div>
            <div
              className="d-xl-none d-lg-none d-md-none d-sm-block d-xs-block container-fluid"
              style={{ height: "55px" }}
            >
              <div className="row p-1 h-100">
                <div className="d-none d-sm-block col-3 my-auto">
                  <Link href="/" passHref>
                    <a style={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        className={classes.heading}
                        noWrap
                      >
                        TravelFeed
                      </Typography>
                    </a>
                  </Link>
                </div>
                <div className="d-none d-sm-block col-6 w-100 my-auto">
                  <div className="text-center">
                    <GeoCoder />
                  </div>
                </div>
                <div className="d-block d-sm-none d-md-none col-9 my-auto">
                  <Link href="/" passHref>
                    <a style={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        className={classes.heading}
                        noWrap
                      >
                        TravelFeed{" "}
                        {this.props.subheader && (
                          <span>{"| " + this.props.subheader}</span>
                        )}
                      </Typography>
                    </a>
                  </Link>
                </div>
                <div className="col-3 my-auto text-right">
                  <HeaderMenu isDashboard={false} />
                </div>
              </div>
            </div>
          </AppBar>
        </div>
        {this.state.showDest && (
          <DestinationsNav onClose={this.toggleDest.bind(this)} />
        )}
        <div className="mobilespacer" />
      </Fragment>
    );
  }
}

Header.propTypes = {
  subheader: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
