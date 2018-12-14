import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import Layout from "../components/Layout.js";
import { Helmet } from "react-helmet";
import getImage from "../helpers/getImage";
import removeMd from "remove-markdown";
import isBlacklisted from "../helpers/isBlacklisted";
import { Client } from "dsteem";
import dateFromJsonString from "../helpers/dateFromJsonString";
import { getHtml } from "../components/busy/Body";
import PropTypes from "prop-types";
const client = new Client("https://api.steemit.com");
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  media: {
    height: 250
  }
};

class Post extends Component {
  static async getInitialProps(props) {
    const { author } = props.query;
    const { permlink } = props.query;
    if (isBlacklisted(author, permlink) === true) {
      const blog = {
        post: {
          blacklisted: true
        }
      };
      return { blog };
    }
    const post = await client.call("condenser_api", "get_content", [
      author,
      permlink
    ]);
    const json = JSON.parse(post.json_metadata);
    const tags = json.tags == "undefined" ? json.tags : [""];
    if (
      post.id === 0 ||
      JSON.parse(post.json_metadata).tags.indexOf("travelfeed") > -1 === false
    ) {
      const blog = {
        post: {
          id: 0
        }
      };
      return { blog };
    }
    const json_date = '{ "date": "' + post.created + 'Z" }';
    const date_object = new Date(
      JSON.parse(json_date, dateFromJsonString).date
    );
    const created = date_object.toDateString();
    const image = getImage(post.json_metadata, post.body, "1000x0");
    let htmlBody = getHtml(post.body, {}, "text");
    htmlBody = htmlBody
      .replace(
        /(?:[^"])((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:[^"])/,
        '<img src="$1"><'.replace(
          /((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:(?="))/g,
          "$1"
        )
      )
      .replace(/src="/g, 'src="https://steemitimages.com/1000x0/')
      .replace(/<a/g, '<a rel="nofollow')
      .replace(/https:\/\/steemit.com/g, "");
    const bodyText = { __html: htmlBody };
    let excerpt = removeMd(htmlBody, { useImgAltText: false });
    excerpt = excerpt.substring(0, 143) + ` by ${post.author}`;
    let excerpt_title =
      post.title.length > 100
        ? post.title.substring(0, 96) + "[...]"
        : post.title;
    // todo: Implement canonical URL from condenser
    let canonicalUrl =
      "https://steemit.com/@" + post.author + "/" + post.permlink;
    const blog = {
      post: {
        author: post.author,
        title: post.title,
        tags: tags,
        created: created,
        image: image,
        bodyText: bodyText,
        excerpt: excerpt,
        excerpt_title: excerpt_title,
        canonicalUrl: canonicalUrl
      }
    };
    return { blog };
  }
  render() {
    if (this.props.blog.post.id === 0) {
      return (
        <Fragment>
          <Layout>
            <Grid container spacing={16} alignItems="center" justify="center">
              <Grid item lg={7} md={8} sm={11} xs={12}>
                <Card>
                  <CardContent>
                    <Typography>
                      This post does not exist on TravelFeed yet.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Layout>
        </Fragment>
      );
    } else if (typeof this.props.blog.post.blacklisted !== "undefined") {
      return (
        <Fragment>
          <Layout>
            <Grid container spacing={16} alignItems="center" justify="center">
              <Grid item lg={7} md={8} sm={11} xs={12}>
                <Card>
                  <CardContent>
                    <Typography>
                      This post or author is blacklisted from TravelFeed.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Layout>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Helmet>
            <title>{this.props.blog.post.title + " - TravelFeed"}</title>
            <link rel="canonical" href={this.props.blog.post.canonicalUrl} />
            <meta
              property="description"
              content={this.props.blog.post.excerpt}
            />
            <meta
              property="og:title"
              content={this.props.blog.post.title + " - TravelFeed"}
            />
            <meta property="og:type" content="article" />
            <meta
              property="og:url"
              content={
                "https://travelfeed.io/@" +
                this.props.blog.post.author +
                "/" +
                this.props.blog.post.permlink
              }
            />
            <meta property="og:image" content={this.props.blog.post.image} />
            <meta
              property="og:description"
              content={this.props.blog.post.excerpt}
            />
            <meta property="og:site_name" content="Busy" />
            <meta property="article:tag" content="travel" />
            <meta
              property="article:published_time"
              content={this.props.blog.post.created}
            />
            <meta
              property="twitter:card"
              content={
                this.props.blog.post.image ? "summary_large_image" : "summary"
              }
            />
            <meta property="twitter:site" content={"@travelfeed-io"} />
            <meta
              property="twitter:title"
              content={this.props.blog.post.title + " - TravelFeed"}
            />
            <meta
              property="twitter:description"
              content={this.props.blog.post.excerpt}
            />
            <meta
              property="twitter:image"
              content={this.props.blog.post.image}
            />
          </Helmet>
          <Layout>
            <div>
              <Grid container spacing={16} alignItems="center" justify="center">
                <Grid item lg={7} md={8} sm={11} xs={12}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Link
                          as={`/@${this.props.blog.post.author}`}
                          href={`/blog?author=${this.props.blog.post.author}`}
                        >
                          <Avatar
                            style={{ cursor: "pointer" }}
                            src={`https://steemitimages.com/u/${
                              this.props.blog.post.author
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
                          as={`/@${this.props.blog.post.author}`}
                          href={`/blog?author=${this.props.blog.post.author}`}
                        >
                          {this.props.blog.post.author}
                        </Link>
                      }
                      subheader={this.props.blog.post.created}
                    />
                    <CardMedia
                      style={styles.media}
                      image={this.props.blog.post.image}
                    />
                    <CardContent style={styles.content}>
                      <Link
                        as={`/created/${this.props.blog.post.tags[0]}`}
                        href={`/tag?sortby=created&tag=${
                          this.props.blog.post.tags[0]
                        }`}
                      >
                        <span className="badge badge-dark">
                          {this.props.blog.post.tags}
                        </span>
                      </Link>
                      <Typography gutterBottom variant="h5" component="h2">
                        {this.props.blog.post.title}
                      </Typography>
                      <hr />
                      <div
                        className="postcontent"
                        dangerouslySetInnerHTML={this.props.blog.post.bodyText}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Layout>
        </Fragment>
      );
    }
  }
}
Post.propTypes = {
  blog: PropTypes.object
};

export default withStyles(styles)(Post);
