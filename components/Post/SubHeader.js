import Tooltip from '@material-ui/core/Tooltip';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

dayjs.extend(relativeTime, LocalizedFormat); // use plugin

const SubHeader = props => {
  const { created_at, readtime } = props;
  const createdAt = dayjs(created_at);
  const time = (
    <Tooltip title={createdAt.format('MMMM DD YYYY H:mm')} placement="bottom">
      <span>
        {createdAt.isBefore(
          dayjs()
            .startOf('month')
            .add(-1, 'month'),
        )
          ? createdAt.format('MMMM YYYY')
          : createdAt.fromNow()}
      </span>
    </Tooltip>
  );
  let readingTime = <Fragment />;
  if (readtime !== undefined) {
    readingTime = (
      <Fragment>
        <span> | </span>
        <Tooltip title={`${readtime.words} words`} placement="bottom">
          <span>{readtime.text}</span>
        </Tooltip>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {time}
      {readingTime}
    </Fragment>
  );
};

SubHeader.defaultProps = {
  readtime: undefined,
};

SubHeader.propTypes = {
  created_at: PropTypes.string.isRequired,
  readtime: PropTypes.objectOf(PropTypes.any),
};

export default SubHeader;
