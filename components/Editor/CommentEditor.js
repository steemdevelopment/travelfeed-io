import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Editor from 'rich-markdown-editor';
import getSlug from 'speakingurl';
import { APP_VERSION } from '../../config';
import { comment } from '../../helpers/actions';
import { getImageList } from '../../helpers/getImage';
import uploadFile from '../../helpers/imageUpload';
import { getUser } from '../../helpers/token';

class CommentEditor extends Component {
  state = {
    content: '',
    loading: undefined,
  };

  handleEditorChange = value => {
    const content = value();
    this.setState({ content });
  };

  progress = () => {
    const { loading } = this.state;
    if (loading < 100) {
      this.setState({ loading: loading + 1 });
    } else {
      this.setState({ loading: 0 });
    }
  };

  newNotification(notification) {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      this.props.enqueueSnackbar(notification.message, { variant });
    }
  }

  publish() {
    this.setState({ loading: 0 });
    const title = '';
    const parentAuthor = this.props.parent_author;
    const parentPermlink = this.props.parent_permlink;
    const commenttime = getSlug(new Date().toJSON()).replace(/-/g, '');
    const permlink =
      (this.props.editMode && this.props.permlink) ||
      `re-${parentPermlink}-${commenttime}`;
    const body = this.state.content;
    const metadata = {};
    metadata.tags = ['travelfeed'];
    metadata.app = APP_VERSION;
    metadata.community = 'travelfeed';
    // Parse comment for images. Todo: Parse links
    const imageList = getImageList(body);
    if (imageList !== null) {
      metadata.image = imageList;
    }
    // Steemconnect broadcast
    return comment(
      parentAuthor,
      parentPermlink,
      permlink,
      title,
      body,
      metadata,
      'comment',
    ).then(res => {
      if (res) {
        this.newNotification(res);
        this.setState({ loading: undefined });
        if (!res.success) this.setState({ content: body });
        else this.props.onCommentEdit({ body });
      }
    });
  }

  render() {
    if (this.state.success) {
      if (this.props.editMode) {
        this.props.onCommentEdit({
          body: this.state.content,
        });
      } else {
        this.props.onCommentAdd({
          body: this.state.content,
          permlink: this.state.permlink,
        });
      }
      if (!this.props.editMode) this.props.onClose();
    }
    return (
      <Fragment>
        <Editor
          uploadImage={file => {
            return uploadFile(file, getUser()).then(res => {
              return res;
            });
          }}
          data={this.state.content}
          style={{ minHeight: '100px' }}
          defaultValue={this.props.defaultValue}
          autofocus
          placeholder="Reply"
          onChange={this.handleEditorChange}
          className="border postcontent pl-2"
        />
        <Button
          className="mt-1"
          variant="contained"
          color="primary"
          onClick={() => this.publish()}
          disabled={this.state.content.length < 1}
        >
          {(this.props.editMode && 'Edit') || 'Reply'}
        </Button>
        {this.state.loading !== undefined && (
          <CircularProgress
            // variant="determinate"
            value={this.state.loading}
            className="p-1"
            size={35}
            thickness={5}
          />
        )}
      </Fragment>
    );
  }
}

CommentEditor.defaultProps = {
  editMode: false,
  onCommentAdd: undefined,
  onClose: undefined,
  defaultValue: '',
  permlink: '',
};

CommentEditor.propTypes = {
  permlink: PropTypes.string,
  defaultValue: PropTypes.string,
  onCommentAdd: PropTypes.func,
  onCommentEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  editMode: PropTypes.bool,
  parent_author: PropTypes.string.isRequired,
  parent_permlink: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(CommentEditor);
