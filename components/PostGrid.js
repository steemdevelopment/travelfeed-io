import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import PropTypes from "prop-types";
import sanitize from "sanitize-html";
import { getHtml } from "../components/busy/Body";
import { Client } from "dsteem";
import getImage from "../helpers/getImage";
import isBlacklisted from "../helpers/isBlacklisted";
import Link from "next/link";
import readingTime from "reading-time";
import dateFromJsonString from "../helpers/dateFromJsonString";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BookmarkIconBorder from "@material-ui/icons/BookmarkBorder";
import IconButton from "@material-ui/core/IconButton";
import FlightIcon from "@material-ui/icons/FlightTakeoff";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardHeader from "@material-ui/core/CardHeader";

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
      selector = (
        <Fragment>
          <Typography
            variant="display1"
            align="center"
            gutterBottom={true}
            className="pt-5"
          >
            {this.state.sortby.replace(/^\w/, c => c.toUpperCase())} Posts
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
                Created
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
            let htmlBody = getHtml(post.body, {}, "text");
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
              const replaceex = /[^\sa-zA-Z0-9(?)(')(`)(,)(\-)(’)(#)(!)(´)(:)(()())(\])([)]+/g;
              let excerpt = sanitized
                .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
                .replace(replaceex, "")
                .substring(0, 250);
              let title = post.title.replace(replaceex, "");
              title =
                title.length > 85 ? title.substring(0, 81) + "[...]" : title;
              const posttag =
                typeof json.tags != "undefined" && json.tags.length > 0
                  ? json.tags[1]
                  : "";
              const json_date = '{ "date": "' + post.created + 'Z" }';
              const date_object = new Date(
                JSON.parse(json_date, dateFromJsonString).date
              );
              const created = date_object.toDateString();
              const image = getImage(post.json_metadata, post.body, "400x0");
              //todo: try fetching first image from post if no image is defined in json_metadata
              let totalmiles = 0;
              //Proposal for voting system: Each user can give between 0.1 and 10 "miles", each 0.1 mile equals a 1% upvote.
              for (let vote = 0; vote < post.active_votes.length; vote++) {
                totalmiles += Math.round(
                  post.active_votes[vote].percent / 1000
                );
              }
              ++count;
              processed.push(post.permlink);
              return (
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Card key={post.permlink} className="m-2">
                    <CardHeader
                      avatar={
                        <Link
                          as={`/@${post.author}`}
                          href={`/blog?author=${post.author}`}
                          passHref
                        >
                          <a>
                            <Avatar
                              style={{ cursor: "pointer" }}
                              src={`https://steemitimages.com/u/${
                                post.author
                              }/avatar/small`}
                            />
                          </a>
                        </Link>
                      }
                      action={
                        <IconButton>
                          <BookmarkIconBorder />
                        </IconButton>
                      }
                      title={
                        <Link
                          as={`/@${post.author}`}
                          href={`/blog?author=${post.author}`}
                          passHref
                        >
                          <a className="text-dark">{post.author}</a>
                        </Link>
                      }
                      subheader={created + " | " + readtime.text}
                    />
                    <CardActionArea>
                      <CardMedia
                        style={{ height: 140 }}
                        className="pt-2 text-right"
                        image={image}
                      />
                      <Link
                        as={`/@${post.author}/${post.permlink}`}
                        href={`/post?author=${post.author}&permlink=${
                          post.permlink
                        }`}
                        passHref
                      >
                        <a>
                          {" "}
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {title}
                            </Typography>
                            <Typography component="p">
                              {excerpt} [...]
                            </Typography>
                          </CardContent>
                        </a>
                      </Link>
                    </CardActionArea>
                    <CardActions>
                      <div className="container">
                        <div className="row">
                          <div className="col-6 p-0">
                            <IconButton aria-label="Upvote">
                              <FlightIcon className="mr" />
                            </IconButton>
                            <span className="text-muted font-weight-bold">
                              {totalmiles}
                            </span>
                          </div>
                          <div className="col-6 pt-2 p-0 text-right">
                            <Link
                              as={`/created/${posttag}`}
                              href={`/tag?sortby=created&tag=${posttag}`}
                              passHref
                            >
                              <a>
                                {" "}
                                <span
                                  className="badge badge-secondary p-1 pl-2 pr-2 rounded cpointer small"
                                  style={{ fontSize: "0.6rem" }}
                                >
                                  {posttag.toUpperCase()}
                                </span>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
              );
            }
          })}
          {!error && <Typography>{error}</Typography>}
          {isLoading && (
            <Grid item xs={1}>
              <CircularProgress />
            </Grid>
          )}
          {!hasMore && <Typography>That is all :)</Typography>}
        </Grid>
      </Fragment>
    );
  }
}
PostGrid.defaultProps = {
  stream: [{}],
  sortby: "featured",
  position: 25
};

PostGrid.propTypes = {
  type: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  sortby: PropTypes.string,
  stream: PropTypes.array,
  position: PropTypes.number
};

export default PostGrid;
