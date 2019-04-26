import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import PropTypes from "prop-types";
import FrontPageHeader from "../components/FrontPageHeader";
import BlogGridList from "../components/BlogGridList";
import PostGrid from "../components/PostGrid";
import Helmet from "react-helmet";
import Header from "../components/Header";
import { getUser } from "../utils/token";
import { DEFAULT_META_DESCRIPTION } from "../config";

class Index extends Component {
  state = { user: null };
  getUser() {
    this.setState({ user: getUser() });
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    var slider = <Fragment />;
    if (this.state.user == null) {
      slider = (
        <div style={{ marginTop: "-10px" }}>
          <FrontPageHeader />
        </div>
      );
    }

    return (
      <Fragment>
        <Helmet>
          <title>{"TravelFeed: The Travel Community"}</title>
          <meta property="description" content={DEFAULT_META_DESCRIPTION} />
          <meta property="og:description" content={DEFAULT_META_DESCRIPTION} />
        </Helmet>
        <Header />
        {slider}
        <div className="pt-5">
          <BlogGridList />
        </div>
        <div id="discover" />
        <PostGrid type="curationfeed" filter="travelfeed" />
      </Fragment>
    );
  }
}

export default Index;
