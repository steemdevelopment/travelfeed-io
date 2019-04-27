import React, { Fragment, Component } from "react";
import Header from "./Header";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import Helmet from "react-helmet";

class Exit extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"External Link | TravelFeed"}</title>
        </Helmet>
        <Header />
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <Card className="text-center">
              <CardContent>
                <h1>Not a TravelFeed Post</h1>
                <p>
                  This is not a valid TravelFeed post, but it does exist on the
                  Steem blockchain. Proceed to Steempeak to view the post
                  anyway?
                </p>
                <p>{this.props.url}</p>
                <a onClick={() => Router.back()}>
                  <Button color="primary" variant="outlined" className="m-1">
                    Go back
                  </Button>
                </a>
                <a
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  href={this.props.url}
                >
                  <Button color="primary" variant="contained" className="m-1">
                    View on Steempeak
                  </Button>
                </a>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Exit.defaultProps = {
  url: undefined
};

Exit.propTypes = {
  url: PropTypes.string
};

export default Exit;
