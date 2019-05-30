import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Create";
import LocationIcon from "@material-ui/icons/LocationOn";
import ViewIcon from "@material-ui/icons/OpenInBrowser";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { nameFromCC } from "../../helpers/countryCodes";
import { imageProxy } from "../../helpers/getImage";
import DeleteDraftButton from "../Dashboard/Drafts/DeleteDraftButton";

class PostCard extends Component {
  state = { show: true };
  hide() {
    this.setState({ show: false });
  }
  render() {
    // Hide if deleted (for drafts)
    if (!this.state.show) {
      return <Fragment />;
    }
    let appIcon = <Fragment />;
    if (
      this.props.post.app &&
      this.props.post.app.split("/")[0] === "travelfeed"
    ) {
      appIcon = (
        <Tooltip title="Published with TravelFeed" placement="bottom">
          <img
            width="25"
            className="mr-1"
            src="https://travelfeed.io/favicon.ico"
          />
        </Tooltip>
      );
    }
    let button2 = (
      <Link
        as={`/@${this.props.post.author}/${this.props.post.permlink}`}
        href={`/post?author=${this.props.post.author}&permlink=${
          this.props.post.permlink
        }`}
        passHref
      >
        <a className="text-light">
          <Button color="inherit" className="p-0 pr-2 pl-2">
            <span className="pr-1">View</span> <ViewIcon />
          </Button>
        </a>
      </Link>
    );
    if (this.props.isDraftMode) {
      button2 = (
        <DeleteDraftButton id={this.props.id} onDelete={this.hide.bind(this)} />
      );
    }
    let colsize = "col-12";
    if (this.props.post.img_url !== undefined) {
      colsize = "col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 pl-0";
    }
    const country =
      this.props.post.country_code !== null
        ? nameFromCC(this.props.post.country_code)
        : undefined;
    var content = (
      <div className="row">
        {this.props.post.img_url !== undefined && (
          <div className="col-md-4 p-0">
            <CardMedia
              className="h-100"
              style={{ minHeight: "150px" }}
              image={imageProxy(this.props.post.img_url, undefined, 300)}
            />
          </div>
        )}
        <div className={colsize}>
          <CardContent>
            <div className="pr-2 pl-2 pb-2">
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.post.title || "Untitled"}
              </Typography>
              <Typography component="p">
                {this.props.post.excerpt} [...]
              </Typography>
            </div>
          </CardContent>
          <CardActions className="bg-dark">
            <div className="container-fluid">
              <div className="row w-100">
                <div className="col-7">
                  <span className="text-light pl-2">
                    <Link
                      href={`/dashboard/publish?id=${
                        this.props.post.id
                      }&title=${this.props.post.title}&body=${
                        this.props.post.body
                      }&json=${this.props.post.json}&isCodeEditor=${
                        this.props.post.isCodeEditor
                      }`}
                      as={`/dashboard/publish`}
                      passHref
                    >
                      <Button color="inherit" className="p-0 pl-2 pr-2">
                        <span className="pr-1">Edit</span> <EditIcon />
                      </Button>
                    </Link>
                  </span>
                  {button2}
                </div>
                <div className="col-5 text-right pt-1">
                  {country && (
                    <Tooltip
                      title={`${
                        this.props.post.subdivision !== null
                          ? this.props.post.subdivision + ", "
                          : ""
                      } ${country}`}
                      placement="bottom"
                    >
                      <span className="text-light">
                        <LocationIcon />
                      </span>
                    </Tooltip>
                  )}
                  {appIcon}
                  {// if post is paid out (= older than 7 days), display payout, otherwise display time until payour
                  !this.props.isDraftMode &&
                    ((new Date(this.props.post.created_at) <
                      new Date(
                        new Date().setDate(new Date().getDate() - 7)
                      ) && (
                      <span className="text-light pl-2 font-weight-bold">
                        ${(this.props.post.payout * 0.75).toFixed(2)}
                      </span>
                    )) || (
                      <span className="text-light pl-2 font-weight-bold">
                        Payout in{" "}
                        {Math.ceil(
                          Math.abs(
                            new Date().getTime() -
                              new Date(this.props.post.created_at).getTime()
                          ) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </CardActions>
        </div>
      </div>
    );
    return (
      <Fragment>
        <Card key={this.props.post.permlink} className="m-2">
          {content}
        </Card>
      </Fragment>
    );
  }
}

PostCard.propTypes = {
  onEditorOpen: PropTypes.func,
  post: PropTypes.object.isRequired,
  sanitized: PropTypes.string,
  isDraftMode: PropTypes.bool,
  id: PropTypes.string
};

export default PostCard;
