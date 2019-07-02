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
        variables={{ author: 'travelfeed', limit: 4 }}
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
                content={
                  <Fragment>
                    <div key="@travelfeedintroducing-travelfeed-beta">
                      <Link
                        as="/@travelfeed/introducing-travelfeed-beta"
                        href="/post?author=travelfeed&permlink=introducing-travelfeed-beta"
                        passHref
                      >
                        <a>
                          <ListItemText primary="Introducing TravelFeed Beta" />
                        </a>
                      </Link>
                    </div>
                    {data.posts.map(post => {
                      return (
                        <Fragment>
                          <div key={post.author + post.permlink}>
                            <Divider className="mt-2 mb-2" />
                            <Link
                              as={`/@${post.author}/${post.permlink}`}
                              href={`/post?author=${post.author}&permlink=${post.permlink}`}
                              passHref
                            >
                              <a>
                                <ListItemText primary={post.title} />
                              </a>
                            </Link>
                          </div>
                        </Fragment>
                      );
                    })}
                  </Fragment>
                }
              />
            </Fragment>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default BlogGridList;
