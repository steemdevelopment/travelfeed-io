import React, { Component, Fragment } from "react";
import Head from "../../components/Head";
import Header from "../../components/Header";
import AboutSelect from "../../components/About/AboutSelect";
import HeaderCard from "../../components/General/HeaderCard";
import { teal } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Privacy from "../../components/About/Texts/Terms";

class About extends Component {
  render() {
    const title = "Privacy";
    return (
      <Fragment>
        <Header subheader={title} />
        <Head title={`${title} - TravelFeed: The Travel Community`} />
        <AboutSelect selection={2} />
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <HeaderCard
              title={title}
              background={teal[600]}
              content={<Privacy />}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default About;
