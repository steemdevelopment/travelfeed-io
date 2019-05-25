import React, { Component } from "react";
import PropTypes from "prop-types";

class PostImageHeader extends Component {
  state = {
    bgpos: "fixed",
    bgheight: "100%",
    bgmargin: "0px"
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
  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
  }
  render() {
    return (
      <div
        className="w-100"
        style={{
          height: this.state.bgheight,
          position: this.state.bgpos,
          marginTop: this.state.bgmargin,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0,0.3)), url("https://steemitimages.com/0x2000/${
            this.props.backgroundImage
          }")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover"
        }}
      />
    );
  }
}

PostImageHeader.propTypes = {
  backgroundImage: PropTypes.string
};

export default PostImageHeader;
