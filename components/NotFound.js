import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import Error from "next/error";
import Header from "./Header";

class NotFound extends Component {
  render() {
    var helmet = <title>{"Error | TravelFeed"}</title>;
    if (this.props.statusCode == 404) {
      helmet = <title>{"404 - Not Found | TravelFeed"}</title>;
    }
    return (
      <Fragment>
        <Helmet>{helmet}</Helmet>
        <Header />
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <Card>
              <CardContent>
                <Error statusCode={404} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default NotFound;
