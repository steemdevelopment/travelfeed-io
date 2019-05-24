import React, { Component, Fragment } from "react";
import { hasCookieConsent, setCookieConsent } from "../../utils/token";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import CookiePopup from "./CookiePopup";

class CookieConsent extends Component {
  state = {
    open: false,
    optin: false
  };
  componentDidMount() {
    const cookie = hasCookieConsent() !== "true";
    this.setState({ open: cookie, optin: !cookie });
  }
  decline() {
    this.setState({ open: false });
  }
  accept() {
    setCookieConsent("true");
    this.setState({ open: false, optin: true });
  }
  render() {
    if (this.state.optin) {
      var _paq = window._paq || [];
      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
      _paq.push(["trackPageView"]);
      _paq.push(["enableLinkTracking"]);
      (function() {
        var u = "https://matomo.travelfeed.io/";
        _paq.push(["setTrackerUrl", u + "matomo.php"]);
        _paq.push(["setSiteId", "1"]);
        var d = document,
          g = d.createElement("script"),
          s = d.getElementsByTagName("script")[0];
        g.type = "text/javascript";
        g.async = true;
        g.defer = true;
        g.src = u + "matomo.js";
        s.parentNode.insertBefore(g, s);
      })();
    }
    if (this.state.open === false) return <Fragment />;
    return (
      <CookiePopup
        open={this.state.open}
        accept={this.accept.bind(this)}
        decline={this.decline.bind(this)}
        allowtext="Allow cookies"
        // Set containerid only for this consent since some browser plugins block this
        containerid="cookieconsent"
        content={
          <Typography variant="p" className="text-light">
            We use cookies to improve your experience and to analyze how our
            site is used.
            <br />
            <Link href={`/about/cookies`} passHref>
              <a className="text-light text-decoration-underline">Learn more</a>
            </Link>
          </Typography>
        }
      />
    );
  }
}

export default CookieConsent;
