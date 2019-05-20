import React, { Component, Fragment } from "react";
import Head from "../components/Head";
import Header from "../components/Header";
import Map from "../components/Maps/MapCluster";
import { Query } from "react-apollo";
import { GET_PLACES } from "../helpers/graphql/places";

class About extends Component {
  render() {
    const title = "Map";
    return (
      <Fragment>
        <Header subheader={title} />
        <Head title={`${title} - TravelFeed: The Travel Community`} />
        {
          // Fetches all posts with a location and a minimum upvote of 50%. Not-curated posts are not displayed since they are usually less relevant.
        }
        <Query query={GET_PLACES}>
          {({ data }) => {
            if (data && data.places) {
              return <Map data={data && data.places} />;
            }
            return <Fragment />;
          }}
        </Query>
      </Fragment>
    );
  }
}

export default About;
