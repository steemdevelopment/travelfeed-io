import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import NotFound from '../components/General/NotFound';
import Header from '../components/Header/Header';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <NotFound statusCode={this.props.statusCode} />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number,
};
