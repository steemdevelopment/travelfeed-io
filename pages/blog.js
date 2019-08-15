import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import AuthorProfile from '../components/Profile/AuthorProfile';
import ProfileTabs from '../components/Profile/ProfileTabs';

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
        <ProfileTabs author={author} />
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
