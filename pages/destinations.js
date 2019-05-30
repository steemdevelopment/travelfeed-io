// TODO: Create content for /destinations, especially for mobile view
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import DestinationHeader from '../components/Destinations/DestinationHeader';
import DestinationsPage from '../components/Destinations/DestinationsPage';
import PostGrid from '../components/Grid/PostGrid';
import Head from '../components/Header/Head';
import Header from '../components/Header/Header';
import { ccFromSlug, nameFromSlug } from '../helpers/countryCodes';

class Destinations extends Component {
  static async getInitialProps(props) {
    const { country } = props.query;
    const { subdivision } = props.query;
    const { city } = props.query;
    const { suburb } = props.query;
    return {
      country,
      subdivision,
      city,
      suburb,
    };
  }

  render() {
    const { country } = this.props;
    const countryName = nameFromSlug(country);
    const countryCode = ccFromSlug(country);
    const { subdivision } = this.props;
    const { city } = this.props;
    const { suburb } = this.props;
    if (!countryCode)
      return (
        <Fragment>
          <Head
            title="Destinations - TravelFeed: The Travel Community"
            description="Discover the best travel destinations on TravelFeed."
          />
          <Header />
          <DestinationsPage />
        </Fragment>
      );
    const title = `${(suburb && `${suburb}, ${city}`) ||
      (city && `${city}, ${countryName}`) ||
      (subdivision && `${subdivision}, ${countryName}`) ||
      countryName}`;
    return (
      <Fragment>
        <Head
          title={`${title} - TravelFeed: The Travel Community`}
          description={`Discover the best travel blog posts about ${suburb ||
            city ||
            subdivision ||
            countryName} on TravelFeed.`}
        />
        <Header />
        <DestinationHeader
          countrySlug={country}
          query={{ countryCode, subdivision, city }}
          title={`${(suburb && `${suburb}, ${city}`) ||
            (city && `${city}`) ||
            (subdivision && `${subdivision}`) ||
            countryName}`}
        />
        <PostGrid
          query={{
            limit: 8,
            orderby: 'curation_score DESC, total_votes DESC',
            countryCode,
            subdivision,
            city,
            suburb,
          }}
          grid={{ lg: 3, md: 4, sm: 6, xs: 12 }}
          cardHeight={170}
          poststyle="grid"
        />
      </Fragment>
    );
  }
}

Destinations.defaultProps = {
  subdivision: undefined,
  city: undefined,
  suburb: undefined,
};

Destinations.propTypes = {
  country: PropTypes.string.isRequired,
  subdivision: PropTypes.string,
  city: PropTypes.string,
  suburb: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  query: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Destinations;
