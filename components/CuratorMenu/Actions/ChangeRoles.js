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
import { Mutation } from 'react-apollo';
import { CHANGE_CURATOR_ROLE } from '../../../helpers/graphql/roles';

class AlertDialog extends React.Component {
  state = {
    reason: '',
    open: false,
    isOnlyCommentBlacklisted: false,
  };

  handleCheckboxChange = name => event => {
    this.setState({ [name]: event.target.checked });
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
    if (this.props.isCurator) {
      return (
        <Mutation
          mutation={CHANGE_CURATOR_ROLE}
          variables={{
            user: this.props.author,
            isCurator: false,
          }}
        >
          {(removeCurator, data) => {
            if (
              data &&
              data.data &&
              data.data.updateUserRoles &&
              this.state.open === true
            ) {
              this.newNotification({
                success: data.data.updateUserRoles.success,
                message: data.data.updateUserRoles.message,
              });
              this.setState({ open: false });
            }
            return (
              <Fragment>
                <MenuItem onClick={this.handleClickOpen}>
                  Remove curator role
                </MenuItem>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Remove curator role?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure that you want to revoke curator rights for @
                      {this.props.author}?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={removeCurator}
                      color="primary"
                      variant="contained"
                      autoFocus
                    >
                      Remove curator role
                    </Button>
                  </DialogActions>
                </Dialog>
              </Fragment>
            );
          }}
        </Mutation>
      );
    }
    return (
      <Mutation
        mutation={CHANGE_CURATOR_ROLE}
        variables={{
          user: this.props.author,
          isCurator: true,
        }}
      >
        {(makeCurator, data) => {
          if (
            data &&
            data.data &&
            data.data.updateUserRoles &&
            this.state.open === true
          ) {
            this.newNotification({
              success: data.data.updateUserRoles.success,
              message: data.data.updateUserRoles.message,
            });
            this.setState({ open: false });
          }
          return (
            <Fragment>
              <MenuItem onClick={this.handleClickOpen}>Make curator</MenuItem>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Promote user to curator?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure that you want to give the user @
                    {this.props.author} curator rights?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={makeCurator}
                    color="primary"
                    variant="contained"
                    autoFocus
                  >
                    Promote to Curator
                  </Button>
                </DialogActions>
              </Dialog>
            </Fragment>
          );
        }}
      </Mutation>
    );
  }
}

AlertDialog.propTypes = {
  author: PropTypes.string.isRequired,
  isCurator: PropTypes.bool.isRequired,
  enqueueSnackbar: PropTypes.func,
};

export default withSnackbar(AlertDialog);
