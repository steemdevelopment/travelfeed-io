import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import PropTypes from "prop-types";
import Layout from "../components/Layout.js";
import sanitize from "sanitize-html";
import { getHtml } from "../components/busy/Body";
import { Client } from "dsteem";
import getImage from "../helpers/getImage";
import isBlacklisted from "../helpers/isBlacklisted";
import Link from "next/link";
import readingTime from "reading-time";
import dateFromJsonString from "../helpers/dateFromJsonString";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FlightIcon from "@material-ui/icons/FlightTakeoff";
import CommentIcon from "@material-ui/icons/Comment";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Avatar from "@material-ui/core/Avatar";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Router from "next/router";

const client = new Client("https://api.steemit.com");

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: "white"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  card: {},
  media: {
    height: 140
  }
};

class Index extends Component {
  state = {
    error: false,
    hasMore: true,
    isLoading: false,
    snackbar: true,
    lastauthor: "",
    lastpermlink: "",
    loadposts: []
  };
  streamBlog = async () => {
    this.setState({
      isLoading: true
    });
    let lastpermlink = this.state.lastpermlink;
    let lastauthor = this.state.lastauthor;
    if (lastpermlink === "") {
      const tagargs = { tag: "travelfeed", limit: 31 };
      const tagstream = await client.database.getDiscussions("blog", tagargs);
      try {
        lastpermlink =
          tagstream.length > 0 ? tagstream[tagstream.length - 1].permlink : "";
        lastauthor =
          tagstream.length > 0 ? tagstream[tagstream.length - 1].author : "";
      } catch (err) {
        this.setState({
          error: err.message,
          snackbar: true,
          isLoading: false
        });
      }
    }
    const args = {
      tag: "travelfeed",
      limit: 20,
      start_author: lastauthor,
      start_permlink: lastpermlink
    };
    const stream = await client.database.getDiscussions("blog", args);
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
      const loadposts = this.state.loadposts.concat(stream);
      this.setState({
        lastpermlink: lastpermlink,
        lastauthor: lastauthor,
        loadposts: loadposts,
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
  componentDidMount() {
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
  static async getInitialProps() {
    const args = { tag: "travelfeed", limit: 30 };
    const stream = await client.database.getDiscussions("blog", args);
    return { stream };
  }
  render() {
    let count = 0;
    const restream = this.props.stream.concat(this.state.loadposts);
    const { error, hasMore, isLoading } = this.state;
    let processed = [];
    return (
      <Fragment>
        <Layout>
          <div style={styles.root}>
            <GridList style={styles.gridList} cols={2.5}>
              {this.props.stream.map(post => {
                const json = JSON.parse(post.json_metadata);
                if (
                  post.author === "travelfeed" &&
                  json.tags.indexOf("travelfeeddaily") > -1 === true
                ) {
                  const image = getImage(
                    post.json_metadata,
                    post.body,
                    "600x400"
                  );
                  return (
                    <GridListTile key={post.permlink}>
                      <img
                        src={image}
                        onClick={() =>
                          Router.push(`/@${post.author}/${post.permlink}`)
                        }
                        style={{ cursor: "pointer" }}
                      />
                      <Link
                        as={`/@${post.author}/${post.permlink}`}
                        href={`/post?author=${post.author}&permlink=${
                          post.permlink
                        }`}
                      >
                        <GridListTileBar
                          title={post.title}
                          styles={{
                            root: styles.titleBar,
                            title: styles.title
                          }}
                          actionIcon={
                            <IconButton>
                              <FlightIcon style={styles.title} />
                            </IconButton>
                          }
                        />
                      </Link>
                    </GridListTile>
                  );
                }
              })}
            </GridList>
          </div>
          <Typography
            variant="display1"
            align="center"
            gutterBottom={true}
            className="p-5"
          >
            Featured Posts
          </Typography>
          <Grid container spacing={16} alignItems="center" justify="center">
            {restream.map(post => {
              const json = JSON.parse(post.json_metadata);
              // Filter out:
              // - Filter out duplicates. This does not work for some reason..
              // - Limit initial fetch to 7 posts
              // - Exclude resteems
              if (
                ((processed.indexOf(post.permlink) > -1 === false &&
                  count < 8) ||
                  restream.length > 30) &&
                post.author !== "travelfeed" &&
                isBlacklisted(post.author, post.permlink) === false
              ) {
                let htmlBody = getHtml(post.body, {}, "text");
                let sanitized = sanitize(htmlBody, { allowedTags: [] });
                let excerpt = sanitized
                  .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
                  .replace(
                    /[^\sa-zA-Z0-9(?)(')(`)(’)(#)(!)(´)(-)(()())(\])([)]+/g,
                    ""
                  )
                  .substring(0, 250);
                let title = post.title.replace(
                  /[^\sa-zA-Z0-9(?)(')(`)(’)(-)(#)(!)(´)(()())(\])([)]+/g,
                  ""
                );
                title =
                  title.length > 85 ? title.substring(0, 81) + "[...]" : title;
                const readtime = readingTime(sanitized);
                const posttag =
                  typeof json.tags != "undefined" && json.tags.length > 0
                    ? json.tags[1]
                    : "";
                const json_date = '{ "date": "' + post.created + 'Z" }';
                const date_object = new Date(
                  JSON.parse(json_date, dateFromJsonString).date
                );
                const created = date_object.toDateString();
                const image =
                  typeof json.image != "undefined" &&
                  json.image.length > 0 &&
                  json.image[0] !== ""
                    ? "https://steemitimages.com/600x400/" + json.image[0]
                    : "https://steemitimages.com/640x640/https://cdn.steemitimages.com/DQmPmEJ5NudyR5Vhh5X36U1qY8FgM5iuaN1Smc5N55cr363/default-header.png";
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
                    <Card key={post.permlink} style={styles.card}>
                      <CardHeader
                        avatar={
                          <Link
                            as={`/@${post.author}`}
                            href={`/blog?author=${post.author}`}
                          >
                            <Avatar
                              style={{ cursor: "pointer" }}
                              src={`https://steemitimages.com/u/${
                                post.author
                              }/avatar/small`}
                            />
                          </Link>
                        }
                        action={
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={
                          <Link
                            as={`/@${post.author}`}
                            href={`/blog?author=${post.author}`}
                          >
                            {post.author}
                          </Link>
                        }
                        subheader={created + " | " + readtime.text}
                      />
                      <CardActionArea>
                        <CardMedia
                          style={styles.media}
                          className="pt-2 text-right"
                          image={image}
                        >
                          <Link
                            as={`/created/${posttag}`}
                            href={`/tag?sortby=created&tag=${posttag}`}
                          >
                            <span className="bg-dark text-white-50 p-1 rounded-left">
                              {posttag}
                            </span>
                          </Link>
                        </CardMedia>
                        <Link
                          as={`/@${post.author}/${post.permlink}`}
                          href={`/post?author=${post.author}&permlink=${
                            post.permlink
                          }`}
                        >
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
                        </Link>
                      </CardActionArea>
                      <CardActions>
                        <IconButton aria-label="Upvote">
                          <FlightIcon className="mr" />
                        </IconButton>
                        <Typography noWrap className="text-muted">
                          {totalmiles}
                        </Typography>
                        <IconButton aria-label="Upvote">
                          <CommentIcon className="mr" />
                        </IconButton>
                        <Typography noWrap className="text-muted">
                          {post.replies.length}
                        </Typography>
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
        </Layout>
      </Fragment>
    );
  }
}

Index.propTypes = {
  stream: PropTypes.array
};

export default withStyles(styles)(Index);
