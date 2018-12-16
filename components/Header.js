import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";

const Header = () => (
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
              <Button color="primary" variant="outlined">
                Join Now
              </Button>
              <Button color="primary">Sign In</Button>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  </Fragment>
);

export default Header;
