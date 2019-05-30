// no ssr since current user is essential to determine follow status

import Button from "@material-ui/core/Button";
import Link from "next/link";
import { withSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { follow, unfollow } from "../../helpers/actions";
import { GET_IS_FOLLOWED } from "../../helpers/graphql/profile";

class followButton extends Component {
  state = {
    isFollowed: null,
    isMounted: false,
    isLoaded: false,
    changing: false
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
  followAuthor = async author => {
    this.setState({ changing: true });
    return follow(author).then(res => {
      if (res) {
        if (!res.success) this.newNotification(res);
        else this.setState({ isFollowed: true });
        this.setState({ changing: false });
      }
    });
  };
  unfollowAuthor = async author => {
    this.setState({ changing: true });
    return unfollow(author).then(res => {
      if (res) {
        if (!res.success) this.newNotification(res);
        else this.setState({ isFollowed: false });
        this.setState({ changing: false });
      }
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
                    style={(this.state.changing && { opacity: 0.2 }) || {}}
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
                    style={(this.state.changing && { opacity: 0.2 }) || {}}
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
