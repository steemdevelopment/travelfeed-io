import "@babel/polyfill";
import React, { Component } from "react";
import Layout from "../components/Layout.js";
import isBlacklisted from "../helpers/isBlacklisted";
import { Client } from "dsteem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import PostGrid from "../components/PostGrid";

const client = new Client("https://api.steemit.com");

class Tag extends Component {
  static async getInitialProps(props) {
    let { sortby } = props.query;
    let { tag } = props.query;
    const args = { tag: tag, limit: 24 };
    try {
      const stream = await client.database.getDiscussions(sortby, args);
      return { args: { sortby: sortby, tag: tag, stream: stream } };
    } catch {
      const stream = { args: { stream: { notfound: true } } };
      return stream;
    }
  }
  render() {
    if (typeof this.props.args.stream.notfound !== "undefined") {
      return (
        <Layout>
          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item lg={7} md={8} sm={11} xs={12}>
              <Card>
                <CardContent>
                  <Typography>This is not a valid tag.</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <div className="text-center pt-4 pb-2">
            <Typography variant="display3">#{this.props.args.tag}</Typography>
          </div>
          <PostGrid
            stream={this.props.args.stream}
            type="tag"
            sortby={this.props.args.sortby}
            filter={this.props.args.tag}
          />
        </Layout>
      );
    }
  }
}

Tag.propTypes = {
  args: PropTypes.array
};

export default Tag;
