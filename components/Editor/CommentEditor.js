// TODO: Implement new comment editor

// import Editor from "rich-markdown-editor";
import { debounce } from 'lodash';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import getSlug from 'speakingurl';
import { APP_VERSION } from '../../config';
import { comment } from '../../helpers/actions';
import { getImageList } from '../../helpers/getImage';

class CommentEditor extends Component {
  state = {
    content: '',
    permlink: '',
    completed: 0,
  };

  handleEditorChange = debounce(value => {
    this.setState({ content: value() });
  }, 250);

  newNotification(notification) {
    if (notification != undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      this.props.enqueueSnackbar(notification.message, { variant });
      if (notification.success === true) {
        this.setState({ success: true });
      }
    }
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  publish() {
    const title = '';
    const parentAuthor = this.props.parent_author;
    const parentPermlink = this.props.parent_permlink;
    const commenttime = getSlug(new Date().toJSON()).replace(/-/g, '');
    const permlink =
      (this.props.editMode && this.props.permlink) ||
      `re-${parentPermlink}-${commenttime}`;
    this.setState({ permlink });
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
    this.timer = setInterval(this.progress, 60);
    // Steemconnect broadcast
    comment(
      parentAuthor,
      parentPermlink,
      permlink,
      title,
      body,
      metadata,
      'comment',
    ).then(result => {
      this.newNotification(result);
    });
  }

  render() {
    return <Fragment />;
    // if (this.state.success) {
    //   this.props.editMode
    //     ? this.props.onCommentEdit({
    //         body: this.state.content
    //       })
    //     : this.props.onCommentAdd({
    //         body: this.state.content,
    //         permlink: this.state.permlink
    //       });
    //   !this.props.editMode && this.props.onClose();
    //   clearInterval(this.timer);
    //   this.setState({ completed: 0, success: false });
    // }
    // return (
    //   <Fragment>
    //     <Editor
    //       style={{ minHeight: "100px" }}
    //       defaultValue={this.props.defaultValue}
    //       autofocus={true}
    //       placeholder="Reply"
    //       onChange={this.handleEditorChange}
    //       className="border postcontent pl-2"
    //     />
    //     <Button
    //       className="mt-1"
    //       variant="contained"
    //       color="primary"
    //       onClick={() => this.publish()}
    //       disabled={this.state.content.length < 1}
    //     >
    //       {(this.props.editMode && "Edit") || "Reply"}
    //     </Button>
    //     {this.state.completed !== 0 && (
    //       <CircularProgress
    //         variant="determinate"
    //         value={this.state.completed}
    //         className="p-1"
    //         size={35}
    //         thickness={5}
    //       />
    //     )}
    //   </Fragment>
    // );
  }
}

CommentEditor.defaultProps = {
  editMode: false,
};

CommentEditor.propTypes = {
  permlink: PropTypes.string,
  defaultValue: PropTypes.string,
  onCommentAdd: PropTypes.func,
  onCommentEdit: PropTypes.func,
  onClose: PropTypes.func,
  editMode: PropTypes.bool,
  parent_author: PropTypes.string,
  parent_permlink: PropTypes.string,
  edit: PropTypes.object,
  enqueueSnackbar: PropTypes.func,
};

export default withSnackbar(CommentEditor);
