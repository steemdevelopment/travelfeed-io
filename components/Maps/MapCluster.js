import dynamic from 'next/dynamic';
import React, { Component } from 'react';
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl';
import { MAPBOX_TOKEN } from '../../config';
import Cluster from './Cluster';
import MapCard from './MapCard';
import MarkerSmall from './MarkerSmall';
import PinGroup from './PinGroup';

const Geocoder = dynamic(() => import('react-map-gl-geocoder'), {
  ssr: false,
});

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px',
};

class MapCluster extends Component {
  state = {
    viewport: {
      width: 1400,
      height: 700,
      latitude: 0,
      longitude: 0,
      zoom: 1,
    },
    map: undefined,
  };

  mapRef = React.createRef();

  setPopupList(popupInfo) {
    this.setState({ popupInfo });
    // this.renderPopup();
  }

  handleViewportChange = viewport => {
    this.setState(prevState => ({
      viewport: { ...prevState.viewport, ...viewport },
    }));
  };

  //   Faster speed
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

  renderPopup() {
    const { popupInfo } = this.state;
    return (
      popupInfo && (
        <Popup
          offsetLeft={popupInfo.posts === undefined ? 0 : -8}
          offsetTop={popupInfo.posts === undefined ? 0 : -8}
          captureScroll
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick
          onClose={() => this.setState({ popupInfo: undefined })}
        >
          <MapCard info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { map, viewport } = this.state;
    return (
      <div id="container" style={{ height: '350px' }}>
        {
          <Geocoder
            mapRef={this.mapRef}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        }
        <ReactMapGL
          className="h-100 w-100"
          style={{ width: '100%' }}
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          ref={this.mapRef}
          onLoad={() => this.setState({ map: this.mapRef.current.getMap() })}
          {...viewport}
        >
          {map && (
            <>
              <Cluster
                map={map}
                // radius={20}
                // extent={512}
                // nodeSize={40}
                element={clusterProps => (
                  <PinGroup
                    // onViewportChange={onViewportChange}
                    {...clusterProps}
                    setPopupList={this.setPopupList.bind(this)}
                  />
                )}
              >
                {this.props.data.map((point, i) => (
                  <Marker
                    key={i}
                    longitude={point.longitude}
                    latitude={point.latitude}
                    author={point.author}
                    permlink={point.permlink}
                    title={point.title}
                    img_url={point.img_url}
                  >
                    <MarkerSmall
                      size={20}
                      onClick={() => this.setState({ popupInfo: point })}
                    />{' '}
                  </Marker>
                ))}
              </Cluster>
            </>
          )}
          {this.renderPopup()}
          <div className="nav" style={navStyle}>
            <NavigationControl
              onViewportChange={this.updateViewport}
              showCompass={false}
            />
            <GeolocateControl
              onViewportChange={this.handleViewportChange}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation
            />
          </div>
        </ReactMapGL>
      </div>
    );
  }
}

export default MapCluster;
