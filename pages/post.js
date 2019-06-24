import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SinglePost from '../components/Post/SinglePost';

class PostPage extends Component {
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

PostPage.defaultProps = {
  query: undefined,
};

PostPage.propTypes = {
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  query: PropTypes.arrayOf(PropTypes.string),
};

export default PostPage;
