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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";

class PostpostItem extends Component {
  render() {
    let htmlBody = parseBody(this.props.post.body, {});
    const bodyText = { __html: htmlBody };
    const json_date = '{ "date": "' + this.props.post.created + 'Z" }';
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
              <IconButton>
                <MoreVertIcon />
              </IconButton>
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
        </Card>
      </Fragment>
    );
  }
}

PostpostItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostpostItem;
