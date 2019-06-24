import { indigo } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_BLOG_POSTS } from '../../helpers/graphql/posts';
import HeaderCard from '../General/HeaderCard';

const BlogGridList = () => {
  return (
    <Fragment>
      <Query
        query={GET_BLOG_POSTS}
        variables={{ author: 'travelfeed', limit: 5 }}
      >
        {({ data, loading, error }) => {
          if (loading || error || data.post === null) {
            return <Fragment />;
          }
          return (
            <Fragment>
              <HeaderCard
                title="From Our Blog"
                titlesize="h5"
                background={indigo[600]}
                content={data.posts.map((post, index) => {
                  return (
                    <div key={post.author + post.permlink}>
                      {index !== 0 && <Divider className="mt-2 mb-2" />}
                      <Link
                        as={`/@${post.author}/${post.permlink}`}
                        href={`/post?author=${post.author}&permlink=${
                          post.permlink
                        }`}
                        passHref
                      >
                        <a>
                          <ListItemText primary={post.title} />
                        </a>
                      </Link>
                    </div>
                  );
                })}
              />
            </Fragment>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default BlogGridList;
