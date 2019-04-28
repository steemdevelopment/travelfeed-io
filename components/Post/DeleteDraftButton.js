import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Mutation } from "react-apollo";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { DELETE_DRAFT } from "../../helpers/graphql/drafts";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import red from "@material-ui/core/colors/red";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

const theme = createMuiTheme({
  palette: {
    primary: red
  },
  typography: {
    useNextVariants: true
  }
});

class DeleteDraftButton extends Component {
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

  render() {
    return (
      <Mutation
        mutation={DELETE_DRAFT}
        variables={{
          id: this.props.id
        }}
      >
        {(deleteDraft, data) => {
          if (data.data && data.data.deleteDraft && this.state.open) {
            this.handleClose();
            this.newNotification({
              success: data.data.deleteDraft.success,
              message: data.data.deleteDraft.message
            });
            if (data.data.deleteDraft.success) {
              this.props.onDelete();
            }
          }
          return (
            <Fragment>
              <a className="text-light">
                <Button
                  onClick={this.handleClickOpen}
                  color="inherit"
                  className="p-0 pr-2 pl-2"
                >
                  <span className="pr-1">Delete</span> <DeleteIcon />
                </Button>
              </a>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete Draft?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure that you want to delete this draft? Deleted
                    drafts cannot be restored.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    Cancel
                  </Button>
                  <MuiThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      onClick={deleteDraft}
                      color="primary"
                    >
                      <DeleteForeverIcon /> Delete
                    </Button>
                  </MuiThemeProvider>
                </DialogActions>
              </Dialog>
            </Fragment>
          );
        }}
      </Mutation>
    );
  }
}

DeleteDraftButton.propTypes = {
  id: PropTypes.string,
  enqueueSnackbar: PropTypes.func,
  onDelete: PropTypes.func
};

export default withSnackbar(DeleteDraftButton);
