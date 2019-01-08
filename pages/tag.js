import "@babel/polyfill";
import React, { Component, Fragment } from "react";
import { client } from "../helpers/client";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import PostGrid from "../components/PostGrid";
import Helmet from "react-helmet";
import Header from "../components/Header";

class Tag extends Component {
  static async getInitialProps(props) {
    var { sortby } = props.query;
    let { tag } = props.query;
    const args = { tag: tag, limit: 24 };
    var type = "tag";
    if (sortby == "featured") {
      type = "blog";
      sortby = "blog";
    }
    if (sortby == "feed") {
      return { args: { sortby: sortby, tag: tag, type: "feed", stream: [] } };
    }
    try {
      const stream = await client.database.getDiscussions(sortby, args);
      if (sortby == "blog") {
        type = "curationfeed";
        sortby = "featured";
      }
      return { args: { sortby: sortby, tag: tag, type: type, stream: stream } };
    } catch {
      const stream = { args: { stream: { notfound: true } } };
      return stream;
    }
  }
  render() {
    if (typeof this.props.args.stream.notfound !== "undefined") {
      return (
        <Fragment>
          <Helmet>
            <title>{"404 - Not Found"}</title>
          </Helmet>
          <Header />
          <Grid container spacing={0} alignItems="center" justify="center">
            <Grid item lg={7} md={8} sm={11} xs={12}>
              <Card>
                <CardContent>
                  <Typography>This is not a valid tag.</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Fragment>
      );
    } else {
      const description =
        "Explore posts about #" + this.props.args.tag + " on TravelFeed.";
      return (
        <Fragment>
          <Helmet>
            <title>
              {"#" +
                this.props.args.tag +
                " - TravelFeed: The Travel Community"}
            </title>
            <meta property="description" content={description} />
            <meta property="og:description" content={description} />
          </Helmet>
          <Header />
          <div className="text-center pt-4 pb-2">
            <Typography variant="display3">#{this.props.args.tag}</Typography>
          </div>
          <PostGrid
            stream={this.props.args.stream}
            type={this.props.args.type}
            sortby={this.props.args.sortby}
            filter={this.props.args.tag}
          />
        </Fragment>
      );
    }
  }
}

Tag.propTypes = {
  args: PropTypes.object
};

export default Tag;
