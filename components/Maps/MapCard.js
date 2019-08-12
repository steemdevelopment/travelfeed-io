import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import PostPreview from '../Post/PostPreview';

export default class MapCard extends PureComponent {
  render() {
    return (
      <div>
        {(this.props.info.posts && (
          <div style={{ width: '300px', height: '250px', overflow: 'scroll' }}>
            {this.props.info.posts.map((post, i) => (
              <PostPreview
                author={post.properties.props.author}
                permlink={post.properties.props.permlink}
                title={post.properties.props.title}
                img_url={post.properties.props.img_url}
                divider={i < this.props.info.posts.length - 1}
              />
            ))}
          </div>
        )) || (
          <div style={{ width: '300px' }}>
            <PostPreview
              author={this.props.info.author}
              permlink={this.props.info.permlink}
              title={this.props.info.title}
              img_url={this.props.info.img_url}
            />
          </div>
        )}
      </div>
    );
  }
}

MapCard.propTypes = {
  info: PropTypes.objectOf(PropTypes.string).isRequired,
};
