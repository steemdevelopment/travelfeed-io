import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import parseBody from "../helpers/parseBody";
import "@babel/polyfill";
import dateFromJsonString from "../helpers/dateFromJsonString";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import PropTypes from "prop-types";
import VoteSlider from "./VoteSlider";
import PostComments from "./PostComments";
import Typography from "@material-ui/core/Typography";
import SubHeader from "./Post/SubHeader";

class PostpostItem extends Component {
  render() {
    let htmlBody = parseBody(this.props.post.body, {});
    const bodyText = { __html: htmlBody };
    const json_date = '{ "date": "' + this.props.post.created_at + 'Z" }';
    const date_object = new Date(
      JSON.parse(json_date, dateFromJsonString).date
    );
    const created_at = date_object.toDateString();
    let children = <Fragment />;
    if (this.props.post.children !== 0 && this.props.loadreplies == true) {
      children = <PostComments post_id={this.props.post.post_id} />;
    }
    let debth = 0;
    if (this.props.post.depth > 1 && this.props.loadreplies == true) {
      debth = `${String(this.props.post.depth * 20)}px`;
    }
    let title = <Fragment />;
    let appIcon = <Fragment />;
    // Set the caninical URL to travelfeed.io if the post was authored through the dApp
    if (
      this.props.post.app !== undefined &&
      this.props.post.app.split("/")[0] === "travelfeed"
    ) {
      appIcon = (
        <img
          width="25"
          className="mr-1"
          src="https://travelfeed.io/favicon.ico"
        />
      );
    }
    if (this.props.title == true) {
      title = (
        <Link
          as={`/@${this.props.post.parent_author}/${
            this.props.post.parent_permlink
          }`}
          href={`/post?author=${this.props.post.parent_author}&permlink=${
            this.props.post.parent_permlink
          }`}
          passHref
        >
          <a>
            <Typography gutterBottom letiant="h5">
              Re: {this.props.post.root_title}
            </Typography>
          </a>
        </Link>
      );
    }
    return (
      <Fragment>
        <Card
          className="mb-3"
          style={{ marginLeft: debth }}
          id={this.props.post.permlink}
        >
          <CardHeader
            avatar={
              <Link
                as={`/@${this.props.post.author}`}
                href={`/blog?author=${this.props.post.author}`}
                passHref
              >
                <a>
                  <Avatar
                    className="cpointer"
                    src={`https://steemitimages.com/u/${
                      this.props.post.author
                    }/avatar/small`}
                  />
                </a>
              </Link>
            }
            action={appIcon}
            title={
              <Link
                as={`/@${this.props.post.author}`}
                href={`/blog?author=${this.props.post.author}`}
                passHref
              >
                <a className="text-dark cpointer">
                  <strong>{this.props.post.display_name}</strong>
                  <span className="text-muted"> @{this.props.post.author}</span>
                </a>
              </Link>
            }
            subheader={<SubHeader created_at={this.props.post.created_at} />}
          />
          <CardContent>
            {title}
            <div className="postcontent" dangerouslySetInnerHTML={bodyText} />
          </CardContent>
          <VoteSlider
            author={this.props.post.author}
            permlink={this.props.post.permlink}
            votes={this.props.post.votes}
            total_votes={this.props.post.total_votes}
            tags={[]}
            mode="comment"
          />
        </Card>
        {children}
      </Fragment>
    );
  }
}

PostpostItem.defaultProps = {
  loadreplies: true,
  title: false
};

PostpostItem.propTypes = {
  post: PropTypes.object.isRequired,
  loadreplies: PropTypes.bool,
  title: PropTypes.bool
};

export default PostpostItem;
