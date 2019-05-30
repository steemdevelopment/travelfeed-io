import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { getUser } from '../../helpers/token';
import PostGrid from '../Grid/PostGrid';

class Comments extends Component {
  render() {
    return (
      <Fragment>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          <Grid item lg={8} md={10} sm={11} xs={12}>
            <div className="text-center">
              <h1>Your Comments</h1>
            </div>
          </Grid>
        </Grid>
        <PostGrid
          query={{ author: getUser(), is_comment: true, limit: 8 }}
          grid={{ lg: 8, md: 10, sm: 11, xs: 12 }}
          poststyle="comment"
        />
      </Fragment>
    );
  }
}

Comments.propTypes = {
  user: PropTypes.string,
};

export default Comments;
