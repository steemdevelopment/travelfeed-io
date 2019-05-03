import React, { Component, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";
import PropTypes from "prop-types";

class Header extends Component {
  render() {
    var subheader = <Fragment />;
    if (this.props.subheader !== undefined) {
      subheader = <span>{"| " + this.props.subheader}</span>;
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
                        variant="h6"
                        className="font-weight-bold cpointer"
                        noWrap
                      >
                        TravelFeed {subheader}
                      </Typography>
                    </a>
                  </Link>
                  <HeaderMenu isDashboard={false} />
                </Toolbar>
              </Grid>
            </Grid>
          </AppBar>
        </div>
      </Fragment>
    );
  }
}

Header.propTypes = {
  subheader: PropTypes.string
};

export default Header;
