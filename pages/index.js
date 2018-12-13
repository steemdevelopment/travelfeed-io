import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import PropTypes from "prop-types";
import Layout from "../components/Layout.js";
import { Client } from "dsteem";
import Link from "next/link";
import removeMd from "remove-markdown";
import dateFromJsonString from "../helpers/dateFromJsonString";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Avatar from "@material-ui/core/Avatar";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import red from "@material-ui/core/colors/red";
import Router from "next/router";

const client = new Client("https://api.steemit.com");

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "black"
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
      const tagargs = { tag: "travelfeed", limit: 51 };
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
      limit: 50,
      start_author: lastauthor,
      start_permlink: lastpermlink
    };
    const stream = await client.database.getDiscussions("blog", args);
    lastpermlink = stream.length > 0 ? stream[stream.length - 1].permlink : "";
    try {
      if (stream.length == 0) {
        this.setState({
          hasMore: false,
          isLoading: false
        });
      }
      lastauthor = stream.length > 0 ? stream[stream.length - 1].author : "";
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
    const args = { tag: "travelfeed", limit: 55 };
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
                  const image =
                    json.image[0] !== ""
                      ? "https://steemitimages.com/600x400/" + json.image[0]
                      : "https://steemitimages.com/640x640/https://cdn.steemitimages.com/DQmPmEJ5NudyR5Vhh5X36U1qY8FgM5iuaN1Smc5N55cr363/default-header.png";
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
                              <StarBorderIcon style={styles.title} />
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
          <Typography variant="display1" align="center" gutterBottom={true}>
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
                  restream.length > 50) &&
                post.author !== "travelfeed"
              ) {
                let excerpt = post.body;
                excerpt = removeMd(excerpt, { useImgAltText: false });
                excerpt = excerpt.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
                excerpt = excerpt.replace(
                  /[^\sa-zA-Z0-9(?)(')(`)(’)(#)(!)(´)(-)(()())(\])([)]+/g,
                  ""
                );
                excerpt = excerpt.substring(0, 250);
                let title = post.title.replace(
                  /[^\sa-zA-Z0-9(?)(')(`)(’)(-)(#)(!)(´)(()())(\])([)]+/g,
                  ""
                );
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
                const image =
                  typeof json.image != "undefined" &&
                  json.image.length > 0 &&
                  json.image[0] !== ""
                    ? "https://steemitimages.com/600x400/" + json.image[0]
                    : "https://steemitimages.com/640x640/https://cdn.steemitimages.com/DQmPmEJ5NudyR5Vhh5X36U1qY8FgM5iuaN1Smc5N55cr363/default-header.png";
                //todo: try fetching first image from post if no image is defined in json_metadata
                ++count;
                processed.push(post.permlink);
                return (
                  <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Card key={post.permlink + count} style={styles.card}>
                      <CardHeader
                        avatar={
                          <Avatar
                            src={`https://steemitimages.com/u/${
                              post.author
                            }/avatar/small`}
                          />
                        }
                        action={
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={post.author}
                        subheader={created}
                      />
                      <CardActionArea>
                        <CardMedia style={styles.media} image={image}>
                          <Link
                            as={`/created/${posttag}`}
                            href={`/tag?sortby=created&&tag=${posttag}`}
                          >
                            {posttag}
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
                          <FavoriteIcon />
                        </IconButton>
                        <Typography noWrap>
                          {post.active_votes.length}
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
