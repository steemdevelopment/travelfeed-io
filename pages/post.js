import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import Layout from "../components/Layout.js";
import isBlacklisted from "../helpers/isBlacklisted";
import { Client } from "dsteem";
import dateFromJsonString from "../helpers/dateFromJsonString";
import marked from "marked";
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
    const bodymd = marked(post.body, { sanitize: true });
    // Todo: Render like condenser https://github.com/steemit/condenser/blob/master/src/app/components/cards/MarkdownViewer.jsx
    const bodyreg = bodymd
      .replace(/src="/g, 'src="https://steemitimages.com/1000x0/')
      .replace(/<a/g, '<a rel="nofollow');
    let body = { __html: bodyreg };
    const blog = {
      post: {
        title: post.title,
        tags: tags,
        created: created,
        image: image,
        body: body
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
                      dangerouslySetInnerHTML={this.props.blog.post.body}
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
