import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import BookmarkIconBorder from "@material-ui/icons/BookmarkBorder";
import BookmarkIconFilled from "@material-ui/icons/Bookmark";
import { Mutation, Query } from "react-apollo";
import {
  ADD_BOOKMARK,
  DELETE_BOOKMARK,
  IS_BOOKMARKED
} from "../../helpers/graphql/bookmarks";
import Tooltip from "@material-ui/core/Tooltip";

class BookmarkIcon extends Component {
  render() {
    return (
      <Fragment>
        <Query
          query={IS_BOOKMARKED}
          variables={{
            author: this.props.author,
            permlink: this.props.permlink
          }}
        >
          {({ data, loading, error }) => {
            if (loading || error) {
              return <Fragment />;
            }
            if (data.isBookmarked) {
              return (
                <IsBookmarked
                  author={this.props.author}
                  permlink={this.props.permlink}
                  onBmChange={this.props.onBmChange}
                />
              );
            }
            return (
              <IsNotBookmarked
                author={this.props.author}
                permlink={this.props.permlink}
                onBmChange={this.props.onBmChange}
              />
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

class IsBookmarked extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_BOOKMARK}
        variables={{
          author: this.props.author,
          permlink: this.props.permlink
        }}
      >
        {(deleteBookmark, data) => {
          if (data.data && data.data.deleteBookmark.success) {
            if (this.props.onBmChange !== undefined) {
              this.props.onBmChange();
            }
            return (
              <IsNotBookmarked
                author={this.props.author}
                permlink={this.props.permlink}
                onBmChange={this.props.onBmChange}
              />
            );
          }
          return (
            <Tooltip title="Remove bookmark" placement="bottom">
              <IconButton onClick={deleteBookmark}>
                <BookmarkIconFilled />
              </IconButton>
            </Tooltip>
          );
        }}
      </Mutation>
    );
  }
}

class IsNotBookmarked extends Component {
  render() {
    return (
      <Mutation
        mutation={ADD_BOOKMARK}
        variables={{
          author: this.props.author,
          permlink: this.props.permlink
        }}
      >
        {(addBookmark, data) => {
          if (data.data && data.data.addBookmark.success) {
            if (this.props.onBmChange !== undefined) {
              this.props.onBmChange();
            }
            return (
              <IsBookmarked
                author={this.props.author}
                permlink={this.props.permlink}
                onBmChange={this.props.onBmChange}
              />
            );
          }
          return (
            <Tooltip title="Add bookmark" placement="bottom">
              <IconButton onClick={addBookmark}>
                <BookmarkIconBorder />
              </IconButton>
            </Tooltip>
          );
        }}
      </Mutation>
    );
  }
}

BookmarkIcon.propTypes = {
  author: PropTypes.string,
  permlink: PropTypes.string,
  onBmChange: PropTypes.func
};

IsNotBookmarked.propTypes = {
  author: PropTypes.string,
  permlink: PropTypes.string,
  onBmChange: PropTypes.func
};

IsBookmarked.propTypes = {
  author: PropTypes.string,
  permlink: PropTypes.string,
  onBmChange: PropTypes.func
};

export default BookmarkIcon;
