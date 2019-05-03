import React, { Component, Fragment } from "react";
import Bookmarks from "../components/Bookmarks";
import Head from "../components/Head";
import Header from "../components/Header";
import { getUser } from "../utils/token";
import NotFound from "../components/NotFound";
import Grid from "@material-ui/core/Grid";

class BookmarksPage extends Component {
  state = {
    user: undefined
  };
  componentDidMount() {
    this.setState({ user: getUser() });
  }
  render() {
    return (
      <Fragment>
        <Header subheader="Bookmarks" />
        <Head title={`Bookmarks - TravelFeed: The Travel Community`} />
        {(!this.state.user && (
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
        )) || <Bookmarks user={this.state.user} />}
      </Fragment>
    );
  }
}

export default BookmarksPage;
