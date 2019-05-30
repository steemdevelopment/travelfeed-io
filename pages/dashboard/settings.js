import Grid from '@material-ui/core/Grid';
import React, { Component, Fragment } from 'react';
import Settings from '../../components/Dashboard/Settings';
import NotFound from '../../components/General/NotFound';
import DashboardHeader from '../../components/Header/DashboardHeader';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';
import { getUser } from '../../helpers/token';

class SettingsPage extends Component {
  render() {
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
        <Head title="TravelBlog: Settings - TravelFeed: The Travel Community" />
        <div style={{ display: 'flex' }}>
          <DashboardHeader active="settings" />
          <main style={{ flexGrow: 1 }}>
            <Settings />
          </main>
        </div>
      </Fragment>
    );
  }
}

export default SettingsPage;
