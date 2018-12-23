import React, { Component, Fragment } from "react";
import GoogleMapReact from "google-map-react";
import Typography from "@material-ui/core/Typography";

const AnyReactComponent = ({ text }) => (
  <div>
    <div className="pin" />
    <div className="pulse" />
    <style jsx>{`
      .pin {
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        background: #89849b;
        position: absolute;
        transform: rotate(-45deg);
        left: 50%;
        top: 50%;
        margin: -20px 0 0 -20px;
        animation-name: bounce;
        animation-fill-mode: both;
        animation-duration: 1s;
      }
      .pin:after {
        content: "";
        width: 14px;
        height: 14px;
        margin: 8px 0 0 8px;
        background: #2f2f2f;
        position: absolute;
        border-radius: 50%;
      }
      .pulse {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        height: 14px;
        width: 14px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: 11px 0px 0px -12px;
        transform: rotateX(55deg);
        z-index: -2;
      }
      .pulse:after {
        content: "";
        border-radius: 50%;
        height: 40px;
        width: 40px;
        position: absolute;
        margin: -13px 0 0 -13px;
        animation: pulsate 1s ease-out;
        animation-iteration-count: infinite;
        opacity: 0;
        box-shadow: 0 0 1px 2px #89849b;
        animation-delay: 1.1s;
      }
      @-moz-keyframes pulsate {
        0% {
          transform: scale(0.1, 0.1);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: scale(1.2, 1.2);
          opacity: 0;
        }
      }
      @-webkit-keyframes pulsate {
        0% {
          transform: scale(0.1, 0.1);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: scale(1.2, 1.2);
          opacity: 0;
        }
      }
      @-o-keyframes pulsate {
        0% {
          transform: scale(0.1, 0.1);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: scale(1.2, 1.2);
          opacity: 0;
        }
      }
      @keyframes pulsate {
        0% {
          transform: scale(0.1, 0.1);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: scale(1.2, 1.2);
          opacity: 0;
        }
      }
      @-moz-keyframes bounce {
        0% {
          opacity: 0;
          transform: translateY(-2000px) rotate(-45deg);
        }
        60% {
          opacity: 1;
          transform: translateY(30px) rotate(-45deg);
        }
        80% {
          transform: translateY(-10px) rotate(-45deg);
        }
        100% {
          transform: translateY(0) rotate(-45deg);
        }
      }
      @-webkit-keyframes bounce {
        0% {
          opacity: 0;
          transform: translateY(-2000px) rotate(-45deg);
        }
        60% {
          opacity: 1;
          transform: translateY(30px) rotate(-45deg);
        }
        80% {
          transform: translateY(-10px) rotate(-45deg);
        }
        100% {
          transform: translateY(0) rotate(-45deg);
        }
      }
      @-o-keyframes bounce {
        0% {
          opacity: 0;
          transform: translateY(-2000px) rotate(-45deg);
        }
        60% {
          opacity: 1;
          transform: translateY(30px) rotate(-45deg);
        }
        80% {
          transform: translateY(-10px) rotate(-45deg);
        }
        100% {
          transform: translateY(0) rotate(-45deg);
        }
      }
      @keyframes bounce {
        0% {
          opacity: 0;
          transform: translateY(-2000px) rotate(-45deg);
        }
        60% {
          opacity: 1;
          transform: translateY(30px) rotate(-45deg);
        }
        80% {
          transform: translateY(-10px) rotate(-45deg);
        }
        100% {
          transform: translateY(0) rotate(-45deg);
        }
      }
    `}</style>
  </div>
);

class SimpleMap extends Component {
  state = {
    center: this.props.location.coordinates,
    zoom: 7
  };

  render() {
    if (this.state.center.lat == 0.0) {
      return <div />;
    }
    return (
      // Important! Always set the container height explicitly
      <Fragment>
        <div className="text-center">
          <Typography variant="h5" className="p-2">
            Post Location:
          </Typography>
        </div>
        <div style={{ height: "250px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCcSWDf27U1epBvPVgSzLYqw0Z5FzNoOI4"
            }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
            <AnyReactComponent
              lat={this.state.center.lat}
              lng={this.state.center.lng}
              text={"Kreyser Avrora"}
            />
          </GoogleMapReact>
        </div>
        <hr />
      </Fragment>
    );
  }
}

export default SimpleMap;
