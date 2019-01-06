import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";

class Wallet extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"Wallet | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
          style={{ paddingLeft: "75px" }}
        >
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <Card>
              <CardContent>
                <h1>Wallet</h1>
                <p>The wallet will be available soon.</p>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default Wallet;
