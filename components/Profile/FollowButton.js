// no ssr since current user is essential to determine follow status

import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { follow, unfollow } from '../../helpers/actions';
import { GET_IS_FOLLOWED } from '../../helpers/graphql/profile';
import Link from '../../lib/Link';

class FollowButton extends Component {
  state = {
    isFollowed: null,
    isMounted: false,
    isLoaded: false,
    changing: false,
  };

  componentDidMount() {
    this.setState({
      isFollowed: this.props.isFollowed,
      isMounted: true,
    });
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

  newNotification(notification) {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      const { enqueueSnackbar } = this.props;
      enqueueSnackbar(notification.message, { variant });
    }
  }

  render() {
    if (this.state.isMounted === false) {
      return <Fragment />;
    }
    let btnclass = 'm-1';
    if (this.props.btnstyle === 'whiteborder') {
      btnclass = 'm-1 border-light';
    }
    const variant = this.props.btnstyle === 'solid' ? 'contained' : 'outlined';
    const color = this.props.btnstyle === 'solid' ? 'primary' : 'inherit';

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
                isFollowed: data.profile.isFollowed,
              });
            }
            if (this.state.isFollowed === true) {
              return (
                <Fragment>
                  <Button
                    style={(this.state.changing && { opacity: 0.2 }) || {}}
                    variant={variant}
                    size="small"
                    color={color}
                    onClick={() => this.unfollowAuthor(this.props.author)}
                    className={btnclass}
                  >
                    Unfollow
                  </Button>
                </Fragment>
              );
            }
            if (this.state.isFollowed === false) {
              return (
                <Fragment>
                  <Button
                    style={(this.state.changing && { opacity: 0.2 }) || {}}
                    variant={variant}
                    size="small"
                    color={color}
                    onClick={() => this.followAuthor(this.props.author)}
                    className={btnclass}
                  >
                    Follow
                  </Button>
                </Fragment>
              );
            }
            return (
              <Link color="textPrimary" href="/join" passHref>
                <Button
                  variant={variant}
                  size="small"
                  color={color}
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

FollowButton.defaultProps = {
  btnstyle: 'default',
  isFollowed: false,
};

FollowButton.propTypes = {
  author: PropTypes.string.isRequired,
  btnstyle: PropTypes.string,
  enqueueSnackbar: PropTypes.func.isRequired,
  isFollowed: PropTypes.bool,
};

export default withSnackbar(FollowButton);
