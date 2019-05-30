import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';
import TextField from '@material-ui/core/TextField';

import {
  BLACKLIST_POST,
  UNBLACKLIST_POST,
  IS_BLACKLISTED_POST,
} from '../../../helpers/graphql/blacklist';

class AlertDialog extends React.Component {
  state = {
    reason: '',
    open: false,
  };

  handleTextFieldChange(content) {
    this.setState({ reason: content.target.value });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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

  render() {
    return (
      <div>
        <Query
          query={IS_BLACKLISTED_POST}
          variables={{
            author: this.props.author,
            permlink: this.props.permlink,
          }}
        >
          {({ data, loading, error }) => {
            if (loading || error) {
              return <Fragment />;
            }
            if (data.isBlacklistedPost.isBlacklisted) {
              const { reason } = data.isBlacklistedPost;
              return (
                <Mutation
                  mutation={UNBLACKLIST_POST}
                  variables={{
                    author: this.props.author,
                    permlink: this.props.permlink,
                  }}
                >
                  {(unblacklistPost, data) => {
                    if (
                      data &&
                      data.data &&
                      data.data.unblacklistPost &&
                      this.state.open === true
                    ) {
                      this.newNotification({
                        success: data.data.unblacklistPost.success,
                        message: data.data.unblacklistPost.message,
                      });
                      this.setState({ open: false });
                    }
                    return (
                      <Fragment>
                        <MenuItem onClick={this.handleClickOpen}>
                          Remove post from blacklist
                        </MenuItem>
                        <Dialog
                          open={this.state.open}
                          onClose={this.handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            Remove post from blacklist?
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              This post has been blacklisted for the following
                              reason:
                              <em>{` ${reason} `}</em>
                            </DialogContentText>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure that you want to remove this post
                              from the blacklist? Note: If the author is
                              blacklisted, removing this post from the blacklist
                              will have no effect.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button
                              onClick={unblacklistPost}
                              color="primary"
                              variant="contained"
                              autoFocus
                            >
                              Remove from blacklist
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Fragment>
                    );
                  }}
                </Mutation>
              );
            }
            if (data.isBlacklistedPost.isBlacklisted === false) {
              return (
                <Mutation
                  mutation={BLACKLIST_POST}
                  variables={{
                    author: this.props.author,
                    permlink: this.props.permlink,
                    reason: this.state.reason,
                  }}
                >
                  {(blacklistPost, data) => {
                    if (
                      data &&
                      data.data &&
                      data.data.blacklistPost &&
                      this.state.open === true
                    ) {
                      this.newNotification({
                        success: data.data.blacklistPost.success,
                        message: data.data.blacklistPost.message,
                      });
                      this.setState({ open: false });
                    }
                    return (
                      <Fragment>
                        <MenuItem onClick={this.handleClickOpen}>
                          Blacklist post
                        </MenuItem>
                        <Dialog
                          open={this.state.open}
                          onClose={this.handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            Blacklist post?
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure that you want to blacklist this post?
                              It will no longer be visible on TravelFeed. Please
                              enter a reason for blacklisting this post.
                            </DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              value={this.state.reason}
                              onChange={this.handleTextFieldChange.bind(this)}
                              label="Reason"
                              fullWidth
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button
                              onClick={blacklistPost}
                              color="primary"
                              variant="contained"
                              autoFocus
                            >
                              Blacklist post
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Fragment>
                    );
                  }}
                </Mutation>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

AlertDialog.propTypes = {
  author: PropTypes.string,
  permlink: PropTypes.string,
  enqueueSnackbar: PropTypes.func,
};

export default withSnackbar(AlertDialog);
