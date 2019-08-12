import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import PostPreview from './PostPreview';

export default class MapCard extends PureComponent {
  render() {
    console.log(this.props.info.posts);
    return (
      <div>
        {(this.props.info.posts && (
          <div style={{ width: '250px', height: '200px', overflow: 'scroll' }}>
            {this.props.info.posts.map(post => (
              <PostPreview
                author={post.properties.props.author}
                permlink={post.properties.props.permlink}
                title={post.properties.props.title}
              />
            ))}
          </div>
        )) || (
          <PostPreview
            author={this.props.info.author}
            permlink={this.props.info.permlink}
            title={this.props.info.title}
          />
        )}
      </div>
    );
  }
}

MapCard.propTypes = {
  info: PropTypes.objectOf(PropTypes.string).isRequired,
};
