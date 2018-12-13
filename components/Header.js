import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

const Header = () => (
  <Fragment>
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit" noWrap>
          TravelFeed
        </Typography>
        <Link href="/">
          <Button>Home</Button>
        </Link>
        <Link href="/blog">
          <Button>Blog</Button>
        </Link>
        <Link href="/about">
          <Button>About</Button>
        </Link>
        <Button color="primary" variant="outlined">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  </Fragment>
);

export default Header;
