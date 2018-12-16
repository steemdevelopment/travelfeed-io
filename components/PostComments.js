import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import PropTypes from "prop-types";
import { Client } from "dsteem";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import "@babel/polyfill";
import isBlacklisted from "../helpers/isBlacklisted";
import PostAuthorProfile from "../components/PostAuthorProfile";
import dateFromJsonString from "../helpers/dateFromJsonString";
import { getHtml } from "../components/busy/Body";
import IconButton from "@material-ui/core/IconButton";
import FlightIcon from "@material-ui/icons/FlightTakeoff";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const client = new Client("https://api.steemit.com");

class PostComments extends Component {
  state = {
    author: this.props.author,
    permlink: this.props.permlink,
    error: false,
    hasMore: true,
    isLoading: false,
    stream: []
  };
  streamComments = async () => {
    this.setState({
      isLoading: true
    });
    try {
      const stream = await client.database.call("get_content_replies", [
        this.state.author,
        this.state.permlink
      ]);
      this.setState({
        stream: stream,
        isLoading: false,
        hasMore: false
      });
    } catch (err) {
      this.setState({
        error: err.message,
        isLoading: false
      });
    }
  };
  componentDidMount() {
    window.onscroll = () => {
      const {
        streamComments,
        state: { error, isLoading, hasMore }
      } = this;
      if (error || isLoading || !hasMore) return;
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.scrollHeight
      ) {
        streamComments();
      }
    };
  }
  render() {
    const { error, isLoading } = this.state;
    // todo: Add support for comments with children
    return (
      <Fragment>
        {this.state.stream.map(comment => {
          if (isBlacklisted(comment.author, "none") != true) {
            let getbody = comment.body
              .replace(
                /(?:(?<=(?:src="))|(?:(?<=(?:\())))((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:(?=["|)]))/gi,
                "https://steemitimages.com/1000x0/$1"
              )
              .replace(
                /(?:(?<=[^"|^(|^s|^t]))((?:https|http)?:\/\/.*\.(?:png|jpg|gif|jpeg))(?:(?=[^"|^)]))/gi,
                '<img src="https://steemitimages.com/1000x0/$1"/>'
              )
              .replace(/^(https:\/\/steemitimages\.com\/0x0\/)/, "");
            let htmlBody = getHtml(getbody, {}, "text")
              .replace(/https:\/\/steemit.com/gi, "")
              .replace(/(href=)(?=(?:"http))/gi, 'rel="nofollow" href=')
              .replace(/(target="_blank" href=)(?=(?:"\/))/gi, "href=");
            const bodyText = { __html: htmlBody };
            const json_date = '{ "date": "' + comment.created + 'Z" }';
            const date_object = new Date(
              JSON.parse(json_date, dateFromJsonString).date
            );
            const created = date_object.toDateString();
            return (
              <Fragment>
                <Card className="mb-3">
                  <CardHeader
                    avatar={
                      <Link
                        as={`/@${comment.author}`}
                        href={`/blog?author=${comment.author}`}
                      >
                        <Avatar
                          className="cpointer"
                          src={`https://steemitimages.com/u/${
                            comment.author
                          }/avatar/small`}
                        />
                      </Link>
                    }
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={
                      <Fragment>
                        <Link
                          as={`/@${comment.author}`}
                          href={`/blog?author=${comment.author}`}
                        >
                          <a className="text-dark cpointer">{comment.author}</a>
                        </Link>
                      </Fragment>
                    }
                    subheader={created}
                  />
                  <CardContent>
                    <div
                      className="postcontent"
                      dangerouslySetInnerHTML={bodyText}
                    />
                  </CardContent>
                </Card>
              </Fragment>
            );
          }
        })}
        {!error && <Typography>{error}</Typography>}
        {isLoading && (
          <Grid item xs={1}>
            <CircularProgress />
          </Grid>
        )}
      </Fragment>
    );
  }
}
PostComments.propTypes = {
  author: PropTypes.string,
  permlink: PropTypes.string
};

export default PostComments;
