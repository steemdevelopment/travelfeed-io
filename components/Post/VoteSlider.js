// Todo: Tooltip with individual voters over total miles

import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CommentIcon from '@material-ui/icons/AddComment';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import FlightVotedIcon from '@material-ui/icons/Flight';
import FlightIcon from '@material-ui/icons/FlightTakeoff';
import LinkIcon from '@material-ui/icons/Link';
import Slider from '@material-ui/lab/Slider';
import Link from 'next/link';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { vote } from '../../helpers/actions';
import { GET_VOTE_WEIGHTS } from '../../helpers/graphql/settings';
import { getUser } from '../../helpers/token';

class VoteSlider extends Component {
  state = {
    laoded: false,
    voteExpanded: false,
    commentExpanded: false,
    loading: undefined,
    weight: 5,
    hasVoted: false,
    user: null,
    totalmiles: null,
  };

  newNotification(notification) {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      this.props.enqueueSnackbar(notification.message, { variant });
    }
  }

  setWeight = (event, value) => {
    this.setState({ weight: value });
  };

  expandVoteBar() {
    this.setState({ voteExpanded: true });
  }

  collapseVoteBar() {
    this.setState({ voteExpanded: false });
  }

  expandCommentBar() {
    this.setState({ commentExpanded: true });
  }

  collapseCommentBar() {
    this.setState({ commentExpanded: false });
  }

  votePost(author, permlink) {
    const weight = this.state.weight * 1000;
    this.setState({ loading: 0 });
    return vote(author, permlink, weight).then(res => {
      if (res) {
        if (!res.success) this.newNotification(res);
        else
          this.setState({
            hasVoted: true,
            totalmiles: this.state.totalmiles + this.state.weight,
          });
        this.setState({ loading: undefined });
        this.collapseVoteBar();
      }
    });
  }

  progress = () => {
    const { loading } = this.state;
    if (loading < 100) {
      this.setState({ loading: loading + 1 });
    } else {
      this.setState({ loading: 0 });
    }
  };

  async componentDidMount() {
    const user = getUser();
    this.setState({
      user,
      totalmiles: this.props.total_votes,
    });
    if (this.props.votes !== '' && this.props.votes !== undefined) {
      const vl = this.props.votes.split('\n');
      const votelist = [];
      vl.forEach(el => {
        const details = el.split(',');
        votelist.push({
          voter: details[0],
          rshares: details[1],
          weight: Math.round(details[2] / 1000),
        });
        if (details[0] === user) {
          this.setState({
            weight: Math.round(details[2] / 1000),
            hasVoted: true,
          });
        }
      });
    }
  }

  render() {
    let sliderstyle = {};
    let rowitem1 = 'col-5 p-0';
    let rowitem2 = 'col-7 text-right p-0 pt-2';
    if (this.props.mode == 'gridcard') {
      sliderstyle = { fontSize: '0.6rem' };
      rowitem1 = 'col-6 p-0';
      rowitem2 = 'col-6 pt-2 p-0 text-right';
    }
    let cardFooter = <Fragment />;
    let voteButton = (
      <Link href="/join" passHref>
        <Tooltip title="Log in to vote" placement="bottom">
          <IconButton aria-label="Upvote">
            <FlightIcon className="mr" />
          </IconButton>
        </Tooltip>
      </Link>
    );
    if (this.state.user != null) {
      voteButton = (
        <Tooltip title="Upvote" placement="bottom">
          <IconButton aria-label="Upvote" onClick={() => this.expandVoteBar()}>
            <FlightIcon className="mr" />
          </IconButton>
        </Tooltip>
      );
    }
    if (this.state.hasVoted == true) {
      voteButton = (
        <Tooltip title="Upvote" placement="bottom">
          <IconButton
            aria-label="Upvote"
            onClick={() => this.expandVoteBar()}
            color="primary"
          >
            <FlightVotedIcon className="mr" />
          </IconButton>
        </Tooltip>
      );
    }
    let commentButton = <Fragment />;
    if (this.props.mode != 'gridcard') {
      commentButton = (
        <Link href="/join" passHref>
          <Tooltip title="Login to reply" placement="bottom">
            <IconButton aria-label="Upvote">
              <CommentIcon className="mr" />
            </IconButton>
          </Tooltip>
        </Link>
      );
      if (this.state.user != null) {
        commentButton = (
          <Tooltip title="Reply" placement="bottom">
            <IconButton
              aria-label="Comment"
              onClick={() => this.expandCommentBar()}
            >
              <CommentIcon className="mr" />
            </IconButton>
          </Tooltip>
        );
      }
    }
    let linkButton = <Fragment />;
    if (this.props.mode === 'comment') {
      linkButton = (
        <Link
          as={`/@${this.props.author}/${this.props.permlink}`}
          href={`/post?author=${this.props.author}&permlink=${
            this.props.permlink
          }`}
          passHref
        >
          <Tooltip title="Link to comment" placement="bottom">
            <IconButton aria-label="Link">
              <LinkIcon className="mr" />
            </IconButton>
          </Tooltip>
        </Link>
      );
    }
    let editButton = <Fragment />;
    if (this.props.handleClick !== undefined) {
      if (this.props.isEdit === true) {
        editButton = (
          <Tooltip title="Edit" placement="bottom">
            <IconButton
              aria-label="Edit"
              onClick={() => {
                this.props.handleClick();
              }}
            >
              <EditIcon className="mr" />
            </IconButton>
          </Tooltip>
        );
      }
    }
    if (this.state.voteExpanded == false) {
      cardFooter = (
        <CardActions>
          <div className="container">
            <div className="row">
              <div className={rowitem1}>
                {voteButton}
                <span className="text-muted font-weight-bold">
                  {this.state.totalmiles || this.props.total_votes}
                  {commentButton}
                  {editButton}
                  {linkButton}
                </span>
              </div>
              <div className={rowitem2}>
                {this.props.tags.map(tag => {
                  return (
                    <Link
                      as={`/favorites/${tag}`}
                      href={`/tag?orderby=total_votes&tags=${tag}`}
                      key={tag}
                      passHref
                    >
                      <a>
                        <span
                          className="badge badge-secondary m-1 p-1 pl-2 pr-2 rounded"
                          style={sliderstyle}
                        >
                          {tag.toUpperCase()}
                        </span>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </CardActions>
      );
    }
    let weightIndicator = (
      <span className="text-muted font-weight-bold">{this.state.weight}</span>
    );
    if (this.state.loading !== undefined) {
      weightIndicator = (
        <CircularProgress value={this.state.loading} size={19} thickness={4} />
      );
    }
    if (this.state.voteExpanded == true) {
      cardFooter = (
        <Query query={GET_VOTE_WEIGHTS}>
          {({ data, loading, error }) => {
            if (loading || error) {
              return <Fragment />;
            }
            // set default vote weight based on preferences if not voted
            if (data && !this.state.loaded && !this.state.hasVoted) {
              this.props.depth === 0 &&
                this.setState({
                  loaded: true,
                  weight: data.preferences.defaultVoteWeight,
                });
              this.props.depth > 0 &&
                this.setState({
                  loaded: true,
                  weight: data.preferences.defaultCommentsVoteWeight,
                });
            }
            return (
              <CardActions>
                <Tooltip title="Upvote now" placement="bottom">
                  <IconButton
                    aria-label="Upvote"
                    onClick={() =>
                      this.votePost(this.props.author, this.props.permlink)
                    }
                    color="primary"
                  >
                    <FlightIcon className="mr" />
                  </IconButton>
                </Tooltip>
                <div>{weightIndicator}</div>
                <Slider
                  value={this.state.weight}
                  min={1}
                  max={10}
                  step={1}
                  onChange={this.setWeight}
                />
                <Tooltip title="Close" placement="bottom">
                  <IconButton onClick={() => this.collapseVoteBar()}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            );
          }}
        </Query>
      );
    }
    if (this.props.mode != 'gridcard' && this.state.commentExpanded == true) {
      // const CommentEditor = dynamic(() => import("./Editor/CommentEditor"), {
      //   loading: () => <p>Loading...</p>,
      //   ssr: false
      // });
      // cardFooter = (
      //   <CardActions>
      //     <div className="w-100">
      //       <CommentEditor
      //         parent_author={this.props.author}
      //         parent_permlink={this.props.permlink}
      //         onClose={() => this.collapseCommentBar()}
      //         onCommentAdd={this.props.onCommentAdd}
      //       />
      //     </div>
      //     <Tooltip title="Close" placement="bottom">
      //       <IconButton onClick={() => this.collapseCommentBar()}>
      //         <CloseIcon />
      //       </IconButton>
      //     </Tooltip>
      //   </CardActions>
      // );
    }
    return <Fragment>{cardFooter}</Fragment>;
  }
}

VoteSlider.propTypes = {
  onCommentAdd: PropTypes.func,
  author: PropTypes.string,
  permlink: PropTypes.string,
  votes: PropTypes.string,
  total_votes: PropTypes.number,
  tags: PropTypes.array,
  mode: PropTypes.string,
  enqueueSnackbar: PropTypes.func,
  handleClick: PropTypes.func,
  isEdit: PropTypes.bool,
  depth: PropTypes.number.isRequired,
};

export default withSnackbar(VoteSlider);
