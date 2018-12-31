import React, { Fragment, Component } from "react";
import { follow, unfollow, ignore } from "../utils/actions";
import Button from "@material-ui/core/Button";
import { getUser } from "../utils/token";
import Link from "next/link";
import { Client } from "dsteem";
const client = new Client("https://api.steemit.com");
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";

class followButton extends Component {
  state = {
    author: this.props.author,
    style: this.props.btnstyle,
    followed: false,
    user: null
  };
  newNotification(notification) {
    if (notification != undefined) {
      const text = notification[0];
      const variant = notification[1];
      this.props.enqueueSnackbar(text, { variant });
    }
  }
  async isInFollowList(user) {
    const followlist = await client.call("follow_api", "get_following", [
      user,
      this.state.author,
      "blog",
      1
    ]);
    for (var f of followlist) {
      if (f.following == this.state.author) {
        this.setState({ followed: true });
      }
    }
  }
  followAuthor = author => {
    follow(author).then(result => {
      this.newNotification(result);
    });
    this.setState({
      followed: true
    });
  };
  unfollowAuthor = author => {
    unfollow(author).then(result => {
      this.newNotification(result);
    });
    this.setState({
      followed: false
    });
  };
  ignoreAuthor = author => {
    ignore(author).then(result => {
      this.newNotification(result);
    });
    this.setState({
      followed: false
    });
  };
  componentDidMount() {
    const user = getUser();
    this.setState({ user: user });
    if (user != null) {
      this.isInFollowList(user);
    }
  }
  render() {
    var btnclass = "ml-2 p-0";
    if (this.state.style == "default") {
      btnclass = "m-1";
    }
    var btn = (
      <Link href={"/join"} passHref>
        <Button
          variant="outlined"
          size="small"
          color="inherit"
          className={btnclass}
        >
          Follow
        </Button>
      </Link>
    );
    if (this.state.followed != false) {
      btn = (
        <Button
          variant="outlined"
          size="small"
          color="inherit"
          onClick={() => this.unfollowAuthor(this.state.author)}
          className={btnclass}
        >
          Unfollow
        </Button>
      );
      if (this.state.style == "default") {
        btn = (
          <Fragment>
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={() => this.unfollowAuthor(this.state.author)}
              className={btnclass}
            >
              Unfollow
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={() => this.ignoreAuthor(this.state.author)}
              className={btnclass}
            >
              Ignore
            </Button>
          </Fragment>
        );
      }
    } else if (this.state.user != null) {
      btn = (
        <Button
          variant="outlined"
          size="small"
          color="inherit"
          onClick={() => this.followAuthor(this.state.author)}
          className={btnclass}
        >
          Follow
        </Button>
      );
      if (this.state.style == "default") {
        btn = (
          <Fragment>
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={() => this.followAuthor(this.state.author)}
              className={btnclass}
            >
              Follow
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={() => this.ignoreAuthor(this.state.author)}
              className={btnclass}
            >
              Ignore
            </Button>
          </Fragment>
        );
      }
    }
    return <Fragment>{btn}</Fragment>;
  }
}

followButton.defaultProps = {
  btnstyle: "default"
};

followButton.propTypes = {
  author: PropTypes.string.isRequired,
  btnstyle: PropTypes.string,
  enqueueSnackbar: PropTypes.function
};

export default withSnackbar(followButton);
