import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { teal, indigo } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";

class CookiePopup extends Component {
  state = {
    acceptColor: 600,
    declineColor: 600
  };
  render() {
    if (this.props.open === false) return <Fragment />;
    return (
      <div
        style={{
          position: "fixed",
          bottom: "0px",
          left: "0px",
          zIndex: 99999999999
        }}
      >
        <div className="container" id={this.props.containerid}>
          <div className="row">
            <div
              style={{ width: "20px" }}
              className="d-none d-xl-block d-lg-block d-md-block d-sm-block"
            />
            <div
              className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12 text-light p-3"
              style={{ background: indigo[600] }}
            >
              {this.props.content}
            </div>
          </div>
          <div className="row">
            <div
              style={{ width: "20px" }}
              className="d-none d-xl-block d-lg-block d-md-block d-sm-block"
            />
            <div
              onClick={() => this.props.decline()}
              className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 cpointer text-light text-center font-weight-bold p-2"
              style={{ background: indigo[this.state.declineColor] }}
              onMouseEnter={() => this.setState({ declineColor: 800 })}
              onMouseLeave={() => this.setState({ declineColor: 600 })}
            >
              <Typography variant="p" className="text-light">
                Decline
              </Typography>
            </div>
            <div
              onClick={() => this.props.accept()}
              className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 cpointer text-light text-center font-weight-bold p-2"
              onMouseEnter={() => this.setState({ acceptColor: 800 })}
              onMouseLeave={() => this.setState({ acceptColor: 600 })}
              style={{ background: teal[this.state.acceptColor] }}
            >
              <Typography variant="p" className="text-light">
                {this.props.allowtext}
              </Typography>
            </div>
            <div
              style={{ height: "20px" }}
              className="d-none d-xl-block d-lg-block d-md-block d-sm-block col-12 text-light"
            />
          </div>
        </div>
      </div>
    );
  }
}

CookiePopup.defaultProps = {
  id: ""
};

CookiePopup.propTypes = {
  open: PropTypes.bool,
  id: PropTypes.string,
  allowtext: PropTypes.string,
  content: PropTypes.string,
  accept: PropTypes.func,
  decline: PropTypes.func
};

export default CookiePopup;
