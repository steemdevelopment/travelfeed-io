// Todo: Query if TOS acccepted, otherwise display mutation before redirecting

import React, { Fragment, Component } from "react";
import Header from "../components/Header";
import Grid from "@material-ui/core/Grid";
import NotFound from "../components/NotFound";
import { setAccessToken, setScToken } from "../utils/token";
import Dashboard from "./dashboard";
import Router from "next/router";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { GET_LOGIN_TOKEN } from "../helpers/graphql/token";

class Login extends Component {
  static async getInitialProps({ req }) {
    return {
      sc: {
        sc_token: req.query.access_token,
        expires_in: req.query.expires_in
      }
    };
  }
  componentDidMount() {
    Router.replace("/dashboard");
  }
  render() {
    return (
      <Fragment>
        <Query query={GET_LOGIN_TOKEN} variables={this.props.sc}>
          {({ data, loading, error }) => {
            if (loading) {
              return <p>Loading..</p>;
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
            setScToken(this.props.sc.sc_token, this.props.sc.expires_in);
            setAccessToken(data.login.jwt, this.props.sc.expires_in);
            return <Dashboard />;
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
