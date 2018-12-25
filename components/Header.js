import React, { Component, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import { getLoginURL } from "../utils/token";
import { getUser } from "../utils/token";

class Header extends Component {
  state = {
    user: null
  };
  componentDidMount() {
    this.setState({ user: getUser() });
  }
  render() {
    var me = (
      <Fragment>
        <Button href="/join" color="primary" variant="outlined">
          Join Now
        </Button>
        <Button href={getLoginURL} color="primary">
          Sign In
        </Button>
      </Fragment>
    );
    if (this.state.user != null) {
      me = (
        <Fragment>
          <Button color="primary" variant="outlined">
            {this.state.user}
          </Button>
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
                        TravelFeed
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
