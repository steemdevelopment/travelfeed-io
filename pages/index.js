import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import PropTypes from "prop-types";
import { Client } from "dsteem";
import BlogGridList from "../components/BlogGridList";
import PostGrid from "../components/PostGrid";

const client = new Client("https://api.steemit.com");

class Index extends Component {
  static async getInitialProps() {
    const args = { tag: "travelfeed", limit: 24 };
    const stream = await client.database.getDiscussions("blog", args);
    return { stream };
  }
  render() {
    return (
      <Fragment>
        <div>
          <BlogGridList stream={this.props.stream} />
        </div>
        <PostGrid
          stream={this.props.stream}
          type="curationfeed"
          filter="travelfeed"
        />
      </Fragment>
    );
  }
}

Index.propTypes = {
  stream: PropTypes.array
};

export default Index;
