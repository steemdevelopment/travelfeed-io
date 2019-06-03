import Grid from '@material-ui/core/Grid';
import React, { Fragment } from 'react';
import { getUser } from '../../helpers/token';
import PostGrid from '../Grid/PostGrid';

const Comments = () => {
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
            <h1>Comments</h1>
          </div>
        </Grid>
      </Grid>
      <div className="p-1">
        <PostGrid
          query={{ author: getUser(), is_comment: true, limit: 8 }}
          grid={{ lg: 8, md: 10, sm: 11, xs: 12 }}
          poststyle="comment"
        />
      </div>
    </Fragment>
  );
};

export default Comments;
