import React, { Fragment, Component } from "react";
import { follow, unfollow, ignore } from "../utils/actions";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";

class followButton extends Component {
  state = {
    isIgnored: false,
    isFollowed: false
  };
  componentDidMount() {
    this.setState({
      isIgnored: this.props.isIgnored,
      isFollowed: this.props.isFollowed
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
      isFollowed: false,
      isIgnored: false
    });
  };
  ignoreAuthor = author => {
    ignore(author).then(result => {
      this.newNotification(result);
    });
    this.setState({
      isIgnored: true
    });
  };
  render() {
    var btnclass = "m-1";
    if (this.props.style == "whiteborder") {
      btnclass = "m-1 border-light";
    }
    var btn = (
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
    if (this.state.isIgnored === true) {
      btn = (
        <Fragment>
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            onClick={() => this.unfollowAuthor(this.props.author)}
            className={btnclass}
          >
            Unblock
          </Button>
        </Fragment>
      );
    } else if (this.state.isFollowed === false) {
      btn = (
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
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            onClick={() => this.ignoreAuthor(this.props.author)}
            className={btnclass}
          >
            Block
          </Button>
        </Fragment>
      );
    } else if (this.state.isFollowed === true) {
      btn = (
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
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            onClick={() => this.ignoreAuthor(this.props.author)}
            className={btnclass}
          >
            Block
          </Button>
        </Fragment>
      );
    }
    return <Fragment>{btn}</Fragment>;
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
