import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

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
  onPick = value => {
    console.log(value);
  };
  render() {
    //   https://medium.com/@timothyde/making-next-js-and-mapbox-gl-js-get-along-a99608667e67
    const DynamicMap = dynamic(() => import("./LocationPickerDialog"), {
      loading: () => <p>Loading...</p>,
      ssr: false
    });
    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          variant="contained"
          color="primary"
          autoFocus
        >
          Pick Location
        </Button>
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DynamicMap onPick={this.onPick.bind(this)} />
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="primary"
              autoFocus
            >
              Pick
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialog.propTypes = {};

export default AlertDialog;
