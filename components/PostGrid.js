// https://medium.com/@alfianlosari/graphql-cursor-infinite-scroll-pagination-with-react-apollo-client-and-github-api-fafbc510b667
import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { GET_POSTS } from "../helpers/graphql/posts";
import Grid from "@material-ui/core/Grid";
import GridPostCard from "./GridPostCard";
import PostListItem from "./PostListItem";
import PostCommentItem from "./PostCommentItem";
import { imageProxy } from "../helpers/getImage";
import readingTime from "reading-time";
import sanitize from "sanitize-html";
import parseBody from "../helpers/parseBody";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { regExcerpt } from "../utils/regex";
import InfiniteScroll from "react-infinite-scroller";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class PostGrid extends Component {
  state = {
    hasMore: true
  };
  noMore() {
    this.setState({ hasMore: false });
  }
  render() {
    return (
      <Fragment>
        <Query query={GET_POSTS} variables={this.props.query}>
          {({ data, loading, error, fetchMore }) => {
            if (loading) {
              return (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="p-5 text-center">
                    <CircularProgress />
                  </div>
                </Grid>
              );
            }
            if (error || data.post === null) {
              return <Fragment />;
            }
            return (
              <InfiniteScroll
                loadMore={() =>
                  fetchMore({
                    variables: {
                      offset: data.posts ? data.posts.length : 0
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
                {" "}
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justify="center"
                >
                  {data.posts &&
                    data.posts.length > 0 &&
                    data.posts.map((post, index) => {
                      if (post.is_blacklisted) return;
                      const imgHeight = this.props.cardHeight * 2;
                      const htmlBody = parseBody(post.preview, {});
                      const sanitized = sanitize(htmlBody, { allowedTags: [] });
                      const readtime = readingTime(sanitized);
                      const image = imageProxy(post.img_url, "0x" + imgHeight);
                      let title = post.title;
                      title =
                        title.length > 85
                          ? title.substring(0, 81) + "[...]"
                          : title;
                      const tags =
                        post.tags && post.tags.length > 1
                          ? [post.tags[1]]
                          : ["travelfeed"];
                      const excerpt = regExcerpt(sanitized);
                      let card = <Fragment />;
                      if (this.props.poststyle === "list") {
                        card = (
                          <PostListItem
                            post={{
                              author: post.author,
                              body: post.body,
                              display_name: post.display_name,
                              permlink: post.permlink,
                              title: post.title,
                              img_url: post.img_url,
                              created_at: post.created_at,
                              readtime: post.readtime,
                              excerpt: excerpt,
                              votes: post.votes,
                              total_votes: post.total_votes,
                              tags: post.tags,
                              curation_score: post.curation_score,
                              app: post.app,
                              parent_author: post.parent_author,
                              parent_permlink: post.parent_permlink,
                              payout: post.payout,
                              country_code: post.country_code,
                              subdivision: post.subdivision
                            }}
                            id={post.author + "-" + post.permlink}
                            mode="edit"
                          />
                        );
                      } else if (this.props.poststyle === "comment") {
                        card = (
                          <PostCommentItem
                            post={{
                              post_id: post.post_id,
                              body: post.body,
                              created_at: post.created_at,
                              children: post.children,
                              author: post.author,
                              display_name: post.display_name,
                              permlink: post.permlink,
                              depth: post.depth,
                              total_votes: post.total_votes,
                              votes: post.votes,
                              parent_author: post.parent_author,
                              parent_permlink: post.parent_permlink,
                              root_author: post.parent_author,
                              root_permlink: post.root_permlink,
                              root_title: post.root_title,
                              tags: "travelfeed"
                            }}
                            loadreplies={false}
                            title={true}
                          />
                        );
                      } else {
                        card = (
                          <GridPostCard
                            cardHeight={this.props.cardHeight}
                            post={{
                              author: post.author,
                              display_name: post.display_name,
                              permlink: post.permlink,
                              title: title,
                              img_url: image,
                              created_at: post.created_at,
                              readtime: readtime,
                              excerpt: excerpt,
                              votes: post.votes,
                              total_votes: post.total_votes,
                              tags: tags,
                              curation_score: post.curation_score,
                              app: post.app,
                              depth: post.depth,
                              country_code: post.country_code,
                              subdivision: post.subdivision
                            }}
                          />
                        );
                      }
                      return (
                        <Grid
                          item
                          lg={this.props.grid.lg}
                          md={this.props.grid.md}
                          sm={this.props.grid.sm}
                          xs={this.props.grid.xs}
                          key={index}
                        >
                          {card}
                        </Grid>
                      );
                    })}
                  {data.posts &&
                    data.posts.length === 0 &&
                    this.props.poststyle === "grid" && (
                      <Card className="mt-5">
                        <CardContent>No posts found</CardContent>
                      </Card>
                    )}
                </Grid>
              </InfiniteScroll>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}
PostGrid.propTypes = {
  query: PropTypes.object.isRequired,
  cardHeight: PropTypes.number,
  poststyle: PropTypes.string,
  grid: PropTypes.object
};

export default PostGrid;
