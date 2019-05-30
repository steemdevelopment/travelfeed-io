import { teal } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import React, { Component, Fragment } from "react";
import AboutSelect from "../../components/About/AboutSelect";
import Privacy from "../../components/About/Texts/Terms";
import HeaderCard from "../../components/General/HeaderCard";
import Head from "../../components/Header/Head";
import Header from "../../components/Header/Header";

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
          <Grid item lg={7} md={8} sm={11} xs={12} className="pt-3">
            <HeaderCard
              title="Opt Out of Matomo Analytics"
              background={teal[600]}
              content={
                <div>
                  <iframe
                    style={{ border: 0, height: "100%", width: "100%" }}
                    src="https://matomo.travelfeed.io/index.php?module=CoreAdminHome&action=optOut&language=en&backgroundColor=ffffff&fontColor=212121&fontSize=1.2rem&fontFamily=Roboto"
                  />
                </div>
              }
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default About;
