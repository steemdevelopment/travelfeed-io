import React, { Fragment, Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import getImage from "../helpers/getImage";
import dateFromJsonString from "../helpers/dateFromJsonString";
import StarIcon from "@material-ui/icons/Star";
import IconButton from "@material-ui/core/IconButton";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { regExcerpt, regTitle } from "../utils/regex";
import VoteSlider from "./VoteSlider";
import PropTypes from "prop-types";

class PostCard extends Component {
  render() {
    const post = this.props.post;
    var isCurated = <Fragment />;
    for (let vote = 0; vote < post.active_votes.length; vote++) {
      if (
        post.active_votes[vote].voter == "travelfeed" &&
        post.active_votes[vote].percent > 8000
      ) {
        isCurated = (
          <IconButton>
            <StarIcon />
          </IconButton>
        );
      }
    }
    let sanitized = this.props.sanitized;
    const readtime = this.props.readtime;
    let title = regTitle(post.title);
    title = title.length > 85 ? title.substring(0, 81) + "[...]" : title;
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
        <Link
          as={`/@${post.author}/${post.permlink}`}
          href={`/post?author=${post.author}&permlink=${post.permlink}`}
          passHref
        >
          <a>
            <CardActionArea>
              <CardMedia
                style={{ height: 140 }}
                className="pt-2 text-right"
                image={image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {title}
                </Typography>
                <Typography component="p">{excerpt} [...]</Typography>
              </CardContent>
            </CardActionArea>
          </a>
        </Link>
        <VoteSlider post={post} tags={[posttag]} mode="gridcard" />
      </Card>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object,
  readtime: PropTypes.object,
  sanitized: PropTypes.string
};

export default PostCard;
