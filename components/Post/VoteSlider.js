// Todo: Tooltip with individual voters over total miles

import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/AddComment';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import FlightVotedIcon from '@material-ui/icons/Flight';
import FlightIcon from '@material-ui/icons/FlightTakeoff';
import LinkIcon from '@material-ui/icons/Link';
import Slider from '@material-ui/lab/Slider';
import dynamic from 'next/dynamic';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { vote } from '../../helpers/actions';
import { GET_VOTE_WEIGHTS } from '../../helpers/graphql/settings';
import { getUser } from '../../helpers/token';
import Link from '../../lib/Link';

class VoteSlider extends Component {
  state = {
    loaded: false,
    voteExpanded: false,
    commentExpanded: false,
    loading: undefined,
    weight: 5,
    hasVoted: false,
    user: null,
    totalmiles: null,
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

  progress = () => {
    const { loading } = this.state;
    if (loading < 100) {
      this.setState({ loading: loading + 1 });
    } else {
      this.setState({ loading: 0 });
    }
  };

  setWeight = (event, value) => {
    this.setState({ weight: value });
  };

  votePost(author, permlink) {
    const weight = this.state.weight * 1000;
    this.setState({ loading: 0 });
    return vote(author, permlink, weight).then(res => {
      if (res) {
        if (!res.success) this.newNotification(res);
        else
          this.setState(prevState => ({
            hasVoted: true,
            totalmiles: prevState.totalmiles + prevState.weight,
          }));
        this.setState({ loading: undefined });
        this.collapseVoteBar();
      }
    });
  }

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

  newNotification(notification) {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      this.props.enqueueSnackbar(notification.message, { variant });
    }
  }

  render() {
    const actions = [];
    let sliderstyle = {};
    let rowitem1 = 'col-5 p-0';
    let rowitem2 = 'col-7 text-right p-0 my-auto pr-2';
    if (this.props.mode === 'gridcard') {
      sliderstyle = { fontSize: '0.6rem' };
      rowitem1 = 'col-6 p-0';
      rowitem2 = 'col-6 p-0 text-right my-auto pr-2';
    } else if (this.props.mode === 'comment') {
      rowitem1 = 'col-12 p-0';
      rowitem2 = 'd-none';
    }
    let cardFooter = <Fragment />;
    let voteButton = (
      <Link color="textPrimary" href="/join" passHref>
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
    if (this.state.hasVoted === true) {
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
    actions.push(
      <Fragment>
        {voteButton}
        <Typography
          component="div"
          display="inline"
          color="inherit"
          className="pr-2"
        >
          <Box
            fontSize={16}
            color="text.icon"
            fontWeight="fontWeightBold"
            component="span"
          >
            {this.state.totalmiles || this.props.total_votes}
          </Box>
        </Typography>
      </Fragment>,
    );
    let numberreplies = '';
    if (this.props.children !== 0)
      numberreplies = (
        <Typography component="div" display="inline" className="pr-2">
          <Box
            fontSize={16}
            color="text.icon"
            fontWeight="fontWeightBold"
            component="span"
          >
            {this.props.children}
          </Box>
        </Typography>
      );
    if (this.props.mode !== 'gridcard') {
      if (this.state.user != null) {
        actions.push(
          <Fragment>
            <Tooltip title="Reply" placement="bottom">
              <IconButton
                aria-label="Reply"
                onClick={() => this.expandCommentBar()}
              >
                <CommentIcon className="mr" />
              </IconButton>
            </Tooltip>
            {numberreplies}
          </Fragment>,
        );
      } else {
        actions.push(
          <Fragment>
            <Link color="textPrimary" href="/join" passHref>
              <Tooltip title="Login to reply" placement="bottom">
                <IconButton aria-label="Reply">
                  <CommentIcon className="mr" />
                </IconButton>
              </Tooltip>
            </Link>
            {numberreplies}
          </Fragment>,
        );
      }
    }
    if (this.props.mode === 'comment') {
      actions.push(
        <Link
          color="textPrimary"
          as={`/@${this.props.author}/${this.props.permlink}`}
          href={`/post?author=${this.props.author}&permlink=${this.props.permlink}`}
          passHref
        >
          <Tooltip title="Link to comment" placement="bottom">
            <IconButton aria-label="Link">
              <LinkIcon className="mr" />
            </IconButton>
          </Tooltip>
        </Link>,
      );
    }
    if (this.props.handleClick !== undefined) {
      if (this.props.isEdit === true) {
        actions.push(
          <Tooltip title="Edit" placement="bottom">
            <IconButton
              aria-label="Edit"
              onClick={() => {
                this.props.handleClick();
              }}
            >
              <EditIcon className="mr" />
            </IconButton>
          </Tooltip>,
        );
      }
    }
    if (this.state.voteExpanded === false) {
      cardFooter = (
        <Fragment>
          <Divider variant="middle" />
          <div className="container-fluid">
            <div className="row">
              <div className={rowitem1}>
                <CardActions disableSpacing>
                  {actions.map(action => {
                    return <div className="actionli">{action}</div>;
                  })}
                </CardActions>
              </div>
              <style jsx>{`
                .actionli::after {
                  content: '\u2022';
                  color: #ccc;
                  top: 1px;
                }
                .actionli:last-child:after {
                  content: '';
                }
              `}</style>
              <div className={rowitem2}>
                {this.props.tags.map(tag => {
                  return (
                    <Link
                      color="textPrimary"
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
        </Fragment>
      );
    }
    let weightIndicator = (
      <Typography component="div" display="inline" className="pr-1">
        <Box
          fontSize={16}
          color="text.icon"
          fontWeight="fontWeightBold"
          component="span"
        >
          {this.state.weight}
        </Box>
      </Typography>
    );
    if (this.state.loading !== undefined) {
      weightIndicator = (
        <CircularProgress value={this.state.loading} size={19} thickness={4} />
      );
    }
    if (this.state.voteExpanded === true) {
      cardFooter = (
        <Query query={GET_VOTE_WEIGHTS}>
          {({ data, loading, error }) => {
            if (loading || error) {
              return <Fragment />;
            }
            // set default vote weight based on preferences if not voted
            if (data && !this.state.loaded && !this.state.hasVoted) {
              if (this.props.depth === 0)
                this.setState({
                  loaded: true,
                  weight: data.preferences.defaultVoteWeight,
                });
              if (this.props.depth > 0)
                this.setState({
                  loaded: true,
                  weight: data.preferences.defaultCommentsVoteWeight,
                });
            }
            return (
              <Fragment>
                <Divider variant="middle" />
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
                  <div className="pr-2">{weightIndicator}</div>
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
              </Fragment>
            );
          }}
        </Query>
      );
    }
    if (this.props.mode !== 'gridcard' && this.state.commentExpanded === true) {
      const CommentEditor = dynamic(() => import('../Editor/CommentEditor'), {
        ssr: false,
      });
      cardFooter = (
        <Fragment>
          <Divider variant="middle" />
          <CardActions>
            <div className="w-100">
              <CommentEditor
                parent_author={this.props.author}
                parent_permlink={this.props.permlink}
                onClose={() => this.collapseCommentBar()}
                onCommentEdit={this.props.onCommentAdd}
              />
            </div>
            <Tooltip title="Close" placement="bottom">
              <IconButton onClick={() => this.collapseCommentBar()}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Fragment>
      );
    }
    return <Fragment>{cardFooter}</Fragment>;
  }
}

VoteSlider.defaultProps = {
  handleClick: undefined,
  isEdit: undefined,
  onCommentAdd: undefined,
  children: 0,
};

VoteSlider.propTypes = {
  onCommentAdd: PropTypes.func,
  children: PropTypes.number,
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
  votes: PropTypes.string.isRequired,
  total_votes: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  mode: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
  isEdit: PropTypes.bool,
  depth: PropTypes.number.isRequired,
};

export default withSnackbar(VoteSlider);
