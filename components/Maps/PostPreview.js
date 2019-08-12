import React from 'react';
import Link from '../../lib/Link';

const PostPreview = props => {
  return (
    <div>
      <Link
        color="textPrimary"
        as={`/@${props.author}/${props.permlink}`}
        href={`/post?author=${props.author}&permlink=${props.permlink}`}
        passHref
      >
        <a>{props.title}</a>
      </Link>
      <br />
      <em>
        by{' '}
        <Link
          color="textPrimary"
          as={`/@${props.author}`}
          href={`/blog?author=${props.author}`}
          passHref
        >
          <a>@{props.author}</a>
        </Link>
      </em>
    </div>
  );
};

export default PostPreview;
