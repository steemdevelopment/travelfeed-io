import { teal } from '@material-ui/core/colors';
import * as Sentry from '@sentry/node';
import Document, { Head, Main, NextScript } from 'next/document';
import PropTypes from 'prop-types';
import React from 'react';
import flush from 'styled-jsx/server';

process.on('unhandledRejection', err => {
  Sentry.captureException(err);
});

process.on('uncaughtException', err => {
  Sentry.captureException(err);
});

export default class extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/safari-pinned-tab.svg"
            color={teal[800]}
          />
          <meta name="msapplication-TileColor" content={teal[800]} />
          <meta name="theme-color" content={teal[800]} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://steemitimages.com" />
          <link rel="preconnect" href="https://maps.googleapis.com" />
          <link rel="preconnect" href="https://matomo.travelfeed.io" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript>
            <img
              alt=""
              src="https://matomo.travelfeed.io/matomo.php?idsite=1&amp;rec=1"
            />
          </noscript>
        </body>
      </html>
    );
  }
}

Document.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page
  // with collected side effects.

  let pageContext;
  const page = ctx.renderPage(Component => {
    const WrappedComponent = props => {
      ({ pageContext } = props);
      return <Component {...props} />;
    };

    WrappedComponent.propTypes = {
      pageContext: PropTypes.objectOf(PropTypes.any).isRequired,
    };

    return WrappedComponent;
  });

  return {
    ...page,
    pageContext,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: pageContext.sheetsRegistry.toString(),
          }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  };
};
