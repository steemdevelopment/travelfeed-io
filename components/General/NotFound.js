import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Error from 'next/error';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Head from '../Header/Head';

class NotFound extends Component {
  render() {
    let helmet = 'Error | TravelFeed';
    if (this.props.statusCode == 404) {
      helmet = '404 - Not Found | TravelFeed';
    } else if (this.props.statusCode == 'logged_out') {
      helmet = 'Logged Out | TravelFeed';
    }
    let content = <Error statusCode={404} />;
    if (this.props.statusCode == 'logged_out') {
      content = (
        <Fragment>
          <h1>Error: Logged Out</h1>
          <p>
            You need to log in to view this page. Use the sign in button on the
            top right to log in to your account.
          </p>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Head title={helmet} />
        <Card>
          <CardContent>{content}</CardContent>
        </Card>
      </Fragment>
    );
  }
}

NotFound.propTypes = {
  statusCode: PropTypes.number,
};

export default NotFound;
