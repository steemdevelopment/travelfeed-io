import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Client } from "dsteem";
import PostCommentItem from "../PostCommentItem";
import CircularProgress from "@material-ui/core/CircularProgress";

const client = new Client("https://api.steemit.com");

class Replies extends Component {
  state = {
    stream: null
  };
  streamReplies = async () => {
    const stream = await client.call("tags_api", "get_replies_by_last_update", [
      this.props.user,
      "",
      100
    ]);
    this.setState({
      stream: stream
    });
  };
  componentDidMount() {
    this.streamReplies();
  }
  render() {
    var content = (
      <Grid item lg={8} md={10} sm={11} xs={12}>
        <div className="p-5 text-center">
          <CircularProgress />
        </div>
      </Grid>
    );
    if (this.state.stream != null) {
      content = this.state.stream.map(post => {
        return (
          <Grid item lg={8} md={10} sm={11} xs={12} key={post.id}>
            <PostCommentItem post={post} loadreplies={false} title={true} />
          </Grid>
        );
      });
    }
    return (
      <Fragment>
        <Helmet>
          <title>{"Replies | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          <Grid item lg={8} md={10} sm={11} xs={12}>
            <div className="text-center">
              <h1>Replies to you</h1>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="p-3"
        >
          {content}
        </Grid>
      </Fragment>
    );
  }
}

Replies.propTypes = {
  user: PropTypes.string.isRequired
};

export default Replies;
