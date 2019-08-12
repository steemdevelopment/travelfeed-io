import '@fortawesome/fontawesome-svg-core/styles.css';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { imageProxy } from '../../helpers/getImage';
import { GET_PROFILE } from '../../helpers/graphql/profile';
import CuratorMenu from '../CuratorMenu/BlogMenu';
import NotFound from '../General/NotFound';
import Head from '../Header/Head';
import Header from '../Header/Header';
import AuthorProfileBar from './AuthorProfileBar';
import AuthorProfileImage from './AuthorProfileImage';
import FollowButton from './FollowButton';

const AuthorProfile = props => {
  return (
    <Fragment>
      <Query query={GET_PROFILE} variables={props}>
        {({ data, loading, error }) => {
          if (loading) {
            return <Header />;
          }
          if (error || data.profile === null) {
            return (
              <Fragment>
                <Header />
                <NotFound statusCode={404} />
              </Fragment>
            );
          }
          const about = data.profile.about !== '' ? data.profile.about : '';
          const cover_image =
            data.profile.cover_image !== ''
              ? imageProxy(data.profile.cover_image, 1500)
              : imageProxy(
                  'https://cdn.steemitimages.com/DQme1phKjAipUM1zg5GQNaobssCMgmLAvFLFTVJpe9YVSvv',
                  1500,
                );
          const divStyle = {
            backgroundImage: `url(${cover_image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            height: '350px',
          };
          return (
            <Fragment>
              <Head
                title={`${data.profile.display_name}'s Blog on TravelFeed: The Travel Community`}
                image={data.profile.img_url}
                description={`${data.profile.display_name}'s Blog: ${about}`}
                type={{
                  type: 'profile',
                  display_name: data.profile.display_name,
                  username: data.profile.name,
                }}
              />
              <Header subheader={data.profile.display_name} />
              <div className="text-center p-4 mb-3" style={divStyle} />
              <div className="container-fluid">
                <div className="row justify-content-center text-center">
                  <div className="col-12 p-0" style={{ marginTop: '-115px' }}>
                    <AuthorProfileImage user={data.profile.name} />
                  </div>
                  <div className="col-12 col-xl-4 col-lg-4 col-md-6 col-sm-8 pt-2">
                    <Typography variant="h5" className="textSecondary">
                      <strong>{data.profile.display_name}</strong>
                      {data.profile.isBlacklisted && (
                        <Fragment>
                          {' '}
                          <span className="h5 pt-1 badge badge-danger">
                            Blacklisted
                          </span>
                        </Fragment>
                      )}
                      {data.profile.isCurator && (
                        <Fragment>
                          {' '}
                          <span className="h5 pt-1 badge badge-success">
                            Curator
                          </span>
                        </Fragment>
                      )}
                    </Typography>
                    <Typography variant="h6" className="textSecondary">
                      <em>@{data.profile.name}</em>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className="textSecondary pt-2"
                    >
                      {about}
                    </Typography>
                    <CuratorMenu
                      author={data.profile.name}
                      isCurator={data.profile.isCurator}
                    />
                  </div>
                  <div className="col-12 pt-3">
                    <FollowButton
                      author={data.profile.name}
                      isFollowed={data.profile.isFollowed}
                      isIgnored={data.profile.isIgnored}
                      btnstyle="solid"
                    />
                  </div>
                  <div className="col-12 pt-4 pb-3">
                    <AuthorProfileBar
                      location={data.profile.location}
                      website={data.profile.website}
                      facebook={data.profile.facebook}
                      twitter={data.profile.twitter}
                      instagram={data.profile.instagram}
                      youtube={data.profile.youtube}
                      couchsurfing={data.profile.couchsurfing}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default AuthorProfile;
