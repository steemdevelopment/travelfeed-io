import Typography from '@material-ui/core/Typography';
import React from 'react';

const PostTitle = props => {
  return (
    <div className="container">
      <div
        className="row"
        style={{
          height: '500px',
        }}
      >
        <div className="text-center col my-auto">
          <Typography
            variant="h3"
            className="text-light font-weight-bold"
            style={{
              textShadow: '1px 1px 20px #343A40',
            }}
          >
            {props.title}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PostTitle;
