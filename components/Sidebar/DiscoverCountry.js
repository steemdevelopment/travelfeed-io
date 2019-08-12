import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import { teal } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// import Link from '../../lib/Link';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import {
  nameFromCC,
  randomCountry,
  slugFromCC,
} from '../../helpers/countryCodes';
import { imageProxy } from '../../helpers/getImage';
import { GET_POSTS } from '../../helpers/graphql/posts';
import Link from '../../lib/Link';
import HeaderCard from '../General/HeaderCard';

const DiscoverCountry = () => {
  const country_code = randomCountry;
  const country_name = nameFromCC(country_code);
  const countryslug = slugFromCC(country_code);
  return (
    <Fragment>
      <Query
        query={GET_POSTS}
        variables={{
          country_code,
          limit: 5,
          min_curation_score: 10000,
        }}
      >
        {({ data, loading, error }) => {
          if (loading || error || data.post === null) {
            return <Fragment />;
          }
          return (
            <Fragment>
              <HeaderCard
                noborder
                title={`Discover ${country_name}`}
                titlesize="h5"
                background={teal[600]}
                content={
                  <div>
                    {data.posts.map(post => {
                      return (
                        <div key={post.author + post.permlink}>
                          <Link
                            color="textPrimary"
                            as={`/@${post.author}/${post.permlink}`}
                            href={`/post?author=${post.author}&permlink=${post.permlink}`}
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
                                          post.img_url,
                                          100,
                                          100,
                                        )})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center center',
                                        backgroundSize: 'cover',
                                        width: '70px',
                                        height: '70px',
                                      }}
                                    />
                                    <div className="col-9 my-auto">
                                      <Typography variant="subtitle">
                                        {post.title}
                                      </Typography>
                                      <br />
                                      <em>
                                        <Link
                                          color="textSecondary"
                                          as={`/@${post.author}`}
                                          href={`/blog?author=${post.author}`}
                                          passHref
                                        >
                                          <a>by @{post.author}</a>
                                        </Link>
                                      </em>
                                    </div>
                                  </div>
                                </div>
                              </CardActionArea>
                            </a>
                          </Link>
                          <Divider variant="middle" className="pl-3 pr-3" />
                        </div>
                      );
                    })}
                    <div className="text-center pt-3 pb-3">
                      <Link
                        color="textPrimary"
                        as={`/destinations/${countryslug}`}
                        href={`/destinations?country=${countryslug}`}
                        passHref
                      >
                        <Button variant="contained" color="primary">
                          <span className="text-light">Explore More</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                }
              />
            </Fragment>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default DiscoverCountry;
