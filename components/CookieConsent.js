import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { hasCookieConsent, setCookieConsent } from "../utils/token";
import { teal, indigo } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

class NavSide extends Component {
  state = {
    open: false,
    optin: false,
    acceptColor: 600,
    declineColor: 600
  };
  componentDidMount() {
    const cookie = hasCookieConsent() !== "true";
    this.setState({ open: cookie, optin: !cookie });
  }
  decline() {
    this.setState({ open: false });
    const _paq = window._paq || [];
    _paq.push(["forgetConsentGiven"]);
  }
  accept() {
    setCookieConsent("true");
    this.setState({ open: false, optin: true });
  }
  render() {
    if (this.state.optin) {
      // Matomo tracking
      const _paq = window._paq || [];
      _paq.push(["setConsentGiven"]);
      _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
      _paq.push(["setCookieDomain", ".travelfeed.io"]);
      _paq.push(["setDomains", ["*.travelfeed.io"]]);
      _paq.push(["trackPageView"]);
      _paq.push(["enableLinkTracking"]);
      (function() {
        var u = "//for91days.com/piwik/";
        _paq.push(["setTrackerUrl", u + "matomo.php"]);
        _paq.push(["setSiteId", "2"]);
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
      <div
        style={{
          position: "fixed",
          bottom: "0px",
          left: "0px",
          zIndex: 99999999999
        }}
      >
        <div className="container" id="cookieconsent">
          <div className="row">
            <div
              style={{ width: "20px" }}
              className="d-none d-xl-block d-lg-block d-md-block d-sm-block"
            />
            <div
              className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12 text-light p-3"
              style={{ background: indigo[600] }}
            >
              <Typography variant="p" className="text-light">
                We and our partners use cookies to improve your experience and
                to analyse how our site is used.
                <br />
                <Link href={`/about/cookies`} passHref>
                  <a className="text-light text-decoration-underline">
                    Learn more
                  </a>
                </Link>
              </Typography>
            </div>
          </div>
          <div className="row">
            <div
              style={{ width: "20px" }}
              className="d-none d-xl-block d-lg-block d-md-block d-sm-block"
            />
            <div
              onClick={() => this.decline()}
              className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 cpointer text-light text-center font-weight-bold p-2"
              style={{ background: indigo[this.state.declineColor] }}
              onMouseEnter={() => this.setState({ declineColor: 800 })}
              onMouseLeave={() => this.setState({ declineColor: 600 })}
            >
              <Typography variant="p" className="text-light">
                Decline
              </Typography>
            </div>
            <div
              onClick={() => this.accept()}
              className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 cpointer text-light text-center font-weight-bold p-2"
              onMouseEnter={() => this.setState({ acceptColor: 800 })}
              onMouseLeave={() => this.setState({ acceptColor: 600 })}
              style={{ background: teal[this.state.acceptColor] }}
            >
              <Typography variant="p" className="text-light">
                Allow cookies
              </Typography>
            </div>
            <div
              style={{ height: "20px" }}
              className="d-none d-xl-block d-lg-block d-md-block d-sm-block col-12 text-light"
            />
          </div>
        </div>
      </div>
    );
  }
}

NavSide.propTypes = {
  user: PropTypes.string
};

export default NavSide;
