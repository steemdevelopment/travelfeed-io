import React, { Fragment } from "react";
import Layout from "../components/Layout.js";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const About = () => (
  <Fragment>
    <Layout>
      <Typography variant="h6">Abouts</Typography>
      <Button variant="contained" color="primary">
        Read more
      </Button>
    </Layout>
  </Fragment>
);

export default About;
