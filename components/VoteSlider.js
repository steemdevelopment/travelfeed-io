import React, { Fragment, Component } from "react";
import CardActions from "@material-ui/core/CardActions";
import FlightIcon from "@material-ui/icons/FlightTakeoff";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getUser } from "../utils/token";
import Link from "next/link";
import { vote } from "../utils/actions";
import Slider from "@material-ui/lab/Slider";

class VoteSlider extends Component {
  state = {
    voteExpanded: false,
    loading: 100,
    weight: 5,
    hasVoted: false,
    totalmiles: 0
  };
  getTotalMiles() {
    const post = this.props.post;
    let totalmiles = 0;
    for (let vote = 0; vote < post.active_votes.length; vote++) {
      totalmiles += Math.round(post.active_votes[vote].percent / 1000);
    }
    this.setState({ totalmiles: totalmiles });
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
  votePost(author, permlink) {
    const weight = this.state.weight * 1000;
    vote(author, permlink, weight);
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
  componentDidMount() {
    const post = this.props.post;
    const user = getUser();
    this.getTotalMiles();
    for (let vote = 0; vote < post.active_votes.length; vote++) {
      if (post.active_votes[vote].voter == user) {
        this.setState({
          weight: Math.round(post.active_votes[vote].percent / 1000),
          hasVoted: true
        });
      }
    }
  }
  render() {
    var sliderstyle = {};
    var rowitem1 = "col-2 p-0";
    var rowitem2 = "col-10 text-right p-0 pt-2";
    if (this.props.sliderstyle == "gridcard") {
      sliderstyle = { fontSize: "0.6rem" };
      rowitem1 = "col-6 p-0";
      rowitem2 = "col-6 pt-2 p-0 text-right";
    }
    const post = this.props.post;
    var cardFooter = <Fragment />;
    var voteButton = (
      <IconButton aria-label="Upvote" onClick={() => this.expandVoteBar()}>
        <FlightIcon className="mr" />
      </IconButton>
    );
    if (this.state.hasVoted == true) {
      voteButton = (
        <IconButton
          aria-label="Upvote"
          onClick={() => this.expandVoteBar()}
          color="primary"
        >
          <FlightIcon className="mr" />
        </IconButton>
      );
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
    return <Fragment>{cardFooter}</Fragment>;
  }
}

export default VoteSlider;
