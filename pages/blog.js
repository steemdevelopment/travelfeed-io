import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PostGrid from "../components/PostGrid";
import AuthorProfile from "../components/AuthorProfile";
import Header from "../components/Header";

class Blog extends Component {
  static async getInitialProps(props) {
    let { author } = props.query;
    return { author };
  }
  render() {
    return (
      <Fragment>
        <Header />
        <AuthorProfile author={this.props.author} />
        <PostGrid
          query={{ author: this.props.author, limit: 12 }}
          grid={{ lg: 3, md: 4, sm: 6, xs: 12 }}
          cardHeight={140}
        />
      </Fragment>
    );
  }
}

Blog.propTypes = {
  author: PropTypes.string
};

export default Blog;
