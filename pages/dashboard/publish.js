import React, { Fragment, Component } from "react";
import Header from "../../components/Header";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import NotFound from "../../components/NotFound";
import { getUser } from "../../utils/token";
import PostEditor from "../../components/PostEditor";

class Bookmarks extends Component {
  state = {
    user: "",
    readtime: { words: 0, text: "0 min read" },
    location: ""
  };
  getUser() {
    this.setState({ user: getUser() });
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    var content = (
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        className="pt-4 pb-4"
        style={{ paddingLeft: "75px" }}
      >
        <Grid item lg={7} md={8} sm={11} xs={12}>
          <Card>
            <CardContent />
          </Card>
        </Grid>{" "}
      </Grid>
    );
    if (this.state.user == null) {
      content = (
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
          </Grid>{" "}
        </Grid>
      );
    } else if (this.state.user != null && this.state.user != "") {
      content = (
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
          style={{ paddingLeft: "75px" }}
        >
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <Card>
              <CardContent>
                <PostEditor initialValue="<p>You can select text to format it. Add a new paragraph to add images, media, maps, tables or dividers. Happy blogging, we can't wait to hear your travel story!</p>" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    }
    return (
      <Fragment>
        <Helmet>
          <title>{"Bookmarks | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Header drawer={true} />
        {content}
      </Fragment>
    );
  }
}

export default Bookmarks;
