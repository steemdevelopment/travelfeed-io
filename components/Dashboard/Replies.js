import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import PostGrid from "../PostGrid";
import { getUser } from "../../utils/token";

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
              <h1>Replies to You</h1>
            </div>
          </Grid>
        </Grid>
        <PostGrid
          query={{
            parent_author: getUser(),
            is_comment: true,
            limit: 8
          }}
          grid={{ lg: 8, md: 10, sm: 11, xs: 12 }}
          poststyle="comment"
        />
      </Fragment>
    );
  }
}

Replies.propTypes = {
  user: PropTypes.string
};

export default Replies;
