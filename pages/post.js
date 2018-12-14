import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import Layout from "../components/Layout.js";
import { Helmet } from "react-helmet";
import removeMd from "remove-markdown";
import isBlacklisted from "../helpers/isBlacklisted";
import { Client } from "dsteem";
import dateFromJsonString from "../helpers/dateFromJsonString";
import { getHtml } from "../components/busy/Body";
import PropTypes from "prop-types";
const client = new Client("https://api.steemit.com");
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  content: {
    img: {
      background: "black",
      padding: 100,
      width: 100
    }
  },
  media: {
    height: 140
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
    const json = JSON.parse(post.json_metadata);
    const tags = json.tags;
    const json_date = '{ "date": "' + post.created + 'Z" }';
    const date_object = new Date(
      JSON.parse(json_date, dateFromJsonString).date
    );
    const created = date_object.toDateString();
    const image =
      typeof json.image != "undefined" &&
      json.image.length > 0 &&
      json.image[0] !== ""
        ? "https://steemitimages.com/1200x400/" + json.image[0]
        : "https://steemitimages.com/640x640/https://cdn.steemitimages.com/DQmPmEJ5NudyR5Vhh5X36U1qY8FgM5iuaN1Smc5N55cr363/default-header.png"; //todo: try fetching first image from post if no image is defined in json_metadata
    let htmlBody = getHtml(post.body, {}, "text");
    htmlBody = htmlBody
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
          <Layout>
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
            <Grid container spacing={16} alignItems="center" justify="center">
              <Grid item lg={7} md={8} sm={11} xs={12}>
                <Card>
                  <CardMedia
                    style={styles.media}
                    image={this.props.blog.post.image}
                  >
                    <Link
                      as={`/created/${this.props.blog.post.tags[0]}`}
                      href={`/tag?sortby=created&tag=${
                        this.props.blog.post.tags[0]
                      }`}
                    >
                      {this.props.blog.post.tags[0]}
                    </Link>
                    <p>{this.props.blog.post.tags}</p>
                    <p>{this.props.blog.post.created}</p>
                    <Typography gutterBottom variant="h5" component="h2">
                      {this.props.blog.post.title}
                    </Typography>
                  </CardMedia>
                  <CardContent style={styles.content}>
                    <div
                      className="postcontent"
                      dangerouslySetInnerHTML={this.props.blog.post.bodyText}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
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
