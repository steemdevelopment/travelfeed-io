// https://sysgears.com/articles/how-to-implement-infinite-scroll-with-graphql-and-react/
import React, { Component, Fragment } from "react";
import PostCommentItem from "./PostCommentItem";
import { commentQuery } from "../helpers/graphql/comments";
import { Query } from "react-apollo";
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

class PostComments extends Component {
  state = {
    hasMore: true
  };
  noMore() {
    this.setState({ hasMore: false });
  }
  render() {
    return (
      <Query
        query={commentQuery}
        variables={{ parent_id: this.props.post_id, orderby: "total_votes" }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading || error || data.post === null) {
            return <Fragment />;
          }
          return (
            <InfiniteScroll
              loadMore={() =>
                fetchMore({
                  variables: {
                    offset: data.posts.length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (fetchMoreResult.posts.length === 0) {
                      this.noMore();
                    }
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      posts: [...prev.posts, ...fetchMoreResult.posts]
                    });
                  }
                })
              }
              hasMore={this.state.hasMore}
              threshold={1000}
              loader={
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="p-5 text-center">
                    <CircularProgress />
                  </div>
                </Grid>
              }
            >
              {data.posts.map(
                ({
                  post_id,
                  author,
                  display_name,
                  body,
                  created_at,
                  children,
                  permlink,
                  depth,
                  total_votes,
                  votes
                }) => (
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="pb-2"
                    key={permlink}
                  >
                    <PostCommentItem
                      post={{
                        post_id: post_id,
                        body: body,
                        created_at: created_at,
                        children: children,
                        author: author,
                        display_name: display_name,
                        permlink: permlink,
                        depth: depth,
                        total_votes: total_votes,
                        votes: votes,
                        parent_author: "test",
                        parent_permlink: "test",
                        root_title: "testtitle"
                      }}
                    />
                  </Grid>
                )
              )}
            </InfiniteScroll>
          );
        }}
      </Query>
    );
  }
}

PostComments.propTypes = {
  post_id: PropTypes.number
};

export default PostComments;
