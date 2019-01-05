import React, { Component, Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import getImage from "../helpers/getImage";
import dateFromJsonString from "../helpers/dateFromJsonString";
import CardActions from "@material-ui/core/CardActions";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { regExcerpt, regTitle, extractSWM } from "../utils/regex";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Create";
import ViewIcon from "@material-ui/icons/OpenInBrowser";
import PostEditor from "./PostEditor";
import parseBody from "../helpers/parseBody";

class PostCard extends Component {
  state = { editor: false };
  openEditor() {
    this.setState({ editor: true });
  }
  render() {
    const post = this.props.post;
    let sanitized = this.props.sanitized;
    let title = regTitle(post.title);
    title = title.length > 85 ? title.substring(0, 81) + "[...]" : title;
    const json_date = '{ "date": "' + post.created + 'Z" }';
    const date_object = new Date(
      JSON.parse(json_date, dateFromJsonString).date
    );
    let excerpt = regExcerpt(sanitized);
    const created = date_object.toDateString();
    const image = getImage(post.json_metadata, post.body, "400x0");
    var content = (
      <div className="row">
        <div className="col-sm-4 p-0">
          <CardMedia
            className="h-100"
            style={{ minHeight: "150px" }}
            image={image}
          />
        </div>
        <div className="col-sm-8 pl-0">
          <CardContent>
            <div className="p-2">
              <p>{created}</p>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography component="p">{excerpt} [...]</Typography>
            </div>
          </CardContent>
          <CardActions className="bg-dark">
            <span className="text-light pl-2">
              <Button
                color="inherit"
                className="p-0 pl-2 pr-2"
                onClick={() => this.openEditor()}
              >
                <span className="pr-1">Edit</span> <EditIcon />
              </Button>
            </span>
            <Link
              as={`/@${post.author}/${post.permlink}`}
              href={`/post?author=${post.author}&permlink=${post.permlink}`}
              passHref
            >
              <a className="text-light">
                <Button color="inherit" className="p-0 pr-2 pl-2">
                  <span className="pr-1">View</span> <ViewIcon />
                </Button>
              </a>
            </Link>
          </CardActions>
        </div>
      </div>
    );
    if (this.state.editor == true) {
      const extractswm = extractSWM(post.body);
      var swmextract = "";
      if (extractswm != null) {
        swmextract = " \n [//]:# (" + extractswm[0] + " d3scr)";
      }
      content = (
        <CardContent>
          <PostEditor
            initialValue={parseBody(post.body, { editor: true }) + swmextract}
            edit={post}
            mode="edit"
          />
        </CardContent>
      );
    }
    return (
      <Fragment>
        <Grid item lg={8} md={10} sm={11} xs={12}>
          <Card key={post.permlink} className="m-2">
            {content}
          </Card>
        </Grid>
      </Fragment>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  sanitized: PropTypes.string
};

export default PostCard;
