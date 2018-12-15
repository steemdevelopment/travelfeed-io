import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import Layout from "../components/Layout.js";
import { Helmet } from "react-helmet";
import getImage from "../helpers/getImage";
import isBlacklisted from "../helpers/isBlacklisted";
import { Client } from "dsteem";
import dateFromJsonString from "../helpers/dateFromJsonString";
import sanitize from "sanitize-html";
import readingTime from "reading-time";
import Button from "@material-ui/core/Button";
import { getHtml } from "../components/busy/Body";
import PropTypes from "prop-types";
const client = new Client("https://api.steemit.com");
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import FlightIcon from "@material-ui/icons/FlightTakeoff";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import BookmarkIcon from "@material-ui/icons/Bookmark";

class Post extends Component {
  state = {
    profiledesc: "Profile description placeholder"
  };
  async getProfile() {
    // TODO: get current author name from permlink
    const acc = await client.database.getAccounts(["travelfeed"]);
    console.log(acc[0].json_metadata);
  }
  componentDidMount() {
    this.getProfile();
  }
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
    const tags = json.tags != "undefined" ? json.tags : [""];
    const json_date = '{ "date": "' + post.created + 'Z" }';
    const date_object = new Date(
      JSON.parse(json_date, dateFromJsonString).date
    );
    const created = date_object.toDateString();
    const image = getImage(post.json_metadata, post.body, "1000x0");
    let getbody = post.body.replace(
      /((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))/gi,
      "https://steemitimages.com/1000x0/$1"
    );
    let htmlBody = getHtml(getbody, {}, "text")
      .replace(
        /(?:[^"])((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:[^"])/gi,
        '<img src="$1"><'.replace(
          /((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:(?="))/gi,
          "$1"
        )
      )
      .replace(/<a/gi, '<a rel="nofollow"')
      .replace(/https:\/\/steemit.com/gi, "");
    const bodyText = { __html: htmlBody };
    let excerpt = htmlBody.substring(0, 143) + ` by ${post.author}`;
    let excerpt_title =
      post.title.length > 100
        ? post.title.substring(0, 96) + "[...]"
        : post.title;
    // todo: Implement canonical URL from condenser
    let canonicalUrl =
      "https://steemit.com/@" + post.author + "/" + post.permlink;
    let sanitized = sanitize(htmlBody, { allowedTags: [] });
    const readtime = readingTime(sanitized);
    let totalmiles = 0;
    //Proposal for voting system: Each user can give between 0.1 and 10 "miles", each 0.1 mile equals a 1% upvote.
    for (let vote = 0; vote < post.active_votes.length; vote++) {
      totalmiles += Math.round(post.active_votes[vote].percent / 1000);
    }
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
        canonicalUrl: canonicalUrl,
        readtime: readtime,
        totalmiles: totalmiles
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
    } else if (
      typeof this.props.blog.post.blacklisted !== "undefined" ||
      this.props.blog.post.readtime.words < 250
    ) {
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
            <Fragment>
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
                            className="cpointer"
                            src={`https://steemitimages.com/u/${
                              this.props.blog.post.author
                            }/avatar/small`}
                          />
                        </Link>
                      }
                      action={
                        <IconButton>
                          <BookmarkIcon />
                        </IconButton>
                      }
                      title={
                        <Fragment>
                          <Link
                            as={`/@${this.props.blog.post.author}`}
                            href={`/blog?author=${this.props.blog.post.author}`}
                          >
                            <a className="text-dark cpointer">
                              {this.props.blog.post.author}
                            </a>
                          </Link>
                          <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            className="ml-2 p-0"
                          >
                            Follow
                          </Button>
                        </Fragment>
                      }
                      subheader={
                        this.props.blog.post.created +
                        " | " +
                        this.props.blog.post.readtime.text
                      }
                    />
                    <CardContent>
                      <Typography
                        variant="display1"
                        className="text-dark font-weight-bold"
                      >
                        {this.props.blog.post.title}
                      </Typography>
                      <hr />
                      <div
                        className="postcontent"
                        dangerouslySetInnerHTML={this.props.blog.post.bodyText}
                      />
                      <hr />
                      <div className="text-center">
                        <Typography variant="h5" className="p-2">
                          Written by:
                        </Typography>
                        <Link
                          as={`/@${this.props.blog.post.author}`}
                          href={`/blog?author=${this.props.blog.post.author}`}
                        >
                          <div className="pb-2">
                            <img
                              style={{ cursor: "pointer" }}
                              src={`https://steemitimages.com/u/${
                                this.props.blog.post.author
                              }/avatar`}
                              width="80"
                              height="80"
                              className="rounded-circle"
                            />
                          </div>
                        </Link>
                        <Fragment>
                          <div>
                            <Link
                              as={`/@${this.props.blog.post.author}`}
                              href={`/blog?author=${
                                this.props.blog.post.author
                              }`}
                            >
                              <Typography
                                variant="title"
                                className="text-dark cpointer"
                              >
                                {this.props.blog.post.author}
                              </Typography>
                            </Link>
                          </div>
                          <p className="p-2">{this.state.profiledesc}</p>
                        </Fragment>
                        <div>
                          <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                          >
                            Follow
                          </Button>
                        </div>
                      </div>
                      <hr />
                      <div className="container">
                        <div className="row">
                          <div className="col-8">
                            {this.props.blog.post.tags.map(tag => {
                              return (
                                <span
                                  key={tag}
                                  className="badge badge-secondary m-1 p-1 pl-2 pr-2 rounded cpointer"
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                          <div className="col-4 text-right">
                            <IconButton aria-label="Upvote">
                              <FlightIcon className="mr" />
                              <Typography noWrap className="text-muted">
                                {this.props.blog.post.totalmiles}
                              </Typography>
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item lg={6} md={6} sm={11} xs={12}>
                  <Card>
                    <CardContent>Comment placeholder</CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Fragment>
          </Layout>
        </Fragment>
      );
    }
  }
}
Post.propTypes = {
  blog: PropTypes.object
};

export default Post;
