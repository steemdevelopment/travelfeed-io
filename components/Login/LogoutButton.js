import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Router from 'next/router';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { REVOKE_TOKEN } from '../../helpers/graphql/token';
import { getAccessToken } from '../../helpers/token';

class Logout extends Component {
  state = {
    mounted: false,
    open: false,
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

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    //   No ssr - need to read cookies
    if (!this.state.mounted) {
      return '';
    }
    const token_details = getAccessToken();
    return (
      <Mutation mutation={REVOKE_TOKEN} variables={token_details}>
        {(revokeToken, data) => {
          if (data && data.data && data.data.revokeToken && !this.state.open) {
            this.newNotification({
              success: data.data.revokeToken.success,
              message: data.data.revokeToken.message,
            });
            this.props.handleLogout();
            Router.push('/');
            this.setState({ open: true });
          }
          return (
            <MenuItem onClick={revokeToken}>
              <ListItemIcon>
                <LogoutIcon />
                <ListItemText inset primary="Logout" />
              </ListItemIcon>
            </MenuItem>
          );
        }}
      </Mutation>
    );
  }
}

Logout.propTypes = {
  enqueueSnackbar: PropTypes.func,
  handleLogout: PropTypes.func,
};

export default withSnackbar(Logout);
