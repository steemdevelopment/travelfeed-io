import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

const Header = ({ title, image, description, canonicalUrl }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title + " - TravelFeed"} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:site_name" content="TravelFeed" />
    <link rel="canonical" href={canonicalUrl} />
  </Head>
);
// todo: if  canonical undefined no canonical!

Header.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  canonicalUrl: PropTypes.string
};

export default Header;
