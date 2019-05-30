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
    const country_name = nameFromSlug(this.props.country);
    const country_code = ccFromSlug(this.props.country);
    const { subdivision } = this.props;
    const { city } = this.props;
    const { suburb } = this.props;
    if (!country_code)
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
      (city && `${city}, ${country_name}`) ||
      (subdivision && `${subdivision}, ${country_name}`) ||
      country_name}`;
    return (
      <Fragment>
        <Head
          title={`${title} - TravelFeed: The Travel Community`}
          description={`Discover the best travel blog posts about ${suburb ||
            city ||
            subdivision ||
            country_name} on TravelFeed.`}
        />
        <Header />
        <DestinationHeader
          country_slug={this.props.country}
          query={{ country_code, subdivision, city }}
          title={`${(suburb && `${suburb}, ${city}`) ||
            (city && `${city}`) ||
            (subdivision && `${subdivision}`) ||
            country_name}`}
        />
        <PostGrid
          query={{
            limit: 8,
            orderby: 'curation_score DESC, total_votes DESC',
            country_code,
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

Destinations.propTypes = {
  country: PropTypes.string,
  subdivision: PropTypes.string,
  city: PropTypes.string,
  suburb: PropTypes.string,
};

export default Destinations;
