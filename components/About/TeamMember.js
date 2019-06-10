import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { imageProxy } from '../../helpers/getImage';

const TeamMember = props => {
  return (
    <div className="text-center">
      <Typography variant="h4" className="pt-4">
        {props.name}
      </Typography>
      <Link
        as={`/@${props.username}`}
        href={`/blog?author=${props.username}`}
        passHref
      >
        <a>
          <Typography gutterBottom variant="h6">
            @{props.username}
          </Typography>
        </a>
      </Link>
      <div
        className="mx-auto d-block pb-3"
        style={{ maxHeight: '250px', maxWidth: '250px' }}
      >
        <img
          className="rounded-circle w-100 h-100"
          alt={props.name}
          src={imageProxy(props.photo, 250, 250)}
        />
      </div>
      <p>{props.content}</p>
    </div>
  );
};

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default TeamMember;
