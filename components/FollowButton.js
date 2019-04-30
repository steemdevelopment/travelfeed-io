// no ssr since current user is essential to determine follow status

import React, { Fragment, Component } from "react";
import { follow, unfollow } from "../utils/actions";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";
import { Query } from "react-apollo";
import { GET_IS_FOLLOWED } from "../helpers/graphql/profile";

class followButton extends Component {
  state = {
    isFollowed: null,
    isMounted: false,
    isLoaded: false
  };
  componentDidMount() {
    this.setState({
      isFollowed: this.props.isFollowed,
      isMounted: true
    });
  }
  newNotification(notification) {
    if (notification != undefined) {
      let variant = "success";
      if (notification.success === false) {
        variant = "error";
      }
      this.props.enqueueSnackbar(notification.message, { variant });
    }
  }
  followAuthor = author => {
    follow(author).then(result => {
      this.newNotification(result);
    });
    this.setState({
      isFollowed: true
    });
  };
  unfollowAuthor = author => {
    unfollow(author).then(result => {
      this.newNotification(result);
    });
    this.setState({
      isFollowed: false
    });
  };
  render() {
    if (this.state.isMounted === false) {
      return <Fragment />;
    }
    var btnclass = "m-1";
    if (this.props.style == "whiteborder") {
      btnclass = "m-1 border-light";
    }
    return (
      <Fragment>
        <Query
          query={GET_IS_FOLLOWED}
          variables={{ author: this.props.author }}
        >
          {({ data, loading, error }) => {
            if (loading || error || data.profile === null) {
              return <Fragment />;
            }
            if (data && data.profile && !this.state.isLoaded) {
              this.setState({
                isLoaded: true,
                isFollowed: data.profile.isFollowed
              });
            }
            if (this.state.isFollowed === true) {
              return (
                <Fragment>
                  <Button
                    variant="outlined"
                    size="small"
                    color="inherit"
                    onClick={() => this.unfollowAuthor(this.props.author)}
                    className={btnclass}
                  >
                    Unfollow
                  </Button>
                </Fragment>
              );
            } else if (this.state.isFollowed === false) {
              return (
                <Fragment>
                  <Button
                    variant="outlined"
                    size="small"
                    color="inherit"
                    onClick={() => this.followAuthor(this.props.author)}
                    className={btnclass}
                  >
                    Follow
                  </Button>
                </Fragment>
              );
            }
            return (
              <Link href={"/join"} passHref>
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  className={btnclass}
                >
                  Log in to follow
                </Button>
              </Link>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

followButton.defaultProps = {
  btnstyle: "default"
};

followButton.propTypes = {
  author: PropTypes.string.isRequired,
  style: PropTypes.string,
  enqueueSnackbar: PropTypes.func,
  isFollowed: PropTypes.bool,
  isIgnored: PropTypes.bool
};

export default withSnackbar(followButton);
