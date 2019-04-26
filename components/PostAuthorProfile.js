import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import FollowButton from "./FollowButton";
import { Query } from "react-apollo";
import { GET_SHORT_PROFILE } from "../helpers/graphql/profile";

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
                <Link
                  as={`/@${data.profile.name}`}
                  href={`/blog?author=${data.profile.name}`}
                  passHref
                >
                  <a>
                    <div className="pb-2">
                      <img
                        style={{ cursor: "pointer" }}
                        src={`https://steemitimages.com/u/${
                          data.profile.name
                        }/avatar`}
                        width="80"
                        height="80"
                        className="rounded-circle"
                      />
                    </div>
                  </a>
                </Link>
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
                  </div>
                  <p className="p-2">{data.profile.about}</p>
                </Fragment>
                <div>
                  <FollowButton author={data.profile.name} btnstyle="default" />
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
