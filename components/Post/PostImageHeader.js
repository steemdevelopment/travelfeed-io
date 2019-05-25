import React, { Component } from "react";
import PropTypes from "prop-types";

class PostImageHeader extends Component {
  state = {
    bgpos: "fixed",
    bgheight: "100%",
    bgmargin: "0px",
    windowWidth: 10,
    opacity: 0
  };
  listenScrollEvent = () => {
    if (window.scrollY > 500) {
      this.setState({
        bgpos: "absolute",
        bgheight: window.innerHeight,
        bgmargin: "500px"
      });
    } else {
      this.setState({
        bgpos: "fixed",
        bgheight: window.innerHeight,
        bgmargin: "0px"
      });
    }
  };
  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenScrollEvent);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
    this.setState({
      windowWidth: (Math.round(window.innerWidth / 640) + 1) * 640,
      opacity: 1
    });
  }
  render() {
    return (
      <div
        className="w-100"
        style={{
          height: this.state.bgheight,
          position: this.state.bgpos,
          marginTop: this.state.bgmargin,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0,0.3)), url("https://steemitimages.com/0x10/${
            this.props.backgroundImage
          }")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover"
        }}
      >
        <div
          className="w-100"
          style={{
            height: "100%",
            position: "absolute",
            marginTop: "0px",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0,0.3)), url("https://steemitimages.com/0x${
              this.state.windowWidth
            }/${this.props.backgroundImage}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            opacity: this.state.opacity,
            transition: "opacity 2s linear"
          }}
        />
      </div>
    );
  }
}

PostImageHeader.propTypes = {
  backgroundImage: PropTypes.string
};

export default PostImageHeader;
