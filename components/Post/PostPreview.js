import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// import Link from '../../lib/Link';
import React from 'react';
import { imageProxy } from '../../helpers/getImage';
import Link from '../../lib/Link';

const PostPreview = props => {
  return (
    <div key={props.author + props.permlink}>
      <Link
        color="textPrimary"
        as={`/@${props.author}/${props.permlink}`}
        href={`/post?author=${props.author}&permlink=${props.permlink}`}
        passHref
      >
        <a>
          <CardActionArea className="pt-2 pb-2">
            <div className="container-fluid">
              <div className="row h-100 pl-3">
                <div
                  className="col-3 my-auto"
                  style={{
                    backgroundImage: `url(${imageProxy(
                      props.img_url,
                      100,
                      100,
                    )})`,
                    backgroundColor: '#ccc',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    width: '70px',
                    height: '70px',
                  }}
                />
                <div className="col-9 my-auto">
                  <Typography variant="subtitle">{props.title}</Typography>
                  <br />
                  <em>
                    <Link
                      color="textSecondary"
                      as={`/@${props.author}`}
                      href={`/blog?author=${props.author}`}
                      passHref
                    >
                      <a>by @{props.author}</a>
                    </Link>
                  </em>
                </div>
              </div>
            </div>
          </CardActionArea>
        </a>
      </Link>
      {props.divider && <Divider variant="middle" className="pl-3 pr-3" />}
    </div>
  );
};

export default PostPreview;
