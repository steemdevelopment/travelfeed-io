import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

class AppIcon extends Component {
  render() {
    if (this.props.is_travelfeed === true) {
      return (
        <Fragment>
          <img
            width="25"
            className="mr-1"
            src="https://travelfeed.io/favicon.ico"
          />
        </Fragment>
      );
    } else {
      return <Fragment />;
    }
  }
}

AppIcon.propTypes = {
  is_travelfeed: PropTypes.bool
};

export default AppIcon;
