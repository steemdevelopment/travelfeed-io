import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import {
  faCouch,
  faLink,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { imageProxy } from "../../helpers/getImage";
import { GET_PROFILE } from "../../helpers/graphql/profile";
import CuratorMenu from "../CuratorMenu/BlogMenu";
import NotFound from "../General/NotFound";
import Head from "../Header/Head";
import Header from "../Header/Header";
import FollowButton from "./FollowButton";

export class PostAuthorProfile extends Component {
  render() {
    return (
      <Fragment>
        <Query query={GET_PROFILE} variables={this.props}>
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
            const about =
              data.profile.about != "" ? data.profile.about : <Fragment />;
            const cover_image =
              data.profile.cover_image !== ""
                ? imageProxy(data.profile.cover_image, 1500)
                : imageProxy(
                    "https://cdn.steemitimages.com/DQme1phKjAipUM1zg5GQNaobssCMgmLAvFLFTVJpe9YVSvv",
                    1500
                  );
            const location =
              data.profile.location !== "" ? (
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                  {data.profile.location}
                </span>
              ) : (
                <Fragment />
              );
            const website =
              data.profile.website !== "" ? (
                <a
                  href={data.profile.website}
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  className="text-light h1"
                >
                  {" "}
                  <FontAwesomeIcon icon={faLink} />
                </a>
              ) : (
                <Fragment />
              );
            const facebook =
              data.profile.facebook !== "" ? (
                <a
                  href={"https://facebook.com/" + data.profile.facebook}
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  className="text-light h1 p-2"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              ) : (
                <Fragment />
              );
            const twitter =
              data.profile.twitter !== "" ? (
                <a
                  href={"https://twitter.com/" + data.profile.twitter}
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  className="text-light h1"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              ) : (
                <Fragment />
              );
            const instagram =
              data.profile.instagram !== "" ? (
                <a
                  href={"https://instagram.com/" + data.profile.instagram}
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  className="text-light h1"
                >
                  {" "}
                  <FontAwesomeIcon icon={faInstagram} />{" "}
                </a>
              ) : (
                <Fragment />
              );
            const youtube =
              data.profile.youtube !== "" ? (
                <a
                  href={"https://youtube.com/user/" + data.profile.youtube}
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  className="text-light h1"
                >
                  {" "}
                  <FontAwesomeIcon icon={faYoutube} />{" "}
                </a>
              ) : (
                <Fragment />
              );
            const couchsurfing =
              data.profile.couchsurfing !== "" ? (
                <a
                  href={
                    "https://couchsurfing.com/people/" +
                    data.profile.couchsurfing
                  }
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  className="text-light h1"
                >
                  {" "}
                  <FontAwesomeIcon icon={faCouch} />{" "}
                </a>
              ) : (
                <Fragment />
              );
            const divStyle = {
              backgroundImage: "url(" + cover_image + ")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover"
            };
            return (
              <Fragment>
                <Head
                  title={`${
                    data.profile.display_name
                  }'s Blog on TravelFeed: The Travel Community`}
                  image={data.profile.img_url}
                  description={`${data.profile.display_name}'s Blog: ${about}`}
                />
                <Header subheader={data.profile.display_name} />
                <div className="text-center p-4 mb-3" style={divStyle}>
                  <div className="container">
                    <div className="row justify-content-center">
                      <div
                        style={{ backgroundColor: "rgba(52, 58, 64, 0.6)" }}
                        className="col-lg-6 col-md-9 col-sm-12 p-3 text-light rounded"
                      >
                        <Fragment>
                          <div className="pb-2">
                            <img
                              style={{ cursor: "pointer" }}
                              src={`https://steemitimages.com/u/${
                                data.profile.name
                              }/avatar/medium`}
                              alt={data.profile.name}
                              width="80"
                              height="80"
                              className="rounded-circle"
                            />
                          </div>
                          <div>
                            <Typography variant="h6" className="text-light">
                              {data.profile.display_name}{" "}
                              <em>@{data.profile.name}</em>
                              <CuratorMenu
                                author={data.profile.name}
                                isCurator={data.profile.isCurator}
                              />
                            </Typography>
                            {data.profile.isBlacklisted && (
                              <p className="h5 pt-1">
                                <span className="badge badge-danger">
                                  Blacklisted
                                </span>
                              </p>
                            )}
                            {data.profile.isCurator && (
                              <p className="h5 pt-1">
                                <span className="badge badge-success">
                                  Curator
                                </span>
                              </p>
                            )}
                          </div>
                          <p className="p-2">{about}</p>
                          <p>{location}</p>
                        </Fragment>
                        <div>
                          {website}
                          {facebook}
                          {twitter}
                          {instagram}
                          {youtube}
                          {couchsurfing}
                        </div>
                        <div>
                          <FollowButton
                            author={data.profile.name}
                            isFollowed={data.profile.isFollowed}
                            isIgnored={data.profile.isIgnored}
                            style="whiteborder"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

PostAuthorProfile.propTypes = {
  author: PropTypes.string
};

export default PostAuthorProfile;
