import IconButton from '@material-ui/core/IconButton';
import CurateIcon from '@material-ui/icons/Star';
import HonourIcon from '@material-ui/icons/StarHalf';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

class IsCurated extends Component {
  render() {
    if (this.props.curation_score > 8000) {
      return (
        <Fragment>
          <IconButton>
            <CurateIcon onClick={this.handleClickOpen} />
          </IconButton>
        </Fragment>
      );
    }
    if (this.props.curation_score > 4000) {
      return (
        <Fragment>
          <IconButton>
            <HonourIcon onClick={this.handleClickOpen} />
          </IconButton>
        </Fragment>
      );
    }
    return <Fragment />;
  }
}

IsCurated.propTypes = {
  curation_score: PropTypes.number.isRequired,
};

export default IsCurated;
