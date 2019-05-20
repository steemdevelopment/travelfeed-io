import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import { customJson } from "../../../utils/actions";
import { withSnackbar } from "notistack";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { BLACKLIST_POST } from "../../../helpers/graphql/blacklist";

class AlertDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  newNotification(notification) {
    if (notification != undefined) {
      let variant = "success";
      if (notification.success === false) {
        variant = "error";
      }
      this.props.enqueueSnackbar(notification.message, { variant });
      if (notification.success === true) {
        this.setState({ success: true });
      }
    }
  }
  handleConfirm = () => {
    this.setState({ open: false });
    let payload = {
      author: this.props.author,
      permlink: this.props.permlink,
      action: this.props.action
    };
    customJson(payload).then(result => {
      this.newNotification(result);
    });
  };
  render() {
    return (
      <div>
        <MenuItem onClick={this.handleClickOpen}>{this.props.action}</MenuItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.desc}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Mutation
              mutation={BLACKLIST_POST}
              variables={{
                author: this.props.author,
                permlink: this.props.permlink,
                reason: this.props.reason
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
                    message: data.data.blacklistPost.message
                  });
                  this.handleConfirm();
                }
                return (
                  <Button
                    onClick={blacklistPost}
                    variant="contained"
                    color="primary"
                    autoFocus
                  >
                    Do it!
                  </Button>
                );
              }}
            </Mutation>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialog.propTypes = {
  enqueueSnackbar: PropTypes.func,
  title: PropTypes.string,
  desc: PropTypes.string,
  author: PropTypes.string,
  permlink: PropTypes.string,
  action: PropTypes.string,
  reason: PropTypes.string
};

export default withSnackbar(AlertDialog);
