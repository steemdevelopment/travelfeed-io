import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import PropTypes from "prop-types";
import { SinglePost } from "../components/SinglePost";

class Post extends Component {
  static async getInitialProps(props) {
    const { author } = props.query;
    const { permlink } = props.query;
    return { author, permlink };
  }
  render() {
    const ref = React.createRef();
    return (
      <Fragment>
        <SinglePost
          ref={ref}
          props={{ author: this.props.author, permlink: this.props.permlink }}
        />
      </Fragment>
    );
  }
}
Post.propTypes = {
  post: PropTypes.object
};

export default Post;
