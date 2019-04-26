import moment from "moment";
import React, { Fragment, Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";

class subHeader extends Component {
  render() {
    const time = (
      <Tooltip
        title={moment(this.props.created_at)
          .add(2, "hours")
          .toString()}
        placement="bottom"
      >
        <span>
          {moment(this.props.created_at)
            .add(2, "hours")
            .fromNow()}
        </span>
      </Tooltip>
    );
    let readtime = <Fragment />;
    if (this.props.readtime !== undefined) {
      readtime = (
        <Fragment>
          <span> | </span>
          <Tooltip
            title={`${this.props.readtime.words} words`}
            placement="bottom"
          >
            <span>{this.props.readtime.text}</span>
          </Tooltip>
        </Fragment>
      );
    }

    return (
      <Fragment>
        {time}
        {readtime}
      </Fragment>
    );
  }
}

subHeader.propTypes = {
  created_at: PropTypes.string,
  readtime: PropTypes.object
};

export default subHeader;
