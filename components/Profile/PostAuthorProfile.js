import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { GET_SHORT_PROFILE } from "../../helpers/graphql/profile";
import FollowButton from "./FollowButton";

class PostAuthorProfile extends Component {
  render() {
    return (
      <Fragment>
        <Query query={GET_SHORT_PROFILE} variables={this.props}>
          {({ data, loading, error }) => {
            if (loading || error || data.post === null) {
              return <Fragment />;
            }
            return (
              <div className="text-center">
                <Typography variant="h5" className="p-2">
                  Written by:
                </Typography>
                <div className="pb-2">
                  <Link
                    as={`/@${data.profile.name}`}
                    href={`/blog?author=${data.profile.name}`}
                    passHref
                  >
                    <a>
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
                    </a>
                  </Link>
                </div>
                <Fragment>
                  <div>
                    <Link
                      as={`/@${data.profile.name}`}
                      href={`/blog?author=${data.profile.name}`}
                      passHref
                    >
                      <a>
                        <Typography variant="h6" className="text-dark cpointer">
                          {data.profile.display_name}
                        </Typography>
                        <span className="text-muted">@{data.profile.name}</span>
                      </a>
                    </Link>
                    {data.profile.isCurator && (
                      <p className="h5 pt-1">
                        <span className="badge badge-success">Curator</span>
                      </p>
                    )}
                  </div>
                  <p className="p-2">{data.profile.about}</p>
                </Fragment>
                <div>
                  <FollowButton
                    author={data.profile.name}
                    isFollowed={data.profile.isFollowed}
                    isIgnored={data.profile.isIgnored}
                    style="default"
                  />
                </div>
              </div>
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
