import React, { Fragment } from "react";
import Header from "./Header";
import Head from "next/head";
import PropTypes from "prop-types";

const Layout = props => (
  <Fragment>
    <Head>
      <title>TravelFeed</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>
    <Header />
    {props.children}
  </Fragment>
);

Layout.propTypes = {
  children: PropTypes.any
};

export default Layout;
