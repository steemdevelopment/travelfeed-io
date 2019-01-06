import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import Link from "next/link";
import PropTypes from "prop-types";

class Stats extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"Dashboard | TravelFeed: The Travel Community"}</title>
        </Helmet>
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
                <h1>Welcome {this.props.user}!</h1>
                <p>Welcome to your personal TravelFeed Dashboard!</p>
                <p>Soon, you will be able to do a lot of cool stuff here.</p>
                <p>For now, you can:</p>
                <ul>
                  <li>
                    <Link
                      as="/dashboard/publish"
                      href="/dashboard?page=publish"
                      passhref
                    >
                      <a>Write a new post</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      as="/dashboard/posts"
                      href="/dashboard?page=posts"
                      passhref
                    >
                      <a>View and edit your published posts</a>
                    </Link>
                  </li>
                </ul>
                <p>
                  Or,{" "}
                  <Link href="/" passhref>
                    <a>return to the main app</a>
                  </Link>{" "}
                  to discover great travel content.
                </p>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Stats.propTypes = {
  user: PropTypes.user
};

export default Stats;
