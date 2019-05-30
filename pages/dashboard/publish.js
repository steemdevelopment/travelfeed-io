import Grid from '@material-ui/core/Grid';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import NotFound from '../../components/General/NotFound';
import DashboardHeader from '../../components/Header/DashboardHeader';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';
import { getUser } from '../../helpers/token';

class PublishPage extends Component {
  static async getInitialProps(props) {
    const { id, savedate, title, body, json, isCodeEditor } = props.query;
    return {
      edit: {
        id,
        savedate,
        title,
        body,
        json,
        isCodeEditor,
      },
    };
  }

  render() {
    const { edit } = this.props;

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
    const Publish = dynamic(
      () => import('../../components/Dashboard/Publish'),
      {
        ssr: false,
      },
    );
    return (
      <Fragment>
        <Head title="TravelBlog: Publish - TravelFeed: The Travel Community" />
        <div style={{ display: 'flex' }}>
          <DashboardHeader active="publish" />
          <main style={{ flexGrow: 1 }}>
            <Publish edit={edit} />
          </main>
        </div>
      </Fragment>
    );
  }
}

PublishPage.propTypes = {
  edit: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  query: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default PublishPage;
