import React, { Fragment, Component } from "react";
import Header from "../../components/Header";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import NotFound from "../../components/NotFound";
import { getUser } from "../../utils/token";
import { setToken, setUser } from "../../utils/token";
import Dashboard from "./index";
import Router from "next/router";

class Login extends Component {
  state = { user: "" };
  static async getInitialProps({ req }) {
    const access_token = req.query.access_token;
    const username = req.query.username;
    return { access_token, username };
  }
  componentDidMount() {
    const access_token = this.props.access_token;
    const username = this.props.username;
    if (access_token != undefined) {
      setToken(access_token);
      setUser(username);
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
      Router.push("/dashboard");
      content = <Dashboard />;
    }
    return (
      <Fragment>
        <Helmet>
          <title>{"Login | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Header drawer={true} />
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

export default Login;
