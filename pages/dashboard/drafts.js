import Grid from '@material-ui/core/Grid';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Drafts from '../../components/Dashboard/Drafts';
import NotFound from '../../components/General/NotFound';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';
import { getUser } from '../../helpers/token';

class DraftsPage extends Component {
  static async getInitialProps(props) {
    const { open } = props.query;
    return { open };
  }

  render() {
    const DashboardHeader = dynamic(
      () => import('../../components/Dashboard/DashboardMenu'),
      {
        ssr: false,
      },
    );
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
    return (
      <Fragment>
        <Head title="TravelBlog: Drafts - TravelFeed: The Travel Community" />
        <DashboardHeader active="drafts" content={<Drafts />} open={open} />
      </Fragment>
    );
  }
}

DraftsPage.defaultProps = {
  query: undefined,
  open: undefined,
};

DraftsPage.propTypes = {
  open: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  query: PropTypes.arrayOf(PropTypes.string),
};
export default DraftsPage;
