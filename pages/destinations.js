import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PostGrid from "../components/PostGrid";
import Header from "../components/Header";
import Head from "../components/Head";
import Typography from "@material-ui/core/Typography";
import { ccFromSlug, nameFromSlug } from "../helpers/country_codes";
import NotFound from "../components/NotFound";
import Sublocations from "../components/Destinations/Sublocations";

class Destinations extends Component {
  static async getInitialProps(props) {
    let { country } = props.query;
    let { subdivision } = props.query;
    let { city } = props.query;
    let { suburb } = props.query;
    return {
      country,
      subdivision,
      city,
      suburb
    };
  }
  render() {
    const country_name = nameFromSlug(this.props.country);
    const country_code = ccFromSlug(this.props.country);
    const subdivision = this.props.subdivision;
    const city = this.props.city;
    const suburb = this.props.suburb;
    if (!country_code) {
      return (
        <Fragment>
          <Header />
          <NotFound statusCode={404} />
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Head
          title={`${(suburb && `${suburb}, ${city}`) ||
            (city && `${city}, ${country_name}`) ||
            (subdivision && `${subdivision}, ${country_name}`) ||
            country_name} - TravelFeed: The Travel Community`}
          description={`Discover posts about ${suburb ||
            city ||
            subdivision ||
            country_name} on TravelFeed.`}
        />
        <Header />
        <Typography
          variant="h4"
          align="center"
          gutterBottom={true}
          className="pt-5 pb-3"
        >
          {`${(suburb && `${suburb}, ${city}`) ||
            (city && `${city}, ${country_name}`) ||
            (subdivision && `${subdivision}, ${country_name}`) ||
            country_name}`}
        </Typography>
        {!city && !suburb && (
          <Sublocations
            country_slug={this.props.country}
            query={{ country_code, subdivision, city }}
          />
        )}
        <PostGrid
          query={{
            limit: 8,
            orderby: "curation_score DESC, total_votes DESC",
            country_code,
            subdivision,
            city,
            suburb
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
  suburb: PropTypes.string
};

export default Destinations;
