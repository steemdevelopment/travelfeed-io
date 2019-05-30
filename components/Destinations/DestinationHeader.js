import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { nameFromSlug } from '../../helpers/countryCodes';
import { GET_LOCATION_DETAILS } from '../../helpers/graphql/locations';

class Sublocations extends Component {
  render() {
    return (
      <Fragment>
        <Query query={GET_LOCATION_DETAILS} variables={this.props.query}>
          {({ data }) => {
            if (data && data.locationDetails) {
              return (
                <Fragment>
                  <div
                    className="w-100"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0,0.5)),
                      url("${data.locationDetails.image}")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center center',
                      backgroundSize: 'cover',
                    }}
                  >
                    <div className="container h-100">
                      <div className="row h-100" style={{ minHeight: '500px' }}>
                        <div className="col-12 my-auto">
                          <h5
                            className="text-center"
                            style={{
                              textShadow: '1px 1px 10px #343A40',
                            }}
                          >
                            {// For cities, display breadcrumbs to Country and Subdivison. Else, display Knowledge Graph subtitle, if unavailable country name
                            (this.props.query.city && (
                              <span>
                                <Link
                                  as={`/destinations/${
                                    this.props.country_slug
                                  }/`}
                                  href={`/destinations?country=${
                                    this.props.country_slug
                                  }`}
                                  passHref
                                >
                                  <a className="text-light font-weight-bold">
                                    {nameFromSlug(this.props.country_slug)}
                                  </a>
                                </Link>
                                <span className="text-light">
                                  {' '}
                                  &raquo;{' '}
                                  <Link
                                    as={`/destinations/${
                                      this.props.country_slug
                                    }/${this.props.query.subdivision}`}
                                    href={`/destinations?country=${
                                      this.props.country_slug
                                    }&subdivision=${
                                      this.props.query.subdivision
                                    }`}
                                    passHref
                                  >
                                    <a className="text-light font-weight-bold">
                                      {this.props.query.subdivision}
                                    </a>
                                  </Link>
                                </span>{' '}
                              </span>
                            )) ||
                              (((this.props.query.search &&
                                !this.props.query.country_code) ||
                                this.props.query.subdivision ||
                                this.props.query.city) && (
                                <Link
                                  as={`/destinations/${
                                    this.props.country_slug
                                  }/`}
                                  href={`/destinations?country=${
                                    this.props.country_slug
                                  }`}
                                  passHref
                                >
                                  <a className="text-light font-weight-bold">
                                    {data.locationDetails.subtitle ||
                                      nameFromSlug(this.props.country_slug)}
                                  </a>
                                </Link>
                              ))}
                          </h5>
                          <Typography
                            gutterBottom
                            variant="h2"
                            className="text-light font-weight-bold text-center"
                            style={{
                              textShadow: '1px 1px 10px #343A40',
                            }}
                          >
                            {this.props.title}
                          </Typography>
                          <p
                            className="lead text-light text-center"
                            style={{
                              textShadow: '1px 1px 10px black',
                            }}
                          >
                            <em>{data.locationDetails.description}</em>
                          </p>
                          {data.locationDetails.sublocations &&
                            data.locationDetails.sublocations.length > 1 && (
                              <div className="row p-2 justify-content-md-center">
                                <div className="col-12">
                                  <h4
                                    className="text-center text-light"
                                    style={{
                                      textShadow: '1px 1px 10px #343A40',
                                    }}
                                  >
                                    Popular destinations:
                                  </h4>
                                </div>
                                {data.locationDetails.sublocations.map(
                                  (location, index) => {
                                    //   limit results
                                    if (index > 11) {
                                      return;
                                    }
                                    return (
                                      <div
                                        key={index}
                                        className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-6 text-center"
                                      >
                                        <Link
                                          href={`/destinations?country=${
                                            this.props.country_slug
                                          }&subdivision=${
                                            location.subdivision
                                              ? location.subdivision
                                              : `${
                                                  this.props.query.subdivision
                                                }&city=${location.city}`
                                          }`}
                                          as={`/destinations/${
                                            this.props.country_slug
                                          }/${
                                            location.subdivision
                                              ? location.subdivision
                                              : `${
                                                  this.props.query.subdivision
                                                }/${location.city}`
                                          }`}
                                          passHref
                                        >
                                          <a
                                            className="text-light"
                                            style={{
                                              textShadow: '1px 1px 10px black',
                                            }}
                                          >
                                            {location.city
                                              ? location.city
                                              : location.subdivision}
                                          </a>
                                        </Link>
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div
                      className="text-mutedlight text-right pr-1"
                      style={{ fontSize: '0.8rem' }}
                    >
                      {data.locationDetails.url && (
                        <span>
                          Description by{' '}
                          <a
                            className="text-mutedlight text-decoration-underline"
                            target="_blank"
                            rel="nofollow noreferrer noopener"
                            href={data.locationDetails.url}
                          >
                            Wikipedia
                          </a>{' '}
                          under{' '}
                          <a
                            className="text-mutedlight text-decoration-underline"
                            target="_blank"
                            rel="nofollow noreferrer noopener"
                            href={data.locationDetails.license}
                          >
                            CC BY-SA 3.0
                          </a>
                          .{' '}
                        </span>
                      )}
                      {data.locationDetails.attribution && (
                        <span>
                          Photo:{' '}
                          {(data.locationDetails.unsplashUser && (
                            <a
                              className="text-mutedlight text-decoration-underline"
                              target="_blank"
                              rel="nofollow noreferrer noopener"
                              href={`https://unsplash.com/@${
                                data.locationDetails.unsplashUser
                              }?utm_source=TravelFeed&utm_medium=referral`}
                            >
                              {data.locationDetails.attribution}
                            </a>
                          )) || (
                            <Link
                              as={`/@${data.locationDetails.attribution}`}
                              href={`/blog?author=${
                                data.locationDetails.attribution
                              }`}
                              passHref
                            >
                              <a className="text-mutedlight text-decoration-underline">
                                @{data.locationDetails.attribution}
                              </a>
                            </Link>
                          )}{' '}
                          {data.locationDetails.unsplashUser && (
                            <span>
                              /{' '}
                              <a
                                target="_blank"
                                rel="nofollow noreferrer noopener"
                                href="https://unsplash.com/?utm_source=TravelFeed&utm_medium=referral"
                                className="text-mutedlight text-decoration-underline"
                              >
                                Unsplash
                              </a>
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </Fragment>
              );
            }
            return <Fragment />;
          }}
        </Query>
      </Fragment>
    );
  }
}

Sublocations.propTypes = {
  query: PropTypes.object,
  country_slug: PropTypes.string,
};

export default Sublocations;
