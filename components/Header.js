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
import { getUserActive } from "../utils/token";

const styles = () => ({
  root: {
    backgroundColor: teal[800]
  },
  heading: {
    fontWeight: "bold",
    color: grey[200]
  }
});

class Header extends Component {
  state = {
    user: undefined
  };
  handleLogout() {
    this.setState({ user: undefined });
  }
  getUser() {
    this.setState({ user: getUserActive() });
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
            <div className="container-fluid" style={{ height: "65px" }}>
              <div className="row h-100 p-2">
                <div className="my-auto col-xl-4 col-lg-3 col-md-4 col-sm-3 col-9">
                  <Link href="/" passHref>
                    <a style={{ flexGrow: 1 }} className="text-dark">
                      <Typography
                        variant="h6"
                        className={classes.heading}
                        noWrap
                      >
                        <span className="d-none d-sm-block d-xl-none">
                          TravelFeed
                        </span>
                        <span className="d-none d-xl-block">
                          TravelFeed{" "}
                          {this.props.subheader && (
                            <span>{"| " + this.props.subheader}</span>
                          )}
                        </span>
                        <span className="d-block d-xl-none d-sm-none">
                          {(this.props.subheader && (
                            <span>{"TF | " + this.props.subheader}</span>
                          )) ||
                            "TravelFeed"}
                        </span>
                      </Typography>
                    </a>
                  </Link>
                </div>
                <div className="col-xl-2 col-lg-2 d-xl-block d-lg-block d-md-none d-sm-none d-none my-auto text-center">
                  {" "}
                  <DestinationsNav />
                </div>
                <div
                  className={`d-xl-none d-lg-none d-md-block d-sm-none d-none ${(this
                    .state.user &&
                    "col-md-2") ||
                    "col-md-3"} my-auto text-center`}
                >
                  <DestinationsNav isSmall={true} />
                </div>
                <div
                  className={`${(this.state.user &&
                    "col-xl-4 col-lg-5 col-md-4") ||
                    "col-xl-3 col-lg-3 col-md-3"} col-sm-6 d-none d-xl-block d-lg-block d-md-block d-sm-block my-auto text-center`}
                >
                  <GeoCoder />
                </div>
                {!this.state.user && (
                  <div className="my-auto col-xl-2 col-lg-3 d-md-none d-sm-none d-none d-xl-block d-lg-block text-right">
                    <LoginButtons />
                  </div>
                )}
                <div
                  className={`my-auto ${(this.state.user &&
                    "col-xl-2 col-lg-2 col-md-2") ||
                    "col-xl-1 col-lg-1 col-md-2"} col-3 text-right`}
                >
                  <HeaderMenu
                    isDashboard={false}
                    handleLogout={this.handleLogout.bind(this)}
                  />
                </div>
              </div>
            </div>
          </AppBar>
        </div>
      </Fragment>
    );
  }
}

Header.propTypes = {
  subheader: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
