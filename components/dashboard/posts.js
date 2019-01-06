import React, { Fragment, Component } from "react";
import Header from "../../components/Header";
import Grid from "@material-ui/core/Grid";
import Helmet from "react-helmet";
import NotFound from "../../components/NotFound";
import { getUser } from "../../utils/token";
import PostGrid from "../../components/PostGrid";

class Posts extends Component {
  state = { user: "" };
  getUser() {
    this.setState({ user: getUser() });
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    var content = <Fragment />;
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
          </Grid>
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
          <PostGrid
            type="blog"
            filter={this.state.user}
            poststyle="list"
            position={0}
          />
        </Grid>
      );
    }
    return (
      <Fragment>
        <Helmet>
          <title>{"My Posts | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Header drawer={true} />
        {content}
      </Fragment>
    );
  }
}

export default Posts;
