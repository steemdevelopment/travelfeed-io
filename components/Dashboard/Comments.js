import React, { Fragment } from 'react';
import { getUser } from '../../helpers/token';
import PostGrid from '../Grid/PostGrid';

const Comments = () => {
  return (
    <Fragment>
      <div className="p-2 pt-4">
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
