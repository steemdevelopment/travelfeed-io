import React, { Fragment } from "react";
import Layout from "../components/Layout.js";
import Button from "@material-ui/core/Button";

const About = () => (
  <Fragment>
    <Layout>
      <p>Abouts</p>
      <Button variant="contained" color="primary">
        Read more
      </Button>
    </Layout>
  </Fragment>
);

export default About;
