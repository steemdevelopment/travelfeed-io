import React, { Component } from "react";
import "@babel/polyfill";
import PropTypes from "prop-types";
import { Client } from "dsteem";
import BlogGridList from "../components/BlogGridList";
import PostGrid from "../components/PostGrid";
import Typography from "@material-ui/core/Typography";
import Layout from "../components/Layout";

const client = new Client("https://api.steemit.com");

class Index extends Component {
  static async getInitialProps() {
    const args = { tag: "travelfeed", limit: 24 };
    const stream = await client.database.getDiscussions("blog", args);
    return { stream };
  }
  render() {
    return (
      <Layout>
        <BlogGridList stream={this.props.stream} />
        <Typography
          variant="display1"
          align="center"
          gutterBottom={true}
          className="p-5"
        >
          Featured Posts
        </Typography>
        <PostGrid stream={this.props.stream} />
      </Layout>
    );
  }
}

Index.propTypes = {
  stream: PropTypes.array
};

export default Index;
