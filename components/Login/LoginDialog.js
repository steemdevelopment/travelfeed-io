import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Terms from "../About/Texts/Terms";
import Privacy from "../About/Texts/Privacy";
import Cookies from "../About/Texts/Cookies";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import Header from "../Header";

class LoginDialog extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Dialog aria-labelledby="customized-dialog-title" open={true}>
          <MuiDialogTitle
            id="customized-dialog-title"
            onClose={this.handleClose}
          >
            Terms and Privacy
          </MuiDialogTitle>
          <MuiDialogContent>
            <Typography variant="h5" align="center">
              Terms of Service
            </Typography>
            <Terms />
            <Typography variant="h5" align="center">
              Privacy Policy
            </Typography>
            <Privacy />
            <Typography variant="h5" align="center">
              Cookies
            </Typography>
            <Cookies />
          </MuiDialogContent>
          <MuiDialogActions>
            <Link href="/" passHref>
              <Button color="primary">Decline</Button>
            </Link>
            <Button
              onClick={this.props.acceptTos}
              variant="contained"
              color="primary"
            >
              Accept
            </Button>
          </MuiDialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default LoginDialog;
