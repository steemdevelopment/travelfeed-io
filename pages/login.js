import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import NotFound from '../components/General/NotFound';
import Header from '../components/Header/Header';
import LoginDialog from '../components/Login/LoginDialog';
import { ACCEPT_TOS, GET_LOGIN_TOKEN } from '../helpers/graphql/token';
import { setAccessToken, setScToken } from '../helpers/token';

class LoginPage extends Component {
  state = {
    loaded: false,
  };

  static async getInitialProps({ req }) {
    return {
      sc: {
        sc_token: req.query.access_token,
        expires_in: req.query.expires_in,
      },
    };
  }

  componentDidMount() {
    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;
    const { sc } = this.props;
    return (
      <Fragment>
        <Query query={GET_LOGIN_TOKEN} variables={sc}>
          {({ data, loading }) => {
            if (loading || !loaded) {
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
                    <Grid item lg={7} md={8} sm={11} xs={12} />
                  </Grid>
                </Fragment>
              );
            }
            if (data) {
              // If tos are not accepted, display tos dialogue
              if (data && data.login && data.login.hasAcceptedTos === false) {
                return (
                  <Mutation
                    mutation={ACCEPT_TOS}
                    variables={{
                      sc_token: sc.sc_token,
                      acceptTos: true,
                    }}
                  >
                    {acceptTos => {
                      // If successful
                      if (data && data.data && data.data.login.hasAcceptedTos) {
                        setAccessToken(data.data.login.jwt, sc.expires_in);
                        setScToken(sc.sc_token, sc.expires_in);
                        Router.replace('/dashboard');
                      }
                      return <LoginDialog acceptTos={acceptTos} />;
                    }}
                  </Mutation>
                );
              }
              setScToken(sc.sc_token, sc.expires_in);
              setAccessToken(data.login.jwt, sc.expires_in);
              Router.replace('/dashboard');
              return '';
            }
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
                    <NotFound statusCode={404} />
                  </Grid>
                </Grid>
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

LoginPage.propTypes = {
  sc: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default LoginPage;
