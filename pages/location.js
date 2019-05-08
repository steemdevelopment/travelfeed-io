import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PostGrid from "../components/PostGrid";
import Header from "../components/Header";
import Head from "../components/Head";
import Typography from "@material-ui/core/Typography";

class Location extends Component {
  static async getInitialProps(props) {
    const { formatted_address } = props.query;
    const { country_code } = props.query;
    const locations = props.query.location_box.split(",");
    let location_box = [];
    locations.forEach(el => {
      location_box.push(parseFloat(el));
    });
    return {
      location_box,
      formatted_address,
      country_code
    };
  }
  render() {
    return (
      <Fragment>
        <Head
          title={`Name - TravelFeed: The Travel Community`}
          description={`Explore posts about Location name on TravelFeed.`}
        />
        <Header />
        <Typography
          variant="h4"
          align="center"
          gutterBottom={true}
          className="pt-5 pb-3"
        >
          {this.props.formatted_address}
        </Typography>
        <PostGrid
          query={{
            location_box: this.props.location_box,
            country_code: this.props.country_code,
            orderby: "curation_score DESC, total_votes DESC",
            limit: 8
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
  country_code: PropTypes.string
};

export default Location;
