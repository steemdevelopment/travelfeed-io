import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MAPBOX_TOKEN } from '../../config';
import { round } from '../../helpers/math';
import MapMarker from '../Maps/Marker';

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px',
};

class LocationPickerDialog extends Component {
  state = {
    width: 200,
    height: 200,
    viewport: {
      latitude: 30,
      longitude: 0,
      zoom: 1,
      bearing: 0,
      pitch: 0,
    },
    marker: {
      latitude: 30,
      longitude: 0,
    },
    events: {},
  };

  mapRef = React.createRef();

  componentDidMount() {
    const width = document.getElementById('container').clientWidth;
    const height = document.getElementById('container').clientHeight;
    this.setState({ width, height });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  updateViewport = event => {
    this.logDragEvent('onDragEnd', event);
    this.setState({
      marker: {
        longitude: round(event.lngLat[0], 4),
        latitude: round(event.lngLat[1], 4),
      },
    });
  };

  updateViewport = viewport => {
    this.setState({ viewport });
  };

  resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  handleViewportChange = viewport => {
    if (viewport.longitude && viewport.longitude) {
      this.setState({
        marker: {
          latitude: round(viewport.latitude, 4),
          longitude: round(viewport.longitude, 4),
        },
      });
    }
    this.setState(prevState => ({ ...prevState.viewport, ...viewport }));
  };

  //   Faster speed
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

  logDragEvent(name, event) {
    this.setState(prevState => ({
      events: {
        ...prevState.events,
        [name]: event.lngLat,
      },
    }));
  }

  render() {
    const { viewport, marker } = this.state;
    // console.log(viewport);
    viewport.width = this.state.width;
    viewport.height = this.state.height;
    return (
      <Fragment>
        <DialogTitle id="alert-dialog-title">
          Pick the location of your post: {this.state.marker.latitude}
          {', '}
          {this.state.marker.longitude}
          <Tooltip
            title="Drag the marker, use the search field or click on the GPS icon to pick a location."
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '10px',
            }}
          >
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent>
          <div id="container" style={{ height: '400px' }}>
            <MapGL
              ref={this.mapRef}
              {...viewport}
              onViewportChange={this.updateViewport}
              mapboxApiAccessToken={MAPBOX_TOKEN}
            >
              <Geocoder
                mapRef={this.mapRef}
                onViewportChange={this.handleGeocoderViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
              />
              <Marker
                longitude={marker.longitude}
                latitude={marker.latitude}
                offsetTop={-20}
                offsetLeft={-10}
                draggable
                onDragEnd={this.updateViewport}
              >
                <MapMarker />
              </Marker>
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
            </MapGL>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.props.onPick({
                latitude: this.state.marker.latitude,
                longitude: this.state.marker.longitude,
              });
              this.props.handleClose();
            }}
            variant="contained"
            color="primary"
            autoFocus
          >
            Pick
          </Button>
        </DialogActions>
      </Fragment>
    );
  }
}

LocationPickerDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  onPick: PropTypes.func.isRequired,
};

export default LocationPickerDialog;
