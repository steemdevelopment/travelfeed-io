import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import React, { Fragment, Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";

dayjs.extend(relativeTime, LocalizedFormat); // use plugin

class subHeader extends Component {
  render() {
    const created_at = dayjs(this.props.created_at);
    const time = (
      <Tooltip
        title={created_at.format("MMMM DD YYYY H:mm")}
        placement="bottom"
      >
        <span>{created_at.fromNow()}</span>
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
