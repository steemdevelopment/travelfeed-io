import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Link from '../../lib/Link';
import Cookies from '../About/Texts/Cookies';
import Privacy from '../About/Texts/Privacy';
import Terms from '../About/Texts/Terms';
import Header from '../Header/Header';

class LoginDialog extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Dialog aria-labelledby="customized-dialog-title" open>
          <MuiDialogTitle
            id="customized-dialog-title"
            onClose={this.handleClose}
          >
            Terms of Service and Privacy
          </MuiDialogTitle>
          <MuiDialogContent>
            <Typography variant="h3" gutterBottom>
              Terms of Service
            </Typography>
            <Typography>
              <Terms />
            </Typography>
            <Typography variant="h3" gutterBottom>
              Privacy Policy
            </Typography>
            <Typography>
              <Privacy />
            </Typography>
            <Typography variant="h3" gutterBottom>
              Cookie Policy
            </Typography>
            <Typography>
              {' '}
              <Cookies />
            </Typography>
          </MuiDialogContent>
          <MuiDialogActions>
            <Link color="textPrimary" href="/" passHref>
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

LoginDialog.propTypes = {
  acceptTos: PropTypes.func.isRequired,
};

export default LoginDialog;
