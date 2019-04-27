// Todo: Image upload. https://github.com/cloudinary/cloudinary_tinymce

/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import InputBase from "@material-ui/core/InputBase";
import sanitize from "sanitize-html";
import readingTime from "reading-time";
import TextField from "@material-ui/core/TextField";
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

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: this.props.initialValue,
      tags: ["travelfeed"],
      completed: 0
    };
    this.handleTitleEditorChange = this.handleTitleEditorChange.bind(this);
    this.handleContentEditorChange = this.handleContentEditorChange.bind(this);
    this.handleTagsEditorChange = this.handleTagsEditorChange.bind(this);
  }
  newNotification(notification) {
    if (notification != undefined) {
      let letiant = "success";
      if (notification.success === false) {
        letiant = "error";
      }
      this.props.enqueueSnackbar(notification.message, { letiant });
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
  handleContentEditorChange(content) {
    this.setState({ content });
  }
  handleTagsEditorChange(tags) {
    this.setState({ tags: tags.target.value });
  }
  componentDidMount() {
    if (this.props.mode == "edit") {
      this.setState({
        title: this.props.edit.title,
        tags: this.props.edit.tags
      });
    }
    require("tinymce/tinymce");
    require("tinymce/themes/mobile/theme");
    require("tinymce/themes/inlite/theme");
    require("tinymce/plugins/autolink");
    require("tinymce/plugins/link");
    require("tinymce/plugins/image");
    require("tinymce/plugins/textpattern");
    require("tinymce/plugins/hr");
    require("tinymce/plugins/media");
    require("tinymce/plugins/table");
    require("tinymce/plugins/paste");
    require("tinymce/plugins/code");
    require("tinymce/plugins/autosave");
    this.setState({ mounted: true });
  }
  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };
  async success() {
    const sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
    await sleep(10000);
    clearInterval(this.timer);
    this.setState({ completed: 0 });
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
    if (imageList != null) {
      metadata.image = imageList;
    }
    if (location != "") {
      metadata.coordinates = location;
    }
    // todo: Parse body for images and links and include them in the json_metadata
    let username = getUser();
    if (this.props.type == "comment") {
      let commenttime = getSlug(new Date().toJSON()).replace(/-/g, "");
      permlink = `re-${this.props.edit.parent_permlink}-${commenttime}`;
      parentAuthor = this.props.edit.parent_author;
      parentPermlink = this.props.edit.parent_permlink;
    }
    if (this.props.mode == "edit") {
      permlink = this.props.edit.permlink;
    }
    if (this.props.edit == false) {
      body += `<hr /><center>View this post <a href="https://travelfeed.io/@${username}/${permlink}">on the TravelFeed dApp</a> for the best experience.</center>`;
    }
    this.timer = setInterval(this.progress, 60);
    this.setState({ user: username, permlink: permlink });
    console.log(
      "prauthor" + parentAuthor,
      "prnt" + parentPermlink,
      "perml" + permlink,
      "title" + title,
      "jsonme" + JSON.stringify(metadata),
      "auto" + this.props.type
    );
    comment(
      parentAuthor,
      parentPermlink,
      permlink,
      title,
      body,
      metadata,
      this.props.type
    ).then(result => {
      this.newNotification(result);
    });
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
  render() {
    let submittext = "Publish";
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
          letiant="determinate"
          value={this.state.completed}
          className="p-1"
          size={35}
          thickness={5}
        />
      );
    }
    if (
      (wordCount > 250 && this.state.title != "" && this.state.tags != "") ||
      this.props.type == "comment"
    ) {
      publishBtn = (
        <Fragment>
          {progress}
          <Button
            color="primary"
            letiant="outlined"
            onClick={() => this.publishPost()}
          >
            {submittext}
          </Button>
        </Fragment>
      );
    } else {
      publishBtn = (
        <Tooltip title="You need to write at least 250 words and set a title and at least one tag before you can publish your post">
          <span>
            <Button color="primary" letiant="outlined" disabled>
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
    } else if (this.state.mounted == true) {
      editor = (
        <Editor
          init={{
            branding: false,
            theme: "inlite",
            inline: true,
            external_plugins: {
              map: "/tinymce/plugins/map/plugin.min.js"
            },
            skin_url: "/tinymce/skins/lightgray",
            plugins:
              "autolink link image textpattern hr map media table paste code autosave",
            selection_toolbar:
              "bold italic | alignleft aligncenter | quicklink h2 h3 blockquote",
            insert_toolbar:
              "image media map quicktable hr | code | restoredraft",
            browser_spellcheck: true,
            extended_valid_elements:
              "+iframe[src|width|height|name|align|class]",
            mobile: {
              theme: "mobile",
              plugins:
                "autolink link image textpattern hr map media table paste code autosave",
              inline: false,
              toolbar: [
                "undo",
                "bold",
                "italic",
                "styleselect",
                "h2",
                "quicklink",
                "image"
              ]
            },
            autosave_ask_before_unload: true,
            autosave_interval: "20s",
            autosave_retention: "120m",
            relative_urls: false,
            remove_script_host: false,
            document_base_url: "https://travelfeed.io/"
          }}
          value={this.state.content}
          onEditorChange={this.handleContentEditorChange}
        />
      );
    }
    if (this.props.type == "comment") {
      return (
        <Fragment>
          <div className="w-100">
            <div className="postcontent border p-3">{editor}</div>
          </div>
          <div className="text-right pt-1">{publishBtn}</div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <InputBase
          autoFocus={true}
          inputProps={{
            maxLength: 100
          }}
          multiline={true}
          className="font-weight-bold inputtitle"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleTitleEditorChange}
          fullWidth
        />
        <div className="postcontent posteditor">{editor}</div>
        <div />
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <TagPicker
                initialValue={this.props.edit.tags}
                onChange={this.handleTagClick.bind(this)}
              />
            </div>
            <div className="col-md-12 pt-2">
              <p>Location</p>
              {locationfield}
            </div>
            <div className="col-6 p-0 pt-2">
              <span className="badge badge-secondary m-1 p-1 pl-2 pr-2 rounded">
                {wordCount + " words"}
              </span>
              <span className="badge badge-secondary m-1 p-1 pl-2 pr-2 rounded">
                {readTime}
              </span>
            </div>
            <div className="col-6 text-right p-0">{publishBtn}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

PostEditor.defaultProps = {
  initialValue: "",
  edit: false
};

PostEditor.propTypes = {
  comment: PropTypes.object,
  initialValue: PropTypes.string,
  edit: PropTypes.object,
  mode: PropTypes.string,
  type: PropTypes.string,
  enqueueSnackbar: PropTypes.function
};

export default withSnackbar(PostEditor);
