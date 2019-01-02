import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import parseBody from "../helpers/parseBody";
import "@babel/polyfill";
import dateFromJsonString from "../helpers/dateFromJsonString";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import PropTypes from "prop-types";
import VoteSlider from "./VoteSlider";
import PostComments from "./PostComments";

class PostpostItem extends Component {
  render() {
    let htmlBody = parseBody(this.props.post.body, {});
    const bodyText = { __html: htmlBody };
    const json_date = '{ "date": "' + this.props.post.created + 'Z" }';
    const date_object = new Date(
      JSON.parse(json_date, dateFromJsonString).date
    );
    const created = date_object.toDateString();
    var children = <Fragment />;
    if (this.props.post.children > 0) {
      children = (
        <PostComments
          author={this.props.post.author}
          permlink={this.props.post.permlink}
        />
      );
    }
    var debth = 0;
    if (this.props.post.depth > 1) {
      debth = `${String(this.props.post.depth * 20)}px`;
    }
    console.log(debth);
    return (
      <Fragment>
        <Card className="mb-3" style={{ marginLeft: debth }}>
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
            title={
              <Fragment>
                <Link
                  as={`/@${this.props.post.author}`}
                  href={`/blog?author=${this.props.post.author}`}
                  passHref
                >
                  <a className="text-dark cpointer">{this.props.post.author}</a>
                </Link>
              </Fragment>
            }
            subheader={created}
          />
          <CardContent>
            <div className="postcontent" dangerouslySetInnerHTML={bodyText} />
          </CardContent>
          <VoteSlider post={this.props.post} tags={[]} mode="comment" />
        </Card>
        {children}
      </Fragment>
    );
  }
}

PostpostItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostpostItem;
