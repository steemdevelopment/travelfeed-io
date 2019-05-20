import React, { Fragment, Component } from "react";
import Header from "../components/Header";
import Grid from "@material-ui/core/Grid";
import NotFound from "../components/NotFound";
import { setAccessToken, setScToken } from "../utils/token";
import Router from "next/router";
import PropTypes from "prop-types";
import { Mutation, Query } from "react-apollo";
import { GET_LOGIN_TOKEN, ACCEPT_TOS } from "../helpers/graphql/token";
import LoginDialog from "../components/Login/LoginDialog";

class Login extends Component {
  state = {
    loaded: false
  };
  static async getInitialProps({ req }) {
    return {
      sc: {
        sc_token: req.query.access_token,
        expires_in: req.query.expires_in
      }
    };
  }
  componentDidMount() {
    this.setState({ loaded: true });
  }
  render() {
    return (
      <Fragment>
        <Query query={GET_LOGIN_TOKEN} variables={this.props.sc}>
          {({ data, loading, error }) => {
            if (loading || !this.state.loaded) {
              return (
                <Fragment>
                  <Header />
                  <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justify="center"
                    className="pt-4 pb-4"
                    style={{ paddingLeft: "75px" }}
                  >
                    <Grid item lg={7} md={8} sm={11} xs={12} />
                  </Grid>
                </Fragment>
              );
            }
            if (error || data.login === null) {
              return (
                <Fragment>
                  <Header />
                  <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justify="center"
                    className="pt-4 pb-4"
                    style={{ paddingLeft: "75px" }}
                  >
                    <Grid item lg={7} md={8} sm={11} xs={12}>
                      <NotFound statusCode={404} />
                    </Grid>
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
                      sc_token: this.props.sc.sc_token,
                      acceptTos: true
                    }}
                  >
                    {(acceptTos, data) => {
                      // If successful
                      if (data && data.data && data.data.login.hasAcceptedTos) {
                        setAccessToken(
                          data.data.login.jwt,
                          this.props.sc.expires_in
                        );
                        setScToken(
                          this.props.sc.sc_token,
                          this.props.sc.expires_in
                        );
                        Router.replace("/dashboard");
                      }
                      return <LoginDialog acceptTos={acceptTos} />;
                    }}
                  </Mutation>
                );
              }
              setScToken(this.props.sc.sc_token, this.props.sc.expires_in);
              setAccessToken(data.login.jwt, this.props.sc.expires_in);
              Router.replace("/dashboard");
              return "";
            }
          }}
        </Query>
      </Fragment>
    );
  }
}

Login.propTypes = {
  sc: PropTypes.object
};

export default Login;
