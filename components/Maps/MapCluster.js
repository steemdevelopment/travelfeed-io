import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { MAPBOX_TOKEN } from '../../config';
import Cluster from './Cluster';
import MarkerSmall from './MarkerSmall';
import PinGroup from './PinGroup';

class MapCluster extends Component {
  state = {
    viewport: {
      width: 1400,
      height: 1000,
      latitude: 0,
      longitude: 0,
      zoom: 1,
    },
    map: undefined,
  };

  render() {
    const { map } = this.state;
    return (
      <div id="container" style={{ height: '350px' }}>
        <ReactMapGL
          className="h-100 w-100"
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          ref={ref => (this.mapRef = ref)}
          onLoad={() => this.setState({ map: this.mapRef.getMap() })}
        >
          {map && (
            <Cluster
              map={map}
              radius={20}
              extent={512}
              nodeSize={40}
              element={clusterProps => (
                <PinGroup
                  // onViewportChange={onViewportChange}
                  {...clusterProps}
                />
              )}
            >
              {this.props.data.map((point, i) => (
                <Marker
                  key={i}
                  longitude={point.longitude}
                  latitude={point.latitude}
                >
                  <MarkerSmall
                    size={20}
                    onClick={() => this.setState({ popupInfo: point })}
                  />{' '}
                </Marker>
              ))}
            </Cluster>
          )}
        </ReactMapGL>
      </div>
    );
  }
}

export default MapCluster;
