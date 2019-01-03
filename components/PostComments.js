import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import PropTypes from "prop-types";
import { Client } from "dsteem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import "@babel/polyfill";
import isBlacklisted from "../helpers/isBlacklisted";
import PostCommentItem from "./PostCommentItem";

const client = new Client("https://api.steemit.com");

class PostComments extends Component {
  state = {
    author: this.props.author,
    permlink: this.props.permlink,
    error: false,
    hasMore: true,
    isLoading: false,
    stream: []
  };
  streamComments = async () => {
    this.setState({
      isLoading: true
    });
    try {
      const stream = await client.database.call("get_content_replies", [
        this.state.author,
        this.state.permlink
      ]);
      this.setState({
        stream: stream,
        isLoading: false,
        hasMore: false
      });
    } catch (err) {
      this.setState({
        error: err.message,
        isLoading: false
      });
    }
  };
  componentDidMount() {
    window.onscroll = () => {
      const {
        streamComments,
        state: { error, isLoading, hasMore }
      } = this;
      if (error || isLoading || !hasMore) return;
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.scrollHeight
      ) {
        streamComments();
      }
    };
  }
  render() {
    const { error, isLoading } = this.state;
    // todo: Add support for comments with children
    return (
      <Fragment>
        {this.state.stream.map(comment => {
          if (
            isBlacklisted(comment.author, "none", { commentblacklist: true }) !=
            true
          ) {
            return <PostCommentItem post={comment} />;
          }
        })}
        {!error && <Typography>{error}</Typography>}
        {isLoading && (
          <Grid item xs={1}>
            <CircularProgress />
          </Grid>
        )}
      </Fragment>
    );
  }
}
PostComments.propTypes = {
  author: PropTypes.string,
  permlink: PropTypes.string
};

export default PostComments;
