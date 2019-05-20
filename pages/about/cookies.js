import React, { Component, Fragment } from "react";
import Head from "../../components/Head";
import Header from "../../components/Header";
import AboutSelect from "../../components/About/AboutSelect";
import HeaderCard from "../../components/General/HeaderCard";
import { indigo } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Cookies from "../../components/About/Texts/Terms";

class About extends Component {
  render() {
    const title = "Cookies";
    return (
      <Fragment>
        <Header subheader={title} />
        <Head title={`${title} - TravelFeed: The Travel Community`} />
        <AboutSelect selection={3} />
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
              background={indigo[600]}
              content={<Cookies />}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default About;
