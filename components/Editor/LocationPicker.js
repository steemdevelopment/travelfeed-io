import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import EditLocationIcon from "@material-ui/icons/EditLocation";

class AlertDialog extends React.Component {
  state = {
    open: false,
    latitude: 0,
    longitude: 0
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  onPick = ({ latitude, longitude }) => {
    console.log({ latitude, longitude });
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
          {(this.props.isChange && (
            <Fragment>
              <span className="pr-2">Edit Location</span>
              <EditLocationIcon />
            </Fragment>
          )) || (
            <Fragment>
              <span className="pr-2">Pick Location</span>
              <AddLocationIcon />
            </Fragment>
          )}
        </Button>
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DynamicMap
            handleClose={this.handleClose.bind(this)}
            onPick={this.props.onPick}
          />
        </Dialog>
      </div>
    );
  }
}

AlertDialog.propTypes = {};

export default AlertDialog;
