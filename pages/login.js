import React, { Fragment, Component } from "react";
import Header from "../components/Header";
import Grid from "@material-ui/core/Grid";
import Helmet from "react-helmet";
import NotFound from "../components/NotFound";
import { setToken, setUser } from "../utils/token";
import Dashboard from "./dashboard";
import Router from "next/router";
import PropTypes from "prop-types";

class Login extends Component {
  state = { user: "" };
  static async getInitialProps({ req }) {
    const access_token = req.query.access_token;
    const username = req.query.username;
    const expires_in = req.query.expires_in;
    return { access_token, username, expires_in };
  }
  componentDidMount() {
    const access_token = this.props.access_token;
    const username = this.props.username;
    const expires_in = this.props.expires_in;
    if (access_token != undefined) {
      setToken(access_token, expires_in);
      setUser(username, expires_in);
    }
    this.setState({ user: username });
  }
  render() {
    var content = <Fragment />;
    if (this.state.user == undefined) {
      content = (
        <Grid item lg={7} md={8} sm={11} xs={12}>
          <NotFound statusCode={404} />
        </Grid>
      );
    } else if (this.state.user != undefined && this.state.user != "") {
      Router.replace("/dashboard");
      content = <Dashboard />;
    }
    return (
      <Fragment>
        <Helmet>
          <title>{"Login | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Header />
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
          style={{ paddingLeft: "75px" }}
        >
          {content}
        </Grid>
      </Fragment>
    );
  }
}

Login.propTypes = {
  access_token: PropTypes.string,
  username: PropTypes.string,
  expires_in: PropTypes.number
};

export default Login;
