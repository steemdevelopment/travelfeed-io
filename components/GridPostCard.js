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
import IconButton from "@material-ui/core/IconButton";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { regExcerpt, regTitle } from "../utils/regex";

class PostCard extends Component {
  render() {
    const post = this.props.post;
    let sanitized = this.props.sanitized;
    const readtime = this.props.readtime;
    let totalmiles = 0;
    let title = regTitle(post.title);
    title = title.length > 85 ? title.substring(0, 81) + "[...]" : title;
    var iscurated = <Fragment />;
    //Proposal for voting system: Each user can give between 0.1 and 10 "miles", each 0.1 mile equals a 1% upvote.
    for (let vote = 0; vote < post.active_votes.length; vote++) {
      totalmiles += Math.round(post.active_votes[vote].percent / 1000);
      if (
        post.active_votes[vote].voter == "travelfeed" &&
        post.active_votes[vote].percent > 8000
      ) {
        iscurated = (
          <IconButton>
            <StarIcon />
          </IconButton>
        );
      }
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
          action={iscurated}
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
        <CardActions>
          <div className="container">
            <div className="row">
              <div className="col-6 p-0">
                <IconButton aria-label="Upvote">
                  <FlightIcon className="mr" />
                </IconButton>
                <span className="text-muted font-weight-bold">
                  {totalmiles}
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
      </Card>
    );
  }
}

export default PostCard;
