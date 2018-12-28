import React, { Fragment, Component } from "react";
import Header from "../../components/Header";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import NotFound from "../../components/NotFound";
import { getUser } from "../../utils/token";
import Link from "next/link";

class Dashboard extends Component {
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
              <h1>Welcome {this.state.user}!</h1>
              <p>Welcome to your personal TravelFeed Dashboard!</p>
              <p>Soon, you will be able to do a lot of cool stuff here.</p>
              <p>For now, you can:</p>
              <ul>
                <li>
                  <Link href="/dashboard/publish" passhref>
                    <a>Publish a new post</a>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/posts" passhref>
                    <a>View your published posts</a>
                  </Link>
                </li>
              </ul>
              <p>
                Or,
                <Link href="/" passhref>
                  <a>return to the main app to discover great travel content</a>
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </Grid>
      );
    }
    return (
      <Fragment>
        <Helmet>
          <title>{"Dashboard | TravelFeed: The Travel Community"}</title>
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

export default Dashboard;
