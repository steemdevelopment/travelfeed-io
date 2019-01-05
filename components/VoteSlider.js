import React, { Fragment, Component } from "react";
import CardActions from "@material-ui/core/CardActions";
import FlightIcon from "@material-ui/icons/FlightTakeoff";
import FlightVotedIcon from "@material-ui/icons/Flight";
import CloseIcon from "@material-ui/icons/Close";
import CommentIcon from "@material-ui/icons/AddComment";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getUser } from "../utils/token";
import Link from "next/link";
import { vote } from "../utils/actions";
import Slider from "@material-ui/lab/Slider";
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";
import PostEditor from "./PostEditor";
import { Client } from "dsteem";

const client = new Client("https://api.steemit.com");

class VoteSlider extends Component {
  state = {
    voteExpanded: false,
    commentExpanded: false,
    loading: 100,
    weight: 5,
    hasVoted: false,
    totalmiles: 0,
    user: null
  };
  newNotification(notification) {
    if (notification != undefined) {
      const text = notification[0];
      const variant = notification[1];
      this.props.enqueueSnackbar(text, { variant });
    }
  }
  getTotalMiles = async () => {
    let totalmiles = 0;
    for (let vote = 0; vote < this.state.activeVotes.length; vote++) {
      totalmiles += Math.round(this.state.activeVotes[vote].percent / 1000);
    }
    this.setState({ totalmiles: totalmiles });
  };
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
    vote(author, permlink, weight).then(result => {
      this.newNotification(result);
    });
    this.setState({
      loading: 0
    });
    if (this.state.hasVoted == false) {
      this.setState({
        totalmiles: this.state.totalmiles + this.state.weight
      });
    }
    this.timer = setInterval(this.progress, 20);
  }
  progress = () => {
    const { loading } = this.state;
    if (loading <= 100) {
      this.setState({ loading: loading + 1 });
    } else {
      this.setState({ loading: 0, hasVoted: true });
      clearInterval(this.timer);
      this.collapseVoteBar();
    }
  };
  async getActiveVotes() {
    var active_votes = this.props.post.active_votes;
    if (this.props.mode == "comment") {
      active_votes = await client.database.call("get_active_votes", [
        this.props.post.author,
        this.props.post.permlink
      ]);
    }
    this.setState({
      activeVotes: active_votes
    });
  }
  async componentDidMount() {
    const user = getUser();
    this.setState({
      user: user
    });
    await this.getActiveVotes();
    this.getTotalMiles();
    for (let vote = 0; vote < this.state.activeVotes.length; vote++) {
      if (this.state.activeVotes[vote].voter == user) {
        this.setState({
          weight: Math.round(this.state.activeVotes[vote].percent / 1000),
          hasVoted: true
        });
      }
    }
  }
  render() {
    var sliderstyle = {};
    var rowitem1 = "col-5 p-0";
    var rowitem2 = "col-7 text-right p-0 pt-2";
    if (this.props.mode == "gridcard") {
      sliderstyle = { fontSize: "0.6rem" };
      rowitem1 = "col-6 p-0";
      rowitem2 = "col-6 pt-2 p-0 text-right";
    }
    const post = this.props.post;
    var cardFooter = <Fragment />;
    var voteButton = (
      <Link href="/join" passHref>
        <IconButton aria-label="Upvote">
          <FlightIcon className="mr" />
        </IconButton>
      </Link>
    );
    if (this.state.user != null) {
      voteButton = (
        <IconButton aria-label="Upvote" onClick={() => this.expandVoteBar()}>
          <FlightIcon className="mr" />
        </IconButton>
      );
    }
    if (this.state.hasVoted == true) {
      voteButton = (
        <IconButton
          aria-label="Upvote"
          onClick={() => this.expandVoteBar()}
          color="primary"
        >
          <FlightVotedIcon className="mr" />
        </IconButton>
      );
    }
    var commentButton = <Fragment />;
    if (this.props.mode != "gridcard") {
      commentButton = (
        <Link href="/join" passHref>
          <IconButton aria-label="Upvote">
            <CommentIcon className="mr" />
          </IconButton>
        </Link>
      );
      if (this.state.user != null) {
        commentButton = (
          <IconButton
            aria-label="Comment"
            onClick={() => this.expandCommentBar()}
          >
            <CommentIcon className="mr" />
          </IconButton>
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
                  {this.state.totalmiles}
                  {commentButton}
                </span>
              </div>
              <div className={rowitem2}>
                {this.props.tags.map(tag => {
                  return (
                    <Link
                      as={`/created/${tag}`}
                      href={`/tag?sortby=created&tag=${tag}`}
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
    var weightIndicator = (
      <span className="text-muted font-weight-bold">{this.state.weight}</span>
    );
    if (this.state.loading != 100 && this.state.loading != 0) {
      weightIndicator = (
        <CircularProgress
          variant="determinate"
          value={this.state.loading}
          size={18}
          thickness={4}
        />
      );
    }
    if (this.state.voteExpanded == true) {
      cardFooter = (
        <CardActions>
          <IconButton
            aria-label="Upvote"
            onClick={() => this.votePost(post.author, post.permlink)}
            color="primary"
          >
            <FlightIcon className="mr" />
          </IconButton>
          <div>{weightIndicator}</div>
          <Slider
            value={this.state.weight}
            min={1}
            max={10}
            step={1}
            onChange={this.setWeight}
          />
          <IconButton onClick={() => this.collapseVoteBar()}>
            <CloseIcon />
          </IconButton>
        </CardActions>
      );
    }
    if (this.state.commentExpanded == true) {
      cardFooter = (
        <CardActions>
          <div className="w-100">
            <PostEditor
              type="comment"
              initialValue="Write a reply now!"
              edit={{
                parent_author: post.author,
                parent_permlink: post.permlink
              }}
            />
          </div>
          <IconButton onClick={() => this.collapseCommentBar()}>
            <CloseIcon />
          </IconButton>
        </CardActions>
      );
    }
    return <Fragment>{cardFooter}</Fragment>;
  }
}

VoteSlider.propTypes = {
  post: PropTypes.object.isRequired,
  mode: PropTypes.string,
  tags: PropTypes.array,
  enqueueSnackbar: PropTypes.function
};

export default withSnackbar(VoteSlider);
