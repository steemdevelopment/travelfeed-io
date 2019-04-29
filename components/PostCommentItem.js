import React, { Fragment, Component } from "react";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import parseBody from "../helpers/parseBody";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import PropTypes from "prop-types";
import VoteSlider from "./VoteSlider";
import PostComments from "./PostComments";
import SubHeader from "./Post/SubHeader";
import { getUser } from "../utils/token";
import PostEditor from "./PostEditor";
import BookmarkIcon from "./Post/BookmarkIcon";
import CuratorMenu from "./CuratorMenu/CommentMenu";

class PostpostItem extends Component {
  state = {
    isEdit: false,
    showEditor: false
  };
  handleClick() {
    this.setState({
      showEditor: true
    });
  }
  componentDidMount() {
    const user = getUser();
    if (user === this.props.post.author) {
      this.setState({ isEdit: true });
    }
  }
  render() {
    let htmlBody = parseBody(this.props.post.body, {});
    const bodyText = { __html: htmlBody };
    let children = <Fragment />;
    if (this.props.post.children !== 0 && this.props.loadreplies == true) {
      children = (
        <PostComments
          post_id={this.props.post.post_id}
          orderby={this.props.orderby}
          orderdir={this.props.orderdir}
        />
      );
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
    let parent = <Fragment />;
    if (this.props.post.depth > 1) {
      parent = (
        <div>
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
              <strong>Go to parent comment</strong>
            </a>
          </Link>
        </div>
      );
    }
    if (this.props.title == true) {
      title = (
        <div className="bg-light border p-3 mb-2">
          <h4>{`Re: ${this.props.post.root_title}`}</h4>
          <div>
            <Link
              as={`/@${this.props.post.root_author}/${
                this.props.post.root_permlink
              }`}
              href={`/post?author=${this.props.post.root_author}&permlink=${
                this.props.post.root_permlink
              }`}
              passHref
            >
              <a>
                <strong>Go to original post</strong>
              </a>
            </Link>
          </div>
          {parent}
        </div>
      );
    }
    let cardcontent = (
      <div className="postcontent" dangerouslySetInnerHTML={bodyText} />
    );
    if (this.state.showEditor) {
      cardcontent = (
        <PostEditor
          initialValue={htmlBody}
          edit={{
            parent_author: this.props.post.parent_author,
            parent_permlink: this.props.post.parent_permlink,
            author: this.props.post.author,
            permlink: this.props.post.permlink,
            title: "",
            tags: ["travelfeed"]
          }}
          mode="edit"
          type="comment"
        />
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
            action={
              <Fragment>
                {appIcon}
                <BookmarkIcon
                  author={this.props.post.author}
                  permlink={this.props.post.permlink}
                />
                <CuratorMenu
                  author={this.props.post.author}
                  permlink={this.props.post.permlink}
                />
              </Fragment>
            }
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
            {cardcontent}
          </CardContent>
          <VoteSlider
            author={this.props.post.author}
            permlink={this.props.post.permlink}
            votes={this.props.post.votes}
            total_votes={this.props.post.total_votes}
            tags={[]}
            mode="comment"
            handleClick={this.handleClick.bind(this)}
            isEdit={this.state.isEdit}
            depth={this.props.post.depth}
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
  title: PropTypes.bool,
  orderby: PropTypes.string,
  orderdir: PropTypes.string
};

export default PostpostItem;
