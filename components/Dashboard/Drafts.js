import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { GET_DRAFTS } from "../../helpers/graphql/drafts";
import Grid from "@material-ui/core/Grid";
import readingTime from "reading-time";
import sanitize from "sanitize-html";
import parseBody from "../../helpers/parseBody";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { regExcerpt } from "../../utils/regex";
import InfiniteScroll from "react-infinite-scroller";
import Head from "../Head";
import PostListItem from "../PostListItem";
import { getUser } from "../../utils/token";
import json2Html from "../Editor/json2Html";

class PostGrid extends Component {
  state = {
    hasMore: true
  };
  noMore() {
    this.setState({ hasMore: false });
  }
  render() {
    const user = getUser();
    return (
      <Fragment>
        <Head title="Drafts" />
        <div className="text-center pt-4">
          <h1>Drafts</h1>
        </div>
        <Query query={GET_DRAFTS} variables={{ limit: 10 }}>
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
            if (error || data.drafts === null) {
              return <Fragment />;
            }
            return (
              <InfiniteScroll
                loadMore={() =>
                  fetchMore({
                    variables: {
                      offset: data.drafts.length
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (fetchMoreResult.drafts.length === 0) {
                        this.noMore();
                      }
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        drafts: [...prev.drafts, ...fetchMoreResult.drafts]
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
                  {data.drafts.length > 0 &&
                    data.drafts.map(draft => {
                      const htmlBody = draft.isCodeEditor
                        ? parseBody(draft.body, {})
                        : json2Html(JSON.parse(draft.body));
                      const sanitized = sanitize(htmlBody, { allowedTags: [] });
                      const readtime = readingTime(sanitized);
                      const excerpt = regExcerpt(sanitized);
                      return (
                        <Grid item lg={6} md={9} sm={12} xs={12} key={draft.id}>
                          <PostListItem
                            post={{
                              author: user,
                              body: draft.body,
                              display_name: user,
                              title: draft.title,
                              json: draft.json,
                              created_at: draft.savedate,
                              readtime: readtime,
                              excerpt: excerpt
                            }}
                            id={draft.id}
                            mode="draft"
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
