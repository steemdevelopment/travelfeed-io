import Grid from '@material-ui/core/Grid';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import NotFound from '../../components/General/NotFound';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';
import { getUser } from '../../helpers/token';

class PublishPage extends Component {
  static async getInitialProps(props) {
    const { id, savedate, title, body, json, open, editmode } = props.query;
    return {
      edit: {
        id,
        savedate,
        title,
        body,
        json,
        editmode,
      },
      open,
    };
  }

  render() {
    const DashboardHeader = dynamic(
      () => import('../../components/Dashboard/DashboardMenu'),
      {
        ssr: false,
      },
    );
    const { edit, open } = this.props;

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
        <DashboardHeader
          active="publish"
          content={<Publish edit={edit} />}
          open={open}
        />
      </Fragment>
    );
  }
}

PublishPage.defaultProps = {
  open: undefined,
};

PublishPage.propTypes = {
  edit: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  query: PropTypes.objectOf(PropTypes.string).isRequired,
  open: PropTypes.string,
};

export default PublishPage;
