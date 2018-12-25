import React, { Fragment, Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import FlightIcon from "@material-ui/icons/FlightTakeoff";
import Avatar from "@material-ui/core/Avatar";
import getImage from "../helpers/getImage";
import dateFromJsonString from "../helpers/dateFromJsonString";
import StarIcon from "@material-ui/icons/Star";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getUser } from "../utils/token";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { regExcerpt, regTitle } from "../utils/regex";
import { vote } from "../utils/actions";
import Slider from "@material-ui/lab/Slider";

class PostCard extends Component {
  state = {
    voteExpanded: false,
    loading: 100,
    weight: 5,
    hasVoted: false,
    isCurated: false,
    totalmiles: 0
  };
  getTotalMiles() {
    const post = this.props.post;
    let totalmiles = 0;
    for (let vote = 0; vote < post.active_votes.length; vote++) {
      totalmiles += Math.round(post.active_votes[vote].percent / 1000);
      if (
        post.active_votes[vote].voter == "travelfeed" &&
        post.active_votes[vote].percent > 8000
      ) {
        this.setState({ isCurated: true });
      }
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
    const post = this.props.post;
    let sanitized = this.props.sanitized;
    const readtime = this.props.readtime;
    let title = regTitle(post.title);
    title = title.length > 85 ? title.substring(0, 81) + "[...]" : title;
    var isCurated = <Fragment />;
    if (this.state.isCurated == true) {
      isCurated = (
        <IconButton>
          <StarIcon />
        </IconButton>
      );
    }
    const json_date = '{ "date": "' + post.created + 'Z" }';
    const date_object = new Date(
      JSON.parse(json_date, dateFromJsonString).date
    );
    const json = JSON.parse(post.json_metadata);
    const posttag =
      typeof json.tags != "undefined" && json.tags.length > 0
        ? json.tags[1]
        : "";
    let excerpt = regExcerpt(sanitized);
    const created = date_object.toDateString();
    const image = getImage(post.json_metadata, post.body, "400x0");
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
              <div className="col-6 p-0">
                {voteButton}
                <span className="text-muted font-weight-bold">
                  {this.state.totalmiles}
                </span>
              </div>
              <div className="col-6 pt-2 p-0 text-right">
                <Link
                  as={`/created/${posttag}`}
                  href={`/tag?sortby=created&tag=${posttag}`}
                  passHref
                >
                  <a>
                    {" "}
                    <span
                      className="badge badge-secondary p-1 pl-2 pr-2 rounded cpointer small"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {posttag.toUpperCase()}
                    </span>
                  </a>
                </Link>
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
    return (
      <Card key={post.permlink} className="m-2">
        <CardHeader
          avatar={
            <Link
              as={`/@${post.author}`}
              href={`/blog?author=${post.author}`}
              passHref
            >
              <a>
                <Avatar
                  style={{ cursor: "pointer" }}
                  src={`https://steemitimages.com/u/${
                    post.author
                  }/avatar/small`}
                />
              </a>
            </Link>
          }
          action={isCurated}
          title={
            <Link
              as={`/@${post.author}`}
              href={`/blog?author=${post.author}`}
              passHref
            >
              <a className="text-dark">{post.author}</a>
            </Link>
          }
          subheader={created + " | " + readtime.text}
        />
        <CardActionArea>
          <CardMedia
            style={{ height: 140 }}
            className="pt-2 text-right"
            image={image}
          />
          <Link
            as={`/@${post.author}/${post.permlink}`}
            href={`/post?author=${post.author}&permlink=${post.permlink}`}
            passHref
          >
            <a>
              {" "}
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {title}
                </Typography>
                <Typography component="p">{excerpt} [...]</Typography>
              </CardContent>
            </a>
          </Link>
        </CardActionArea>
        {cardFooter}
      </Card>
    );
  }
}

export default PostCard;
