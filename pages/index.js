import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import PropTypes from "prop-types";
import { Client } from "dsteem";
import FrontPageHeader from "../components/FrontPageHeader";
import BlogGridList from "../components/BlogGridList";
import PostGrid from "../components/PostGrid";
import Helmet from "react-helmet";

const client = new Client("https://api.steemit.com");

class Index extends Component {
  static async getInitialProps() {
    const args = { tag: "travelfeed", limit: 24 };
    const stream = await client.database.getDiscussions("blog", args);
    return { stream };
  }
  render() {
    const description =
      "Find inspiration for your travels on TravelFeed. Join the TravelFeed community, write your own travel blog and start earning!";
    return (
      <Fragment>
        <Helmet>
          <title>{"TravelFeed: The Travel Community"}</title>
          <meta property="description" content={description} />
          <meta property="og:description" content={description} />
        </Helmet>
        <div>
          <FrontPageHeader />
        </div>
        <div>
          <BlogGridList stream={this.props.stream} />
        </div>
        <div id="discover" />
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
