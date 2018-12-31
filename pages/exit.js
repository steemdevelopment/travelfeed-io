import React, { Fragment, Component } from "react";
import Header from "../components/Header";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import NotFound from "../components/NotFound";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import Helmet from "react-helmet";

class Exit extends Component {
  static async getInitialProps({ req }) {
    const url = req.query.url;
    return { url };
  }
  render() {
    var content = (
      <Grid item lg={7} md={8} sm={11} xs={12}>
        <NotFound statusCode={404} />
      </Grid>
    );
    if (this.props.url != undefined) {
      content = (
        <Grid item lg={7} md={8} sm={11} xs={12}>
          <Card className="text-center">
            <CardContent>
              <h1>Warning: External Link</h1>
              <p>
                Warning: This is an external link. Please check it carefully
                before proceeding.
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
                  Visit this Website
                </Button>
              </a>
            </CardContent>
          </Card>
        </Grid>
      );
    }
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
          {content}
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
