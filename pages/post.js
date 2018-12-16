import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import Helmet from "react-helmet";
import getImage from "../helpers/getImage";
import isBlacklisted from "../helpers/isBlacklisted";
import { Client } from "dsteem";
import PostAuthorProfile from "../components/PostAuthorProfile";
import dateFromJsonString from "../helpers/dateFromJsonString";
import PostComments from "../components/PostComments";
import sanitize from "sanitize-html";
import readingTime from "reading-time";
import Button from "@material-ui/core/Button";
import RegexBody from "../helpers/RegexBody";
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
import BookmarkIconBorder from "@material-ui/icons/BookmarkBorder";

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

    if (
      post.id === 0 ||
      JSON.parse(post.json_metadata).tags.indexOf("nsfw") > -1 === true
    ) {
      const blog = {
        post: {
          blacklisted: true
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
    let htmlBody = RegexBody(post.body);
    const bodyText = { __html: htmlBody };
    let excerpt_title =
      post.title.length > 100
        ? post.title.substring(0, 96) + "[...]"
        : post.title;
    // todo: Implement canonical URL from condenser
    let canonicalUrl =
      "https://steemit.com/travelfeed/@" + post.author + "/" + post.permlink;
    let sanitized = sanitize(htmlBody, { allowedTags: [] });
    const readtime = readingTime(sanitized);
    let excerpt = sanitized.substring(0, 143) + `[...] by ${post.author}`;
    let totalmiles = 0;
    //Proposal for voting system: Each user can give between 0.1 and 10 "miles", each 0.1 mile equals a 1% upvote.
    for (let vote = 0; vote < post.active_votes.length; vote++) {
      totalmiles += Math.round(post.active_votes[vote].percent / 1000);
    }
    const blog = {
      post: {
        permlink: post.permlink,
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
          <Grid container spacing={0} alignItems="center" justify="center">
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
        </Fragment>
      );
    } else if (
      typeof this.props.blog.post.blacklisted !== "undefined" ||
      this.props.blog.post.readtime.words < 250
    ) {
      return (
        <Fragment>
          <Grid container spacing={0} alignItems="center" justify="center">
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
        </Fragment>
      );
    } else {
      const author = this.props.blog.post.author.replace(/^\w/, c =>
        c.toUpperCase()
      );
      return (
        <Fragment>
          <Helmet>
            <title>
              {this.props.blog.post.title +
                " - " +
                author +
                "'s Blog on TravelFeed"}
            </title>
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
            <meta
              property="twitter:card"
              content={
                this.props.blog.post.image ? "summary_large_image" : "summary"
              }
            />
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
          <Fragment>
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
                        as={`/@${this.props.blog.post.author}`}
                        href={`/blog?author=${this.props.blog.post.author}`}
                        passHref
                        prefetch
                      >
                        <a>
                          <Avatar
                            className="cpointer"
                            src={`https://steemitimages.com/u/${
                              this.props.blog.post.author
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
                      <Fragment>
                        <Link
                          as={`/@${this.props.blog.post.author}`}
                          href={`/blog?author=${this.props.blog.post.author}`}
                          passHref
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
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-9 col-sm-12">
                          <PostAuthorProfile
                            author={this.props.blog.post.author}
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="container">
                      <div className="row">
                        <div className="col-2 p-0">
                          <IconButton aria-label="Upvote">
                            <FlightIcon className="mr" />
                          </IconButton>
                          <span className="text-muted font-weight-bold">
                            {this.props.blog.post.totalmiles}
                          </span>
                        </div>
                        <div className="col-10 text-right p-0 pt-2">
                          {this.props.blog.post.tags.map(tag => {
                            return (
                              <Link
                                as={`/created/${tag}`}
                                href={`/tag?sortby=created&tag=${tag}`}
                                key={tag}
                                passHref
                              >
                                <a>
                                  <span className="badge badge-secondary m-1 p-1 pl-2 pr-2 rounded cpointer">
                                    {tag}
                                  </span>
                                </a>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={6} md={7} sm={10} xs={11} className="pb-2">
                <PostComments
                  author={this.props.blog.post.author}
                  permlink={this.props.blog.post.permlink}
                />
              </Grid>
            </Grid>
          </Fragment>
        </Fragment>
      );
    }
  }
}
Post.propTypes = {
  blog: PropTypes.object
};

export default Post;
