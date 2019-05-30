import NextHead from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

const Head = ({ title, image, description, canonicalUrl }) => (
  <NextHead>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={`${title} - TravelFeed`} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:site_name" content="TravelFeed" />
    <link rel="canonical" href={canonicalUrl} />
  </NextHead>
);
// todo: if  canonical undefined no canonical!
Head.defaultProps = {
  image: undefined,
  description: undefined,
  canonicalUrl: undefined,
};

Head.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string,
  canonicalUrl: PropTypes.string,
};

export default Head;
