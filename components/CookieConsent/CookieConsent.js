import Typography from '@material-ui/core/Typography';
import React, { Component, Fragment } from 'react';
import { hasCookieConsent, setCookieConsent } from '../../helpers/token';
import Link from '../../lib/Link';
import CookiePopup from './CookiePopup';

class CookieConsent extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const cookie = hasCookieConsent() !== 'true';
    this.setState({ open: cookie });
  }

  decline = () => {
    this.setState({ open: false });
  };

  accept = () => {
    setCookieConsent('true');
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    if (open === false) return <Fragment />;
    return (
      <CookiePopup
        open={open}
        accept={this.accept}
        decline={this.decline}
        allowtext="Allow cookies"
        // Set containerid only for this consent since some browser
        // plugins block this
        containerid="cookieconsent"
        content={
          <Typography variant="p" className="text-light">
            We use cookies to improve your experience and to analyze how our
            site is used.
            <br />
            <Link color="textPrimary" href="/about/cookies" passHref>
              <a className="text-light text-decoration-underline">Learn more</a>
            </Link>
          </Typography>
        }
      />
    );
  }
}

export default CookieConsent;
