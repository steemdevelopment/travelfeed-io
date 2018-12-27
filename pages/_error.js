import React, { Fragment } from "react";
import NotFound from "../components/NotFound";
import Header from "../components/Header";
import Grid from "@material-ui/core/Grid";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <NotFound statusCode={this.props.statusCode} />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
