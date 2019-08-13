import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import PostGrid from '../components/Grid/PostGrid';
import AuthorMap from '../components/Maps/AuthorMap';
import AuthorProfile from '../components/Profile/AuthorProfile';

class BlogPage extends Component {
  static async getInitialProps(props) {
    const { author } = props.query;
    return { author };
  }

  render() {
    const { author } = this.props;
    return (
      <Fragment>
        <AuthorProfile author={author} />
        <AuthorMap author={author} />
        <PostGrid
          query={{ author, limit: 12 }}
          grid={{ lg: 4, md: 4, sm: 6, xs: 12 }}
          cardHeight={140}
        />
      </Fragment>
    );
  }
}

BlogPage.propTypes = {
  author: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  query: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default BlogPage;
