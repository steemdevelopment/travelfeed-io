import 'mapbox-gl/dist/mapbox-gl.css';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl';
import { MAPBOX_TOKEN } from '../../config';
import '../Editor/react-map-gl-geocoder/react-map-gl-geocoder.css';
import Cluster from './Cluster';
import MapCard from './MapCard';
import MarkerSmall from './MarkerSmall';
import PinGroup from './PinGroup';

const Geocoder = dynamic(() => import('react-map-gl-geocoder'), {
  ssr: false,
});

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

  componentDidMount() {
    const width = document.getElementById('container').clientWidth;
    const height = document.getElementById('container').clientHeight - 30;
    this.setState({
      viewport: {
        width,
        height,
        latitude: 0,
        longitude: 0,
        zoom: 1,
      },
    });
  }

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
        <>
          <Popup
            offsetLeft={popupInfo.posts === undefined ? 0 : 3}
            offsetTop={popupInfo.posts === undefined ? 0 : 8}
            captureScroll
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick
            onClose={() => this.setState({ popupInfo: undefined })}
          >
            <MapCard info={popupInfo} />
          </Popup>
        </>
      )
    );
  }

  render() {
    const { map, viewport } = this.state;
    return (
      <div
        id="container"
        style={{
          height: '100%',
          width: '100%',
          position: 'fixed',
          background: '#343332',
        }}
      >
        <ReactMapGL
          mapStyle={
            this.props.dark ? 'mapbox://styles/mapbox/dark-v9' : undefined
          }
          onViewportChange={viewport => this.setState({ viewport })}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          ref={this.mapRef}
          onLoad={() => this.setState({ map: this.mapRef.current.getMap() })}
          {...viewport}
        >
          {map && (
            <>
              <Geocoder
                mapRef={this.mapRef}
                onViewportChange={this.handleGeocoderViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
              />
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
          <div className="nav">
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
          <style jsx>{`
            .nav {
              position: absolute;
              top: 0;
              left: 0;
              padding: 10px;
            }
          `}</style>
        </ReactMapGL>
      </div>
    );
  }
}

MapCluster.defaultProps = {
  dark: false,
};

MapCluster.propTypes = {
  dark: PropTypes.bool,
};

export default MapCluster;
