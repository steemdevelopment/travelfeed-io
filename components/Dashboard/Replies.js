import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
// import PostGrid from "../PostGrid";

class Replies extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"Replies | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          <Grid item lg={8} md={10} sm={11} xs={12}>
            <div className="text-center">
              <h1>Replies to you</h1>
            </div>
          </Grid>
        </Grid>
        {/* <PostGrid
          type="replies"
          filter={this.props.user}
          poststyle="commentitem"
          position={0}
        /> */}
      </Fragment>
    );
  }
}

Replies.propTypes = {
  user: PropTypes.string
};

export default Replies;
