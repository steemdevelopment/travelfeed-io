import React, { Component } from "react";
import PropTypes from "prop-types";
import { SinglePost } from "../components/SinglePost";

class Post extends Component {
  static async getInitialProps(props) {
    const { author } = props.query;
    const { permlink } = props.query;
    return { author, permlink };
  }
  render() {
    return (
      <SinglePost
        post={{ author: this.props.author, permlink: this.props.permlink }}
      />
    );
  }
}
Post.propTypes = {
  author: PropTypes.string,
  permlink: PropTypes.string
};

export default Post;
