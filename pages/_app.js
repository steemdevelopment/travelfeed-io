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
import CookieConsent from "../components/CookieConsent";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
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
