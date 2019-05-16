import React, { Component, Fragment } from "react";
import Head from "../../components/Head";
import Header from "../../components/Header";
import DashboardHeader from "../../components/Header/DashboardHeader";
import Grid from "@material-ui/core/Grid";
import NotFound from "../../components/NotFound";
import { getUser } from "../../utils/token";
import Stats from "../../components/Dashboard/Stats";

class StatsPage extends Component {
  render() {
    if (getUser() === null) {
      return (
        <Fragment>
          <Header />
          <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
            className="pt-4 pb-4"
            style={{ paddingLeft: "75px" }}
          >
            <Grid item lg={7} md={8} sm={11} xs={12}>
              <NotFound statusCode="logged_out" />
            </Grid>
          </Grid>
        </Fragment>
      );
    }
    if (!getUser()) {
      return <Fragment />;
    }
    return (
      <Fragment>
        <Head title={`TravelBlog: Stats - TravelFeed: The Travel Community`} />
        <div style={{ display: "flex" }}>
          <DashboardHeader active="stats" />
          <main style={{ flexGrow: 1 }}>
            <Stats />
          </main>
        </div>
      </Fragment>
    );
  }
}

export default StatsPage;
