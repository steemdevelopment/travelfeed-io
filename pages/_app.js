import React from "react";
import App, { Container } from "next/app";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import getPageContext from "../lib/getPageContext";
import { SnackbarProvider } from "notistack";
import NProgress from "nprogress";
import Router from "next/router";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";
import "../styles/bootstrap.min.css";
import "../styles/style.css";
import * as Sentry from "@sentry/browser";
import CookieConsent from "../components/CookieConsent/CookieConsent";
import { register, unregister } from "next-offline/runtime";
import { hasCookieConsent, getUser } from "../utils/token";
import ReactPiwik from "react-piwik";

new ReactPiwik({
  url: "https://matomo.travelfeed.io",
  siteId: 1,
  trackErrors: true,
  jsFilename: "matomo.js",
  phpFilename: "matomo.php"
});

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => {
  NProgress.start();
  ReactPiwik.push(["requireConsent"]);
  hasCookieConsent === "true" && ReactPiwik.push(["setConsentGiven"]);
  ReactPiwik.push(["setDocumentTitle", document.title]);
  ReactPiwik.push(["trackPageView"]);
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    Sentry.init({
      dsn: "https://599c03493c8248a992f0d4c2eface5be@sentry.io/1457776"
    });
    if (process.env.NODE_ENV === "production") register();
    ReactPiwik.push(["requireConsent"]);
    hasCookieConsent === "true" && ReactPiwik.push(["setConsentGiven"]);
    const user = getUser();
    user && ReactPiwik.push(["setUserId", user]);
    ReactPiwik.push(["trackPageView"]);
  }
  componentWillUnmount() {
    if (process.env.NODE_ENV === "production") unregister();
  }
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            {/* <Header /> */}
            <div style={{ paddingTop: "65px" }} />
            <SnackbarProvider maxSnack={3}>
              <ApolloProvider client={apollo}>
                <CookieConsent />
                <Component pageContext={this.pageContext} {...pageProps} />
              </ApolloProvider>
            </SnackbarProvider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
