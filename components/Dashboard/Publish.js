// Todo: Image upload.
import React, { Fragment, Component } from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import InputBase from "@material-ui/core/InputBase";
import sanitize from "sanitize-html";
import readingTime from "reading-time";
import { comment } from "../../utils/actions";
import { APP_VERSION, ROOTURL } from "../../config";
import { extractSWM } from "../../utils/regex";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { getUser } from "../../utils/token";
import { getImageList } from "../../helpers/getImage";
import Router from "next/router";
import { withSnackbar } from "notistack";
import getSlug from "speakingurl";
import TagPicker from "../Editor/TagPicker";
import LocationPicker from "../Editor/LocationPicker";
import PostPreview from "../Editor/PostPreview";
import { Mutation } from "react-apollo";
import { SAVE_DRAFT } from "../../helpers/graphql/drafts";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Editor from "rich-markdown-editor";
import { debounce } from "lodash";
import PostMap from "../PostMap";

class PostEditor extends Component {
  state = {
    title: "",
    content: "",
    tags: ["travelfeed"],
    completed: 0,
    location: undefined
  };
  newNotification(notification) {
    if (notification != undefined) {
      let variant = "success";
      if (notification.success === false) {
        variant = "error";
      }
      this.props.enqueueSnackbar(notification.message, { variant });
      if (notification.success === true) {
        this.setState({ success: true });
      }
    }
  }
  handleTagClick(op) {
    this.setState(op);
  }
  handleTitleEditorChange(title) {
    this.setState({ title: title.target.value });
  }
  // onEditorChange = content => {
  //   this.setState({ content });
  //   console.log(content)
  // };
  handleEditorChange = debounce(value => {
    this.setState({ content: value() });
  }, 250);
  handleTagsEditorChange(tags) {
    this.setState({ tags: tags.target.value });
  }
  onLocationPick = ({ latitude, longitude }) => {
    console.log({ latitude, longitude });
    this.setState({ location: { latitude, longitude } });
  };
  componentWillUnmount() {
    // Stop saving drafts
    clearInterval(this.interval);
  }
  componentDidMount() {
    if (this.props.editMode) {
      this.setState({
        title: this.props.edit.title,
        content: this.props.edit.content,
        tags: this.props.edit.tags
      });
    }
    let id = this.props.id;
    if (this.props.id === undefined) {
      id = getUser() + "-" + getSlug(new Date().toJSON()).replace(/-/g, "");
    }
    this.setState({
      id: id,
      mounted: true
    });
    // Save draft every 20 seconds
    this.interval = setInterval(() => this.saveDraft(), 20000);
  }
  progress = () => {
    // Publish animation
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };
  async success() {
    const sleep = milliseconds => {
      // eslint-disable-next-line no-undef
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
    await sleep(10000);
    clearInterval(this.timer);
    this.setState({ completed: 0 });
  }
  getLocation(bodyText) {
    let coordinates = extractSWM(bodyText);
    if (coordinates != null && coordinates.length > 2) {
      const lat = coordinates[1];
      const long = coordinates[2];
      return [lat, long];
    } else {
      return "";
    }
  }
  publishPost() {
    let parentAuthor = "";
    let parentPermlink = "travelfeed";
    let title = this.state.title;
    let permlink = getSlug(title);
    let body = this.state.content;
    let location = this.state.location;
    let imageList = getImageList(body);
    let metadata = {};
    metadata.tags = this.state.tags;
    metadata.app = APP_VERSION;
    metadata.community = "travelfeed";
    if (imageList !== null) {
      metadata.image = imageList;
    }
    if (!this.props.editMode) {
      body += `<hr /><center>View this post <a href="https://travelfeed.io/@${username}/${permlink}">on the TravelFeed dApp</a> for the best experience.</center>`;
    }
    if (location !== undefined) {
      metadata.coordinates = [location.latitude, location.longitude];
      if (!this.props.editMode || location !== this.props.edit.location) {
        body += `\n\n[//]:# (!steemitworldmap ${location.latitude} lat ${
          location.longitude
        } long  d3scr)`;
      }
    }
    // todo: Parse body for images and links and include them in the json_metadata
    let username = getUser();
    if (this.props.type == "comment") {
      let commenttime = getSlug(new Date().toJSON()).replace(/-/g, "");
      permlink = `re-${this.props.parent_permlink}-${commenttime}`;
      parentAuthor = this.props.parent_author;
      parentPermlink = this.props.parent_permlink;
    }
    if (this.props.editMode) {
      permlink = this.props.edit.permlink;
    }
    this.timer = setInterval(this.progress, 60);
    this.setState({ user: username, permlink: permlink });
    console.log(
      parentAuthor,
      parentPermlink,
      permlink,
      title,
      body,
      JSON.stringify(metadata),
      "post"
    );
    // comment(
    // parentAuthor,
    // parentPermlink,
    // permlink,
    // title,
    // body,
    // metadata,
    // this.props.type
    // ).then(result => {
    //   this.newNotification(result);
    // });
  }
  render() {
    const bodyText = this.state.content;
    let sanitized = sanitize(bodyText, { allowedTags: [] });
    const readingtime = readingTime(sanitized);
    const wordCount = readingtime.words;
    const readTime = readingtime.text;
    let location = this.state.location;
    if (this.state.completed == 100 && this.state.success == true) {
      this.success();
      let url = `${ROOTURL}/@${this.state.user}/${this.state.permlink}`;
      Router.push(url);
    }

    // else if (this.state.mounted == true) {
    //   // Todo: If no id  is provided, make fresh id (constant!). Or work with own ID format (author-jsonstring) instead of mongo IDs?
    //   editor = (
    //   );
    // }
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 pt-3">
              <Card>
                <CardContent>
                  <InputBase
                    autoFocus={true}
                    inputProps={{
                      maxLength: 100
                    }}
                    multiline={true}
                    className="font-weight-bold inputtitle"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.handleTitleEditorChange.bind(this)}
                    fullWidth
                  />
                </CardContent>
              </Card>
            </div>
            <div className="col-xl-9 col-md-12 pt-2 pr-0">
              <Card>
                <CardContent>
                  <CardHeader
                    action={
                      <Fragment>
                        <span className="badge badge-secondary m-1 p-1 pl-2 pr-2 rounded">
                          {wordCount + " words"}
                        </span>
                        <span className="badge badge-secondary m-1 p-1 pl-2 pr-2 rounded">
                          {readTime}
                        </span>
                      </Fragment>
                    }
                  />
                  <Mutation
                    mutation={SAVE_DRAFT}
                    variables={{
                      id: this.state.id,
                      title: this.state.title,
                      body: JSON.stringify(this.state.content),
                      json: JSON.stringify({ tags: this.state.tags })
                    }}
                  >
                    {saveDraft => {
                      this.saveDraft = saveDraft;
                      return (
                        <Editor
                          className="border postcontent pl-2 pr-2 m-1"
                          style={{ minHeight: "370px" }}
                          placeholder="Write something epic!"
                          toc={true}
                          // defaultValue={this.state.content}
                          // onChange={this.onEditorChange.bind(this)}
                          onSave={saveDraft}
                          onChange={this.handleEditorChange}
                          uploadImage={async file => {
                            // const result = await s3.upload(file);
                            // return result.url;
                            console.log(file);
                            return;
                          }}
                        />
                      );
                    }}
                  </Mutation>
                </CardContent>
              </Card>
            </div>
            <div className="col-xl-3 col-md-12 pl-2 pb-2">
              <div className="row">
                <div className="col-xl-12 col-md-6 col-sm-12 pt-2">
                  <Card>
                    <CardContent>
                      <TagPicker
                        initialValue={this.props.edit.tags}
                        onChange={this.handleTagClick.bind(this)}
                      />
                    </CardContent>
                  </Card>
                </div>
                <div className="col-xl-12 col-md-6 col-sm-12 pt-2">
                  <Card>
                    <CardContent>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="raised-button-file"
                        multiple
                        type="file"
                      />
                      <label htmlFor="raised-button-file">
                        <Button
                          variant="contained"
                          color="secondary"
                          component="span"
                        >
                          Upload
                        </Button>
                      </label>
                      <TextField label="Featured image" margin="normal" />
                    </CardContent>
                  </Card>
                </div>
                <div className="col-xl-12 col-md-6 col-sm-12 pt-2">
                  <Card>
                    <CardContent>
                      <h5 className="text-center">
                        Location
                        {this.state.location &&
                          `: ${this.state.location.latitude}, ${
                            this.state.location.longitude
                          }`}
                      </h5>
                      {location && (
                        <PostMap
                          location={{
                            coordinates: {
                              lat: this.state.location.latitude,
                              lng: this.state.location.longitude
                            }
                          }}
                        />
                      )}
                      <div className="text-center pt-2">
                        <LocationPicker
                          onPick={this.onLocationPick.bind(this)}
                          isChange={this.state.location}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="col-xl-12 col-md-6 col-sm-12 text-center pt-2">
                  <Card>
                    <CardContent>
                      <PostPreview />
                      <Tooltip
                        title={
                          wordCount < 250 ||
                          (this.state.title === "" &&
                            "You need to write at least 250 words and set a title before you can publish your post") ||
                          "Once published, your post cannot be deleted"
                        }
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => this.publishPost()}
                          disabled={wordCount < 250 || this.state.title === ""}
                        >
                          {(this.props.editMode && "Edit") || "Publish"}
                        </Button>
                      </Tooltip>
                      {this.state.completed !== 0 && (
                        <CircularProgress
                          variant="determinate"
                          value={this.state.completed}
                          className="p-1"
                          size={35}
                          thickness={5}
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

PostEditor.defaultProps = {
  initialValue: "",
  edit: {}
};

PostEditor.propTypes = {
  id: PropTypes.string,
  editMode: PropTypes.bool,
  comment: PropTypes.object,
  initialValue: PropTypes.string,
  edit: PropTypes.object,
  mode: PropTypes.string,
  type: PropTypes.string,
  enqueueSnackbar: PropTypes.func
};

export default withSnackbar(PostEditor);
