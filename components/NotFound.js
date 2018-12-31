import React, { Fragment, Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import Error from "next/error";
import PropTypes from "prop-types";

class NotFound extends Component {
  render() {
    var helmet = <title>{"Error | TravelFeed"}</title>;
    if (this.props.statusCode == 404) {
      helmet = <title>{"404 - Not Found | TravelFeed"}</title>;
    } else if (this.props.statusCode == "logged_out") {
      helmet = <title>{"Logged Out | TravelFeed"}</title>;
    }
    var content = <Error statusCode={404} />;
    if (this.props.statusCode == "logged_out") {
      content = (
        <Fragment>
          <h1>Error: Logged Out</h1>
          <p>You need to log in to view this page.</p>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Helmet>{helmet}</Helmet>
        <Card>
          <CardContent>{content}</CardContent>
        </Card>
      </Fragment>
    );
  }
}

NotFound.propTypes = {
  statusCode: PropTypes.number | PropTypes.string
};

export default NotFound;
