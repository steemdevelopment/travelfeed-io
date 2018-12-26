import React, { Fragment, Component } from "react";
import { setToken, setUser } from "../../utils/token";
import Header from "../../components/Header";

class Join extends Component {
  static async getInitialProps({ req }) {
    const access_token = req.query.access_token;
    const username = req.query.username;
    return { access_token, username };
  }
  componentDidMount() {
    const access_token = this.props.access_token;
    const username = this.props.username;
    setToken(access_token);
    setUser(username);
    // todo: redirect
  }
  render() {
    return (
      <Fragment>
        <Header />
        <p>Placeholder</p>
      </Fragment>
    );
  }
}

export default Join;
