// Todo: Image upload.
import React, { Fragment, Component } from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import InputBase from "@material-ui/core/InputBase";
import sanitize from "sanitize-html";
import readingTime from "reading-time";
import { comment } from "../utils/actions";
import { APP_VERSION, ROOTURL } from "../config";
import { extractSWM } from "../utils/regex";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { getUser } from "../utils/token";
import { getImageList } from "../helpers/getImage";
import Router from "next/router";
import { withSnackbar } from "notistack";
import getSlug from "speakingurl";
import TagPicker from "./Editor/TagPicker";
import { Mutation } from "react-apollo";
import { SAVE_DRAFT } from "../helpers/graphql/drafts";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Editor from "rich-markdown-editor";
import { debounce } from "lodash";

class PostEditor extends Component {
  state = {
    title: "",
    content: "",
    tags: ["travelfeed"],
    completed: 0
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
    console.log(value())
    this.setState({ content: value() });
  }, 250);

  handleTagsEditorChange(tags) {
    this.setState({ tags: tags.target.value });
  }
  componentWillUnmount() {
    // Stop saving drafts
    clearInterval(this.interval);
  }
  componentDidMount() {
    if (this.props.mode == "edit") {
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
    let location = this.getLocation(body);
    let imageList = getImageList(body);
    let metadata = {};
    metadata.tags = this.state.tags;
    metadata.app = APP_VERSION;
    metadata.community = "travelfeed";
    if (imageList !== null) {
      metadata.image = imageList;
    }
    if (location !== "") {
      metadata.coordinates = location;
    }
    // todo: Parse body for images and links and include them in the json_metadata
    let username = getUser();
    if (this.props.type == "comment") {
      let commenttime = getSlug(new Date().toJSON()).replace(/-/g, "");
      permlink = `re-${this.props.parent_permlink}-${commenttime}`;
      parentAuthor = this.props.parent_author;
      parentPermlink = this.props.parent_permlink;
    }
    if (this.props.mode == "edit") {
      permlink = this.props.edit.permlink;
    }
    if (this.props.mode !== "edit" && this.props.type !== "comment") {
      body += `<hr /><center>View this post <a href="https://travelfeed.io/@${username}/${permlink}">on the TravelFeed dApp</a> for the best experience.</center>`;
    }
    this.timer = setInterval(this.progress, 60);
    this.setState({ user: username, permlink: permlink });
    console.log(
      parentAuthor,
      parentPermlink,
      permlink,
      title,
      body,
      metadata,
      this.props.type
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
    let submittext = "Publish";
    if (this.props.type == "comment") {
      submittext = "Reply";
    }
    if (this.props.mode == "edit") {
      submittext = "Edit";
    }
    const bodyText = this.state.content;
    let sanitized = sanitize(bodyText, { allowedTags: [] });
    const readingtime = readingTime(sanitized);
    const wordCount = readingtime.words;
    const readTime = readingtime.text;
    let location = this.getLocation(bodyText);
    let locationfield = location;
    if (location === "") {
      locationfield = "Add a map to the post to add a location!";
    }
    let publishBtn = "";
    let progress = <Fragment />;
    if (this.state.completed != 0) {
      progress = (
        <CircularProgress
          variant="determinate"
          value={this.state.completed}
          className="p-1"
          size={35}
          thickness={5}
        />
      );
    }
    if (
      (wordCount > 250 && this.state.title != "" && this.state.tags != "") ||
      (this.props.type == "comment" && wordCount > 0)
    ) {
      publishBtn = (
        <Fragment>
          {progress}
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.publishPost()}
            // Todo: Call autosave every 20 seconds
          >
            {submittext}
          </Button>
        </Fragment>
      );
    } else {
      publishBtn = (
        <Tooltip title="You need to write at least 250 words and set a title before you can publish your post">
          <span>
            <Button variant="contained" color="primary" disabled>
              {submittext}
            </Button>
          </span>
        </Tooltip>
      );
    }
    let editor = <Fragment />;
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
    if (this.props.type == "comment") {
      return (
        <Fragment>
          <div className="w-100">
            <div className="postcontent border p-3" />
          </div>
          <div className="text-right pt-1">{publishBtn}</div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className="row p-3">
          <div className="col-12 p-1">
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
            <div className="col-xl-9 col-md-12 p-1">
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
                        placeholder="Write something epic!"
                        toc={true}
                          // defaultValue={this.state.content}
                          // onChange={this.onEditorChange.bind(this)}
                          onSave={saveDraft}
                          onChange={this.handleEditorChange}                         
                          uploadImage={async file => {
                            // const result = await s3.upload(file);
                            // return result.url;
                            console.log(file)
                            return;
                          }}
                        />
                    );
                  }}
                </Mutation>
              </CardContent>
            </Card>
          </div>
          <div className="col-xl-3 col-md-12">
          <div className="row">
          <div className="col-xl-12 col-md-6 col-sm-12 p-1">
              <Card>
                <CardContent>
                  <TagPicker
                    initialValue={this.props.edit.tags}
                    onChange={this.handleTagClick.bind(this)}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="col-xl-12 col-md-6 col-sm-12 p-1">
              <Card>
                <CardContent>
                  <TextField label="Featured image" margin="normal">
                    ))}
                  </TextField>
                </CardContent>
              </Card>
            </div>
            <div className="col-xl-12 col-md-6 col-sm-12 p-1">
              <Card>
                <CardContent>
                  <p>Location</p>
                  {locationfield}
                </CardContent>
              </Card>
            </div>
            <div className="col-xl-12 col-md-6 col-sm-12 p-1">
              <Card>
                <CardContent>{publishBtn}</CardContent>
              </Card>
            </div>
          </div>
        </div></div>
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
  comment: PropTypes.object,
  initialValue: PropTypes.string,
  edit: PropTypes.object,
  mode: PropTypes.string,
  type: PropTypes.string,
  enqueueSnackbar: PropTypes.func
};

export default withSnackbar(PostEditor);
