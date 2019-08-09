import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import LoginIcon from '@material-ui/icons/VpnKey';
import { withStyles } from '@material-ui/styles';
import Router from 'next/router';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import steemconnect from 'steemconnect';
import api from '../../helpers/steemConnectAPI';
import { getLoginURL } from '../../helpers/token';
import KcLogo from '../../images/keychain.png';
import ScLogo from '../../images/steemconnect.svg';

const styles = () => ({
  whitebutton: {
    color: grey[200],
    borderColor: grey[200],
  },
});

const LoginButton = props => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');

  const handleUsernameInput = () => event => {
    setUsername(event.target.value.toLowerCase());
  };

  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      const { enqueueSnackbar } = props;
      enqueueSnackbar(notification.message, { variant });
    }
  };

  const handleLogin = () => {
    let params = {};
    if (steemconnect.useSteemKeychain) {
      params = { username };
    }

    api.login(params, (err, token) => {
      if (token) {
        Router.push({
          pathname: '/login',
          query: { access_token: token, expires_in: 604800 },
        });
      }
      if (err) {
        newNotification({
          success: false,
          message: `Could not login: ${err}`,
        });
      }
    });
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') handleLogin();
  };

  const handleClickOpen = () => {
    if (window && window.steem_keychain) setOpen(true);
    else handleLogin();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeychainClick = () => {
    if (username.length > 2) handleLogin();
    else
      newNotification({
        success: false,
        message: 'Enter your username first',
      });
  };

  const { classes } = props;
  return (
    <Fragment>
      {(props.isMenu && (
        <MenuItem onClick={handleClickOpen}>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </MenuItem>
      )) || (
        <Button
          color="default"
          className={`ml-1 p-2 ${classes.whitebutton}`}
          onClick={handleClickOpen}
        >
          Login
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '2px',
          }}
        >
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle className="text-center" id="form-dialog-title">
          Login
        </DialogTitle>
        <DialogContent className="text-center">
          <DialogContentText>
            Please enter your Steem username and click the Keychain button
          </DialogContentText>
          <TextField
            autoFocus
            value={username}
            onChange={handleUsernameInput()}
            margin="dense"
            id="username"
            label="Steem username"
            fullWidth
            onKeyPress={handleKeyPress}
          />
          <div className="row pt-4">
            <div className="col-12">
              <Button
                size="large"
                fullsize
                onClick={handleKeychainClick}
                color="primary"
                variant="contained"
              >
                <img src={KcLogo} alt="Login with Steem Keychain" height={30} />
              </Button>
            </div>
            <div className="col-12 pt-4 pb-2">
              <DialogContentText>or login with</DialogContentText>
            </div>
            <div className="col-12 pb-2">
              <a href={getLoginURL}>
                <Button
                  fullsize
                  onClick={handleClose}
                  color="secondary"
                  variant="contained"
                  size="large"
                >
                  <img src={ScLogo} alt="Login with Steemconnect" height={30} />
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

LoginButton.defaultProps = {
  isMenu: false,
};

LoginButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isMenu: PropTypes.bool,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(withStyles(styles)(LoginButton));
