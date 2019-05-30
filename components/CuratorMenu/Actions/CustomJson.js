import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { customJson } from '../../../helpers/actions';

class CustomJson extends React.Component {
  handleConfirm = () => {
    const { author, permlink, action } = this.props;
    const payload = {
      author,
      permlink,
      action,
    };
    customJson(payload).then(result => {
      this.newNotification(result);
    });
  };

  newNotification(notification) {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      const { enqueueSnackbar } = this.props;
      enqueueSnackbar(notification.message, { variant });
    }
  }

  render() {
    const { action, title, desc } = this.props;
    const open = this.state;
    return (
      <div>
        <MenuItem onClick={this.handleClickOpen}>{action}</MenuItem>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {desc}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleConfirm}
              variant="contained"
              color="primary"
              autoFocus
            >
              Do it!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CustomJson.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

export default withSnackbar(CustomJson);
