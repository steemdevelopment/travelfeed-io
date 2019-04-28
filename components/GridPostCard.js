import React, { Fragment, Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import VoteSlider from "./VoteSlider";
import PropTypes from "prop-types";
import IsCurated from "./IsCurated";
import SubHeader from "./Post/SubHeader";
import BookmarkIcon from "./Post/BookmarkIcon";

class PostCard extends Component {
  state = { show: true };
  hide() {
    this.setState({ show: false });
  }
  render() {
    // Hide if deleted (for bookmarks)
    if (!this.state.show) {
      return <Fragment />;
    }
    let action = <Fragment />;
    if (this.props.showBookmark === true) {
      action = (
        <BookmarkIcon
          author={this.props.author}
          permlink={this.props.permlink}
        />
      );
    } else if (this.props.isBookmark === true) {
      action = (
        <BookmarkIcon
          author={this.props.author}
          permlink={this.props.permlink}
          onBmChange={this.hide.bind(this)}
        />
      );
    } else {
      let appIcon = <Fragment />;
      if (this.props.app.split("/")[0] === "travelfeed") {
        appIcon = (
          <img
            width="25"
            className="mr-1"
            src="https://travelfeed.io/favicon.ico"
          />
        );
      }
      action = (
        <Fragment>
          {appIcon}
          <IsCurated curation_score={this.props.curation_score} />
        </Fragment>
      );
    }
    return (
      <Card key={this.props.permlink} className="m-2">
        <CardHeader
          avatar={
            <Link
              as={`/@${this.props.author}`}
              href={`/blog?author=${this.props.author}`}
              passHref
            >
              <a>
                <Avatar
                  style={{ cursor: "pointer" }}
                  src={`https://steemitimages.com/u/${
                    this.props.author
                  }/avatar/small`}
                />
              </a>
            </Link>
          }
          action={<Fragment>{action}</Fragment>}
          title={
            <Link
              as={`/@${this.props.author}`}
              href={`/blog?author=${this.props.author}`}
              passHref
            >
              <a className="text-dark cpointer">
                <strong>{this.props.display_name}</strong>
                <span className="text-muted"> @{this.props.author}</span>
              </a>
            </Link>
          }
          subheader={
            <SubHeader
              created_at={this.props.created_at}
              readtime={this.props.readtime}
            />
          }
        />
        <Link
          as={`/@${this.props.author}/${this.props.permlink}`}
          href={`/post?author=${this.props.author}&permlink=${
            this.props.permlink
          }`}
          passHref
        >
          <a>
            <CardActionArea>
              {this.props.img_url !== undefined && (
                <CardMedia
                  style={{ height: this.props.cardHeight }}
                  className="pt-2 text-right"
                  image={this.props.img_url}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.props.title}
                </Typography>
                <Typography component="p">
                  {this.props.excerpt} [...]
                </Typography>
              </CardContent>
            </CardActionArea>
          </a>
        </Link>
        <VoteSlider
          author={this.props.author}
          permlink={this.props.permlink}
          votes={this.props.votes}
          total_votes={this.props.total_votes}
          tags={this.props.tags}
          mode="gridcard"
        />{" "}
      </Card>
    );
  }
}

PostCard.default = {
  showBookmark: false,
  isBookmark: false
};

PostCard.propTypes = {
  author: PropTypes.string,
  display_name: PropTypes.string,
  permlink: PropTypes.string,
  title: PropTypes.string,
  img_url: PropTypes.string,
  created_at: PropTypes.string,
  readtime: PropTypes.object,
  excerpt: PropTypes.string,
  votes: PropTypes.string,
  total_votes: PropTypes.number,
  tags: PropTypes.array,
  curation_score: PropTypes.number,
  app: PropTypes.string,
  showBookmark: PropTypes.bool,
  isBookmark: PropTypes.bool,
  cardHeight: PropTypes.number
};

export default PostCard;
