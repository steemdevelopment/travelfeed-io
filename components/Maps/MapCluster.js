// Popups: https://github.com/uber/react-map-gl/blob/4.1-release/examples/controls/src/city-pin.js Copyright (c) 2015 Uber Technologies, Inc.
// Cluster: https://github.com/urbica/react-map-gl-cluster Copyright (c) 2017 Urbica Design
import MapGL, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
// Todo: Maybe fork and adapt to uber's react-map-gl to make use of Geocoder?
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MAPBOX_TOKEN } from '../../config';
import MapCard from './MapCard';
import MarkerSmall from './MarkerSmall';

const style = {
  width: '20px',
  height: '20px',
  color: '#fff',
  background: '#1978c8',
  borderRadius: '20px',
  textAlign: 'center',
};

class MapCluster extends Component {
  state = {
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 1,
    },
    popupInfo: null,
  };

  renderPopup() {
    const { popupInfo } = this.state;
    return (
      popupInfo && (
        <Popup
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick
          offset={[-9.8, -9]}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <MapCard info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const ClusterMarker = args => (
      <Marker longitude={args.longitude} latitude={args.latitude}>
        <div style={{ ...style, background: '#f28a25' }}>{args.pointCount}</div>
      </Marker>
    );
    const { viewport } = this.state;
    return (
      <div className="fullheight w-100">
        <MapGL
          className="h-100 w-100"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          accessToken={MAPBOX_TOKEN}
          // eslint-disable-next-line no-shadow
          onViewportChange={viewport => this.setState({ viewport })}
          {...viewport}
        >
          <Cluster
            // Todo: Cluster pop-up with subitems
            radius={40}
            extent={512}
            nodeSize={64}
            component={ClusterMarker}
          >
            {this.props.data.map(point => (
              <Marker
                key={point.latitude + point.longitude}
                latitude={point.latitude}
                longitude={point.longitude}
              >
                <MarkerSmall
                  size={20}
                  onClick={() => this.setState({ popupInfo: point })}
                />
              </Marker>
            ))}
          </Cluster>
          {this.renderPopup()}
          <NavigationControl showZoom position="top-left" />
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-right" />
        </MapGL>
      </div>
    );
  }
}

MapCluster.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MapCluster;
