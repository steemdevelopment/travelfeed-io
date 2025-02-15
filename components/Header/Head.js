import NextHead from 'next/head';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { imageProxy } from '../../helpers/getImage';

const Head = ({ title, image, description, canonicalUrl, type }) => (
  <NextHead>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`${title} - TravelFeed`} />
    <meta name="twitter:description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content="TravelFeed" />
    {image && (
      <Fragment>
        <meta
          name="twitter:image"
          content={imageProxy(image, 1200, 630, undefined, 'jpeg')}
        />
        <meta
          property="og:image"
          content={imageProxy(image, 1200, 630, undefined, 'jpeg')}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
      </Fragment>
    )}
    {type && type.type === 'article' && (
      <Fragment>
        <meta property="article:published_time" content={type.published_time} />
        <meta property="article:section" content="Travel" />
        <meta property="og:type" content="article" />
        <meta property="article:tag" content={type.tags} />
        <meta property="article:author" content={type.author} />
      </Fragment>
    )}
    {type && type.type === 'profile' && (
      <Fragment>
        <meta property="og:type" content="profile" />
        <meta property="profile:first_name" content={type.display_name} />
        <meta property="profile:username" content={type.username} />
      </Fragment>
    )}
    <link rel="canonical" href={canonicalUrl} />
  </NextHead>
);
// todo: if  canonical undefined no canonical!
Head.defaultProps = {
  image: undefined,
  description:
    'Discover the best travel content on TravelFeed, the world-wide travel community!',
  canonicalUrl: undefined,
  type: undefined,
};

Head.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string,
  canonicalUrl: PropTypes.string,
  type: PropTypes.arrayOf(PropTypes.string),
};

export default Head;
