import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { GET_BOOKMARKS } from "../../helpers/graphql/bookmarks";
import Grid from "@material-ui/core/Grid";
import GridPostCard from "../GridPostCard";
import { imageProxy } from "../../helpers/getImage";
import readingTime from "reading-time";
import sanitize from "sanitize-html";
import parseBody from "../../helpers/parseBody";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { regExcerpt, regTitle } from "../../utils/regex";
import InfiniteScroll from "react-infinite-scroller";
import Head from "../Head";

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
        <Head title="Bookmarks" />
        <Query query={GET_BOOKMARKS} variables={{ limit: 10 }}>
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
            if (error || data.bookmarks === null) {
              return <Fragment />;
            }
            return (
              <InfiniteScroll
                loadMore={() =>
                  fetchMore({
                    variables: {
                      offset: data.bookmarks.length
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (fetchMoreResult.bookmarks.length === 0) {
                        this.noMore();
                      }
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        bookmarks: [
                          ...prev.bookmarks,
                          ...fetchMoreResult.bookmarks
                        ]
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
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justify="center"
                  className="p-3"
                >
                  {data.bookmarks.length > 0 &&
                    data.bookmarks.map(post => {
                      const imgHeight = 600;
                      const htmlBody = parseBody(post.body, {});
                      const sanitized = sanitize(htmlBody, { allowedTags: [] });
                      const readtime = readingTime(sanitized);
                      const image = imageProxy(post.img_url, "0x" + imgHeight);
                      let title = regTitle(post.title);
                      title =
                        title.length > 85
                          ? title.substring(0, 81) + "[...]"
                          : title;
                      const tags =
                        post.tags && post.tags.length > 1
                          ? [post.tags[1]]
                          : ["travelfeed"];
                      const excerpt = regExcerpt(sanitized);
                      return (
                        <Grid
                          item
                          lg={4}
                          md={6}
                          sm={12}
                          xs={12}
                          key={post.permlink}
                        >
                          <GridPostCard
                            author={post.author}
                            display_name={post.display_name}
                            permlink={post.permlink}
                            title={title}
                            img_url={image}
                            created_at={post.created_at}
                            readtime={readtime}
                            excerpt={excerpt}
                            votes={post.votes}
                            total_votes={post.total_votes}
                            tags={tags}
                            curation_score={post.curation_score}
                            app={post.app}
                            depth={post.depth}
                            cardHeight={250}
                            isBookmark={true}
                          />
                        </Grid>
                      );
                    })}
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
  query: PropTypes.array.isRequired
};

export default PostGrid;
