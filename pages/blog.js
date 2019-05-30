import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import PostGrid from '../components/Grid/PostGrid';
import AuthorProfile from '../components/Profile/AuthorProfile';

class Blog extends Component {
  static async getInitialProps(props) {
    const { author } = props.query;
    return { author };
  }

  render() {
    const { author } = this.props;
    return (
      <Fragment>
        <AuthorProfile author={author} />
        <PostGrid
          query={{ author, limit: 12 }}
          grid={{ lg: 3, md: 4, sm: 6, xs: 12 }}
          cardHeight={140}
        />
      </Fragment>
    );
  }
}

Blog.propTypes = {
  author: PropTypes.string.isRequired,
};

export default Blog;
