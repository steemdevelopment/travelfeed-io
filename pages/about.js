import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const About = () => (
  <Fragment>
    <Typography variant="h6">Abouts</Typography>
    <Button variant="contained" color="primary">
      Read more
    </Button>
  </Fragment>
);

export default About;
