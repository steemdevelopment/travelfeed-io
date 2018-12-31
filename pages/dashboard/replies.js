import React, { Fragment, Component } from "react";
import Header from "../../components/Header";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import NotFound from "../../components/NotFound";
import { getUser } from "../../utils/token";

class Replies extends Component {
  state = { user: "" };
  getUser() {
    this.setState({ user: getUser() });
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    var content = (
      <Grid item lg={7} md={8} sm={11} xs={12}>
        <Card>
          <CardContent />
        </Card>
      </Grid>
    );
    if (this.state.user == null) {
      content = (
        <Grid item lg={7} md={8} sm={11} xs={12}>
          <NotFound statusCode="logged_out" />
        </Grid>
      );
    } else if (this.state.user != null && this.state.user != "") {
      content = (
        <Grid item lg={7} md={8} sm={11} xs={12}>
          <Card>
            <CardContent>
              <h1>Replies</h1>
              <p>Viewing your recent replies will be available soon.</p>
            </CardContent>
          </Card>
        </Grid>
      );
    }
    return (
      <Fragment>
        <Helmet>
          <title>{"Replies | TravelFeed: The Travel Community"}</title>
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

export default Replies;
