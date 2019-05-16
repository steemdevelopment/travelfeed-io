import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Helmet from "react-helmet";
import PostGrid from "../PostGrid";
import PropTypes from "prop-types";
import { getUser } from "../../utils/token";

class Posts extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"My Posts | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          <Grid item lg={8} md={10} sm={11} xs={12} className="pb-4">
            <div className="text-center">
              <h1>Your Published Posts</h1>
            </div>
          </Grid>
          <PostGrid
            query={{ author: getUser(), limit: 10 }}
            grid={{ lg: 8, md: 10, sm: 11, xs: 12 }}
            cardHeight={140}
            poststyle="list"
          />
        </Grid>
      </Fragment>
    );
  }
}

Posts.propTypes = {
  user: PropTypes.string
};

export default Posts;
