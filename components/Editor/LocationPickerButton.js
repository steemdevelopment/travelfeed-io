import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { hasCookieConsent } from '../../helpers/token';
import CookiePopup from '../CookieConsent/CookiePopup';

class LocationPicker extends React.Component {
  state = {
    open: false,
    optopen: false,
    optin: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const cookie = hasCookieConsent() !== 'true';
    this.setState({ optopen: cookie, optin: !cookie });
  }

  decline() {
    this.setState({ optopen: false });
  }

  accept() {
    this.setState({ optopen: false, optin: true });
  }

  render() {
    //   https://medium.com/@timothyde/making-next-js-and-mapbox-gl-js-get-along-a99608667e67
    const DynamicMap = dynamic(() => import('./LocationPickerDialog'), {
      loading: () => <p>Loading...</p>,
      ssr: false,
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
          fullWidth
          maxWidth="md"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {(this.state.optin && (
            <DynamicMap
              handleClose={this.handleClose.bind(this)}
              onPick={this.props.onPick}
            />
          )) || (
            <CookiePopup
              open={this.state.optopen}
              accept={this.accept.bind(this)}
              decline={this.decline.bind(this)}
              allowtext="Allow cookies once"
              content={
                <Typography variant="p" className="text-light">
                  The location picker requires cookies to load. You have not
                  accepted cookies yet, but you can allow cookies for loading
                  the map. <br />
                  We and our partners use cookies to improve your experience and
                  to analyze how our site is used.
                  <br />
                  <Link href="/about/cookies" passHref>
                    <a className="text-light text-decoration-underline">
                      Learn about our Cookie Policy
                    </a>
                  </Link>
                </Typography>
              }
            />
          )}
        </Dialog>
      </div>
    );
  }
}

LocationPicker.propTypes = {
  onPick: PropTypes.func,
  isChange: PropTypes.bool,
};

export default LocationPicker;
