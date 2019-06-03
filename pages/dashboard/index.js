import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import DashboardHeader from '../../components/Dashboard/DashboardMenu';
import Stats from '../../components/Dashboard/Stats';
import NotFound from '../../components/General/NotFound';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';
import { getUser } from '../../helpers/token';

class StatsPage extends Component {
  static async getInitialProps(props) {
    const { open } = props.query;
    return { open };
  }

  render() {
    const { open } = this.props;
    if (getUser() === null || !getUser()) {
      return (
        <Fragment>
          <Header />
          <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
            className="pt-4 pb-4"
            style={{ paddingLeft: '75px' }}
          >
            <Grid item lg={7} md={8} sm={11} xs={12}>
              <NotFound statusCode="logged_out" />
            </Grid>
          </Grid>
        </Fragment>
      );
    }
    if (!getUser()) {
      return <Fragment />;
    }
    return (
      <Fragment>
        <Head title="TravelBlog: Stats - TravelFeed: The Travel Community" />
        <DashboardHeader active="stats" content={<Stats />} open={open} />
      </Fragment>
    );
  }
}

StatsPage.defaultProps = {
  query: undefined,
  open: undefined,
};

StatsPage.propTypes = {
  open: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  query: PropTypes.arrayOf(PropTypes.string),
};
export default StatsPage;
