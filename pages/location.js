import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import DestinationHeader from '../components/Destinations/DestinationHeader';
import PostGrid from '../components/Grid/PostGrid';
import Head from '../components/Header/Head';
import Header from '../components/Header/Header';
import { slugFromCC } from '../helpers/countryCodes';

class Location extends Component {
  static async getInitialProps(props) {
    const { formatted_address, country_code, showlocations } = props.query;
    const locations = props.query.location_box.split(',');
    const location_box = [];
    locations.forEach(el => {
      location_box.push(parseFloat(el));
    });

    return {
      location_box,
      formatted_address,
      country_code,
      showlocations,
    };
  }

  render() {
    const showLocations =
      this.props.showlocations === 'true' ? this.props.country_code : undefined;
    console.log(showLocations);
    return (
      <Fragment>
        <Head
          title={`${
            this.props.formatted_address
          } - TravelFeed: The Travel Community`}
          description={`Explore posts about ${
            this.props.formatted_address
          } on TravelFeed.`}
        />
        <Header />
        <DestinationHeader
          query={{
            search: this.props.formatted_address,
            country_code: showLocations,
          }}
          title={this.props.formatted_address}
          country_slug={slugFromCC(this.props.country_code)}
        />
        <PostGrid
          query={{
            location_box: this.props.location_box,
            country_code: this.props.country_code,
            orderby: 'curation_score DESC, total_votes DESC',
            limit: 8,
          }}
          grid={{ lg: 3, md: 4, sm: 6, xs: 12 }}
          cardHeight={170}
          poststyle="grid"
        />
      </Fragment>
    );
  }
}

Location.propTypes = {
  query: PropTypes.object,
  formatted_address: PropTypes.string,
  location_box: PropTypes.arrayOf(PropTypes.number),
  country_code: PropTypes.string,
};

export default Location;
