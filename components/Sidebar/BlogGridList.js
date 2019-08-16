import CardActionArea from '@material-ui/core/CardActionArea';
import { indigo } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_BLOG_POSTS } from '../../helpers/graphql/posts';
import Link from '../../lib/Link';
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
          const posts = [
            {
              author: 'travelfeed',
              permlink: 'introducing-travelfeed-beta',
              title: 'Introducing TravelFeed Beta',
            },
            ...data.posts,
          ];
          return (
            <Fragment>
              <HeaderCard
                noborder
                title="From Our Blog"
                titlesize="h5"
                background={indigo[600]}
                content={
                  <Fragment>
                    {posts.map(post => {
                      return (
                        <Fragment>
                          <div key={post.author + post.permlink}>
                            <Divider variant="middle" className="pl-3 pr-3" />
                            <Link
                              color="textPrimary"
                              as={`/@${post.author}/${post.permlink}`}
                              href={`/post?author=${post.author}&permlink=${post.permlink}`}
                              passHref
                            >
                              <a>
                                <CardActionArea className="pt-2 pb-2">
                                  <div className="container-fluid">
                                    <div className="row h-100">
                                      <div className="col-12">
                                        <ListItemText primary={post.title} />
                                      </div>
                                    </div>
                                  </div>
                                </CardActionArea>
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
