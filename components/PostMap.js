import React, { Component, Fragment } from "react";
import GoogleMapReact from "google-map-react";
import { GMAPS_JS_APIKEY } from "../config";
import PropTypes from "prop-types";
import MapMarker from "./Maps/Marker";

class PostMap extends Component {
  state = {
    center: this.props.location.coordinates,
    zoom: 7
  };

  render() {
    if (this.state.center.lat === null || this.state.center.lng === null) {
      return <Fragment />;
    }
    return (
      // Important! Always set the container height explicitly
      <Fragment>
        <div style={{ height: "250px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: GMAPS_JS_APIKEY
            }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
            <MapMarker
              lat={this.state.center.lat}
              lng={this.state.center.lng}
            />
          </GoogleMapReact>
        </div>
      </Fragment>
    );
  }
}

PostMap.propTypes = {
  location: PropTypes.object.isRequired
};

export default PostMap;
