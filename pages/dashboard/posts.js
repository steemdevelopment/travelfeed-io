import React, { Fragment, Component } from "react";
import Header from "../../components/Header";
import Grid from "@material-ui/core/Grid";
import Helmet from "react-helmet";
import PostGrid from "../../components/PostGrid";
import { getUser } from "../../utils/token";

class Posts extends Component {
  state = { user: undefined };
  componentDidMount() {
    this.setState({ user: getUser() });
  }
  render() {
    var postlist = <Fragment />;
    if (this.state.user != undefined) {
      postlist = (
        <PostGrid type="blog" filter={this.state.user} postsyle="list" />
      );
    }
    return (
      <Fragment>
        <Helmet>
          <title>{"Posts | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Header drawer={true} />
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
          style={{ paddingLeft: "75px" }}
        >
          {postlist}
        </Grid>
      </Fragment>
    );
  }
}

export default Posts;
