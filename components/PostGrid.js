import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import PropTypes from "prop-types";
import sanitize from "sanitize-html";
import parseBody from "../helpers/parseBody";
import { Client } from "dsteem";
import isBlacklisted from "../helpers/isBlacklisted";
import Link from "next/link";
import readingTime from "reading-time";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridPostCard from "./GridPostCard";
import PostListItem from "./PostListItem";

const client = new Client("https://api.steemit.com");

class PostGrid extends Component {
  state = {
    type: this.props.type,
    filter: this.props.filter,
    sortby: this.props.sortby,
    error: false,
    hasMore: true,
    isLoading: false,
    position: this.props.position,
    lastauthor: "",
    lastpermlink: "",
    selector: "",
    stream: this.props.stream
  };
  streamBlog = async () => {
    this.setState({
      isLoading: true
    });
    let lastpermlink = this.state.lastpermlink;
    let lastauthor = this.state.lastauthor;
    var filtertype = "blog";
    if (this.state.type == "tag") {
      filtertype = this.state.sortby;
    }
    if (lastpermlink == "") {
      var tagargs = { tag: this.state.filter, limit: 25 };
      const tagstream = await client.database.getDiscussions(
        filtertype,
        tagargs
      );
      try {
        lastpermlink =
          tagstream.length > 0 ? tagstream[tagstream.length - 1].permlink : "";
        lastauthor =
          tagstream.length > 0 ? tagstream[tagstream.length - 1].author : "";
      } catch (err) {
        this.setState({
          error: err.message,
          isLoading: false
        });
      }
    }
    var args = {
      tag: this.state.filter,
      limit: 100,
      start_author: lastauthor,
      start_permlink: lastpermlink
    };
    if (this.state.type == "curationfeed") {
      args = {
        tag: this.state.filter,
        limit: 25,
        start_author: lastauthor,
        start_permlink: lastpermlink
      };
    } else if (this.state.type == "tag") {
      args = {
        tag: this.state.filter,
        limit: 100,
        start_author: lastauthor,
        start_permlink: lastpermlink
      };
    }
    if (this.state.position == 0) {
      args = {
        tag: this.state.filter,
        limit: 24
      };
      this.setState({ position: 1 });
    }
    const stream = await client.database.getDiscussions(filtertype, args);
    lastpermlink = stream.length > 0 ? stream[stream.length - 1].permlink : "";
    lastauthor = stream.length > 0 ? stream[stream.length - 1].author : "";
    delete stream[stream.length - 1];
    try {
      if (stream.length == 0) {
        this.setState({
          hasMore: false,
          isLoading: false
        });
      }
      const loadposts = this.state.stream.concat(stream);
      this.setState({
        lastpermlink: lastpermlink,
        lastauthor: lastauthor,
        stream: loadposts,
        isLoading: false,
        hasMore: true
      });
    } catch (err) {
      this.setState({
        error: err.message,
        isLoading: false
      });
    }
  };
  async setSort(sortby) {
    if (sortby == "featured") {
      await this.setState({
        sortby: sortby,
        position: 0,
        stream: [],
        type: "curationfeed"
      });
    } else {
      await this.setState({
        sortby: sortby,
        position: 0,
        stream: [],
        type: "tag"
      });
    }
    window.history.pushState("", "", `/${sortby}/${this.state.filter}/`);
    this.streamBlog();
  }
  componentDidMount() {
    if (this.state.type == "tag") {
      this.setState({ selector: "tag" });
    }
    if (this.state.type == "curationfeed") {
      this.setState({ selector: "curationfeed" });
    }
    this.streamBlog();
    window.onscroll = () => {
      const {
        streamBlog,
        state: { error, isLoading, hasMore }
      } = this;
      if (error || isLoading || !hasMore) return;
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.scrollHeight
      ) {
        streamBlog();
      }
    };
  }
  render() {
    let count = 0;
    const { error, hasMore, isLoading } = this.state;
    let processed = [];
    var selector = "";
    var featured_variant =
      this.state.sortby != "featured" ? "outlined" : "contained";
    var created_variant =
      this.state.sortby != "created" ? "outlined" : "contained";
    var hot_variant = this.state.sortby != "hot" ? "outlined" : "contained";
    var trending_variant =
      this.state.sortby != "trending" ? "outlined" : "contained";
    if (this.state.selector == "curationfeed") {
      let heading = "Feed";
      if (this.state.sortby == "featured") {
        heading = "Editor's Choice";
      }
      if (this.state.sortby == "created") {
        heading = "New Posts";
      }
      if (this.state.sortby == "hot") {
        heading = "Taking Off";
      }
      if (this.state.sortby == "trending") {
        heading = "Above the Clouds";
      }
      selector = (
        <Fragment>
          <Typography
            variant="h4"
            align="center"
            gutterBottom={true}
            className="pt-5"
          >
            {heading}
          </Typography>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="pb-4 text-center">
              <Button
                variant={featured_variant}
                color="primary"
                className="m-2"
                onClick={() => this.setSort("featured")}
              >
                Featured
              </Button>
              <Button
                variant={created_variant}
                color="primary"
                className="m-2"
                onClick={() => this.setSort("created")}
              >
                New
              </Button>
              <Button
                variant={hot_variant}
                color="primary"
                className="m-2"
                onClick={() => this.setSort("hot")}
              >
                Hot
              </Button>
              <Button
                variant={trending_variant}
                color="primary"
                className="m-2"
                onClick={() => this.setSort("trending")}
              >
                Trending
              </Button>
            </div>
          </Grid>
        </Fragment>
      );
    } else if (this.state.selector == "tag") {
      selector = (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <div className="pb-4 text-center">
            <Link as={`/created/${this.state.filter}`}>
              <Button
                variant={created_variant}
                color="primary"
                className="m-2"
                onClick={() => this.setSort("created")}
              >
                Created
              </Button>
            </Link>
            <Link as={`/hot/${this.state.filter}`}>
              <Button
                variant={hot_variant}
                color="primary"
                className="m-2"
                onClick={() => this.setSort("hot")}
              >
                Hot
              </Button>
            </Link>
            <Link as={`/trending/${this.state.filter}`}>
              <Button
                variant={trending_variant}
                color="primary"
                className="m-2"
                onClick={() => this.setSort("trending")}
              >
                Trending
              </Button>
            </Link>
          </div>
        </Grid>
      );
    }
    return (
      <Fragment>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="p-3"
        >
          {selector}
          {this.state.stream.map(post => {
            const json = JSON.parse(post.json_metadata);
            let htmlBody = parseBody(post.body);
            let sanitized = sanitize(htmlBody, { allowedTags: [] });
            const readtime = readingTime(sanitized);
            // Filter out:
            // - Filter out duplicates. This does not work for some reason..
            // - Limit initial fetch to 7 posts
            // - Exclude resteems
            if (
              ((processed.indexOf(post.permlink) > -1 === false && count < 8) ||
                this.state.stream.length > 24) &&
              (this.state.type == "tag" ||
                (this.state.type == "curationfeed" &&
                  post.author != this.state.filter) ||
                (this.state.type == "blog" &&
                  post.author == this.state.filter)) &&
              isBlacklisted(post.author, post.permlink) === false &&
              readtime.words > 250 &&
              json.tags.indexOf("travelfeed") > -1 === true &&
              json.tags.indexOf("nsfw") > -1 === false
            ) {
              //todo: try fetching first image from post if no image is defined in json_metadata
              ++count;
              processed.push(post.permlink);
              if (this.props.poststyle == "list") {
                return (
                  <PostListItem
                    post={post}
                    sanitized={sanitized}
                    readtime={readtime}
                  />
                );
              } else {
                return (
                  <Grid item lg={3} md={4} sm={6} xs={12}>
                    <GridPostCard
                      post={post}
                      sanitized={sanitized}
                      readtime={readtime}
                    />
                  </Grid>
                );
              }
            }
          })}
          {!error && <Typography>{error}</Typography>}
          {isLoading && (
            <div className="p-5">
              <Grid item xs={1}>
                <div className="p-5">
                  <CircularProgress />
                </div>
              </Grid>
            </div>
          )}
          {!hasMore && <Typography>That is all :)</Typography>}
        </Grid>
      </Fragment>
    );
  }
}
PostGrid.defaultProps = {
  stream: [],
  sortby: "featured",
  position: 25
};

PostGrid.propTypes = {
  type: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  sortby: PropTypes.string,
  stream: PropTypes.array,
  position: PropTypes.number,
  poststyle: PropTypes.string
};

export default PostGrid;
