import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import Helmet from "react-helmet";
import getImage from "../helpers/getImage";
import isBlacklisted from "../helpers/isBlacklisted";
import { client } from "../helpers/client";
import PostAuthorProfile from "../components/PostAuthorProfile";
import PostMap from "../components/PostMap";
import dateFromJsonString from "../helpers/dateFromJsonString";
import PostComments from "../components/PostComments";
import sanitize from "sanitize-html";
import readingTime from "reading-time";
import FollowButton from "../components/FollowButton";
import parseBody from "../helpers/parseBody";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import BookmarkIconBorder from "@material-ui/icons/BookmarkBorder";
import VoteSlider from "../components/VoteSlider";
import Header from "../components/Header";
import NotFound from "../components/NotFound";
import InvalidPost from "../components/InvalidPost";
import { extractSWM } from "../utils/regex";
import AppIcon from "../components/AppIcon";
import Router from "next/router";

class Post extends Component {
  static async getInitialProps(props) {
    const { author } = props.query;
    const { permlink } = props.query;
    var post = await client.call("condenser_api", "get_content", [
      author,
      permlink
    ]);
    return { post };
  }
  componentDidMount() {
    if (this.props.post.depth > 0) {
      Router.replace(
        `/@${this.props.post.root_author}/${this.props.post.root_permlink}/#${
          this.props.post.permlink
        }`
      );
    }
  }
  render() {
    const post = this.props.post;
    if (post.id === 0) {
      return (
        <Fragment>
          <Header />
          <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
            className="pt-4 pb-4"
          >
            <Grid item lg={7} md={8} sm={11} xs={12}>
              <NotFound statusCode={404} />
            </Grid>
          </Grid>
        </Fragment>
      );
    }
    let htmlBody = parseBody(post.body, {});
    let sanitized = sanitize(htmlBody, { allowedTags: [] });
    const readtime = readingTime(sanitized);
    const url = "https://steemit.com/@" + post.author + "/" + post.permlink;
    if (
      (post.author != "travelfeed" && readtime.words < 250) ||
      isBlacklisted(post.author, post.permlink, {}) === true ||
      (post.category != "travelfeed" &&
        JSON.parse(post.json_metadata).tags.indexOf("travelfeed") > -1 ===
          false) ||
      JSON.parse(post.json_metadata).tags.indexOf("nsfw") > -1 === true
    ) {
      return <InvalidPost url={url} />;
    }
    const json = JSON.parse(post.json_metadata);
    const tags = json.tags != "undefined" ? json.tags : [""];
    const json_date = '{ "date": "' + post.created + 'Z" }';
    const date_object = new Date(
      JSON.parse(json_date, dateFromJsonString).date
    );
    const created = date_object.toDateString();
    const image = getImage(post.json_metadata, post.body, "1000x0");
    const bodyText = { __html: htmlBody };
    // Set the canonical URL to steemit.com by default to avoid duplicate content SEO problems
    let canonicalUrl =
      "https://steemit.com/travelfeed/@" + post.author + "/" + post.permlink;
    const app = json.app != "undefined" ? json.app.split("/")[0] : "";
    // Set the caninical URL to travelfeed.io if the post was authored through the dApp
    if (app == "travelfeed") {
      canonicalUrl =
        "https://travelfeed.io/@" + post.author + "/" + post.permlink;
    }
    let excerpt = sanitized.substring(0, 143) + `[...] by ${post.author}`;
    const swm = extractSWM(post.body);
    var lat = 0.0;
    var long = 0.0;
    if (swm != null && swm.length > 2) {
      lat = swm[1];
      long = swm[2];
    }
    const location = {
      coordinates: { lat: parseFloat(lat), lng: parseFloat(long) }
    };
    const author = post.author;
    return (
      <Fragment>
        <Helmet>
          <title>{post.title + " - " + author + "'s Blog on TravelFeed"}</title>
          <link rel="canonical" href={canonicalUrl} />
          <meta property="description" content={excerpt} />
          <meta property="og:title" content={post.title + " - TravelFeed"} />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={"https://travelfeed.io/@" + author + "/" + post.permlink}
          />
          <meta property="og:image" content={image} />
          <meta property="og:description" content={excerpt} />
          <meta
            property="twitter:card"
            content={image ? "summary_large_image" : "summary"}
          />
          <meta
            property="twitter:title"
            content={post.title + " - TravelFeed"}
          />
          <meta property="twitter:description" content={excerpt} />
          <meta property="twitter:image" content={image} />
        </Helmet>
        <Fragment>
          <Header subheader={author} />
          <Grid
            container
            spacing={0}
            className="pt-4"
            alignItems="center"
            justify="center"
          >
            <Grid item lg={7} md={8} sm={11} xs={12} className="pb-4">
              <Card>
                <CardHeader
                  avatar={
                    <Link
                      as={`/@${author}`}
                      href={`/blog?author=${author}`}
                      passHref
                      prefetch
                    >
                      <a>
                        <Avatar
                          className="cpointer"
                          src={`https://steemitimages.com/u/${author}/avatar/small`}
                        />
                      </a>
                    </Link>
                  }
                  action={
                    <Fragment>
                      <IconButton>
                        <BookmarkIconBorder />
                      </IconButton>
                      <AppIcon post={this.props.post} />
                    </Fragment>
                  }
                  title={
                    <Fragment>
                      <Link
                        as={`/@${author}`}
                        href={`/blog?author=${author}`}
                        passHref
                      >
                        <a className="text-dark cpointer">{author}</a>
                      </Link>
                      <FollowButton author={author} btnstyle="minimal" />
                    </Fragment>
                  }
                  subheader={created + " | " + readtime.text}
                />
                <CardContent>
                  <Typography
                    variant="h4"
                    className="text-dark font-weight-bold"
                  >
                    {post.title}
                  </Typography>
                  <hr />
                  <div
                    className="postcontent"
                    dangerouslySetInnerHTML={bodyText}
                  />
                  <hr />
                  <div className="fullwidth">
                    <PostMap location={location} />
                  </div>
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-6 col-md-9 col-sm12">
                        <PostAuthorProfile author={author} />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <VoteSlider post={post} tags={tags} mode="post" />
              </Card>
            </Grid>
            <Grid item lg={6} md={7} sm={10} xs={11} className="pb-2">
              <PostComments author={author} permlink={post.permlink} />
            </Grid>
          </Grid>
        </Fragment>
      </Fragment>
    );
  }
}
Post.propTypes = {
  post: PropTypes.object
};

export default Post;
