// https://sysgears.com/articles/how-to-implement-infinite-scroll-with-graphql-and-react/
import React, { Component } from "react";
import PropTypes from "prop-types";
import isBlacklisted from "../helpers/isBlacklisted";
import PostCommentItem from "./PostCommentItem";
import { commentQuery } from "../helpers/graphql/comments";
import { Query } from "react-apollo";

const handleScroll = ({ currentTarget }, onLoadMore) => {
  if (
    currentTarget.scrollTop + currentTarget.clientHeight >=
    currentTarget.scrollHeight
  ) {
    onLoadMore();
  }
};

const Comments = ({ posts, onLoadMore }) => (
  <div
    onScroll={e => handleScroll(e, onLoadMore)}
    style={{
      maxHeight: "800px",
      overflow: "auto"
    }}
  >
    {posts.map(
      ({ post_id, author, body, created_at, children, permlink, depth }) => {
        if (
          isBlacklisted(author, "none", {
            commentblacklist: true
          }) === false
        ) {
          return (
            <PostCommentItem
              key={permlink}
              post={{
                post_id: post_id,
                body: body,
                created_at: created_at,
                children: children,
                author: author,
                permlink: permlink,
                depth: depth,
                parent_author: "test",
                parent_permlink: "test",
                root_title: "testtitle"
              }}
            />
          );
        }
      }
    )}
  </div>
);

class CommentsQuery extends Component {
  // componentDidMount() {
  //   window.onscroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop ===
  //       document.documentElement.scrollHeight
  //     ) {
  //       console.log("scrolling...");
  //     }
  //   };
  // }
  render() {
    return (
      <Query
        query={commentQuery}
        variables={{ parent_id: this.props.parent_id }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading) {
            return "Loading..";
          }
          if (error) {
            return "Error :(";
          }
          return (
            <Comments
              posts={data.posts || []}
              onLoadMore={() =>
                fetchMore({
                  variables: {
                    offset: data.posts.length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      posts: [...prev.posts, ...fetchMoreResult.posts]
                    });
                  }
                })
              }
            />
          );
        }}
      </Query>
    );
  }
}

class PostComments extends Component {
  //   state = {
  //     author: this.props.author,
  //     permlink: this.props.permlink,
  //     error: false,
  //     hasMore: true,
  //     isLoading: false,
  //     stream: []
  //   };
  //   streamComments = async () => {
  //     this.setState({
  //       isLoading: true
  //     });
  //     try {
  //       const stream = await client.database.call("get_content_replies", [
  //         this.state.author,
  //         this.state.permlink
  //       ]);
  //       this.setState({
  //         stream: stream,
  //         isLoading: false,
  //         hasMore: false
  //       });
  //     } catch (err) {
  //       this.setState({
  //         error: err.message,
  //         isLoading: false
  //       });
  //     }
  //   };
  render() {
    return <CommentsQuery parent_id={this.props.post_id} />;
  }
}

export default PostComments;
