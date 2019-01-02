import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

class AppIcon extends Component {
  render() {
    const json = JSON.parse(this.props.post.json_metadata);
    const app = json.app != "undefined" ? json.app.split("/")[0] : "";
    if (app == "travelfeed") {
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
  post: PropTypes.object.isRequired
};

export default AppIcon;
