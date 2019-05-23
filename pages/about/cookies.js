import React, { Component, Fragment } from "react";
import Head from "../../components/Head";
import Header from "../../components/Header";
import AboutSelect from "../../components/About/AboutSelect";
import HeaderCard from "../../components/General/HeaderCard";
import { indigo } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Cookies from "../../components/About/Texts/Terms";
import {
  hasCookieConsent,
  setCookieConsent,
  deleteCookieConsent
} from "../../utils/token";
import Button from "@material-ui/core/Button";

class About extends Component {
  state = {
    optin: false
  };
  decline() {
    this.setState({ optin: false });
    deleteCookieConsent();
  }
  accept() {
    setCookieConsent("true");
    this.setState({ optin: true });
  }
  componentDidMount() {
    const cookie = hasCookieConsent() === "true";
    this.setState({ optin: cookie });
  }
  render() {
    const title = "Cookies";
    return (
      <Fragment>
        <Header subheader={title} />
        <Head title={`${title} - TravelFeed: The Travel Community`} />
        <AboutSelect selection={3} />
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <HeaderCard
              title={title}
              background={indigo[600]}
              content={<Cookies />}
            />
          </Grid>
          <Grid item lg={7} md={8} sm={11} xs={12} className="pt-3">
            <HeaderCard
              title="Change Cookie Consent"
              background={indigo[600]}
              content={
                <Fragment>
                  <p>
                    {" "}
                    Your current cookie Settings are:{" "}
                    {(this.state.optin && (
                      <Fragment>
                        <strong>You are opted in.</strong>{" "}
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => this.decline()}
                        >
                          Opt out
                        </Button>{" "}
                        <em>
                          Cookies that are already set will not be revoked by
                          this.
                        </em>
                      </Fragment>
                    )) || (
                      <Fragment>
                        <strong>You are opted out.</strong>{" "}
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => this.accept()}
                        >
                          Opt in
                        </Button>
                      </Fragment>
                    )}
                  </p>
                  <p>
                    These option only applies to EU-users. If you are accessing
                    this page from outside the EU, pressing the "opt out" button
                    will have no effect since you are opted in by default on
                    every page load. You can change this by updating your
                    browser's cookie settings.
                  </p>
                </Fragment>
              }
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default About;
