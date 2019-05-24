import React, { Component, Fragment } from "react";
import Head from "../../components/Head";
import Header from "../../components/Header";
import DashboardHeader from "../../components/Header/DashboardHeader";
import Grid from "@material-ui/core/Grid";
import NotFound from "../../components/NotFound";
import { getUser } from "../../utils/token";
import dynamic from "next/dynamic";

class PublishPage extends Component {
  static async getInitialProps(props) {
    const { id, savedate, title, body, json, isCodeEditor } = props.query;
    return {
      edit: {
        id,
        savedate,
        title,
        body,
        json,
        isCodeEditor
      }
    };
  }
  render() {
    if (getUser() === null || !getUser()) {
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
    const Publish = dynamic(
      () => import("../../components/Dashboard/Publish"),
      {
        ssr: false
      }
    );
    return (
      <Fragment>
        <Head
          title={`TravelBlog: Publish - TravelFeed: The Travel Community`}
        />
        <div style={{ display: "flex" }}>
          <DashboardHeader active="publish" />
          <main style={{ flexGrow: 1 }}>
            <Publish edit={this.props.edit} />
          </main>
        </div>
      </Fragment>
    );
  }
}

export default PublishPage;
