/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import { Editor } from "@tinymce/tinymce-react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import InputBase from "@material-ui/core/InputBase";
import sanitize from "sanitize-html";
import readingTime from "reading-time";
import TextField from "@material-ui/core/TextField";
import { comment } from "../utils/actions";
import { APP_VERSION, ROOTURL } from "../config";
import { extractSWM, permlinkFromTitle } from "../utils/regex";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { getUser } from "../utils/token";
import { getImageList } from "../helpers/getImage";
import Router from "next/router";

class PostEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: this.props.initialValue,
      tags: "",
      completed: 0
    };
    this.handleTitleEditorChange = this.handleTitleEditorChange.bind(this);
    this.handleContentEditorChange = this.handleContentEditorChange.bind(this);
    this.handleTagsEditorChange = this.handleTagsEditorChange.bind(this);
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
    if (this.props.edit != false) {
      const json = JSON.parse(this.props.edit.json_metadata);
      var tags = json.tags != "undefined" ? json.tags : [""];
      tags = String(tags).replace(/,/g, " ");
      this.setState({
        title: this.props.edit.title,
        tags: tags
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
    this.setState({ mounted: true });
  }
  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };
  success() {
    clearInterval(this.timer);
    this.setState({ completed: 0 });
  }
  publishPost() {
    var parentAuthor = "";
    var parentPermlink = "travelfeed";
    var title = this.state.title;
    var permlink = permlinkFromTitle(title);
    var body = this.state.content;
    var location = this.getLocation(body);
    var allTags = this.state.tags.split(" ");
    var imageList = getImageList(body);
    imageList = JSON.stringify(imageList);
    var metadata = '{"tags":["travelfeed",';
    for (var i = 0; i < allTags.length; i++) {
      metadata += '"' + allTags[i] + '"';
      if (i + 1 < allTags.length) {
        metadata += ",";
      }
    }
    metadata +=
      '],"app":"' +
      APP_VERSION +
      '","image":' +
      imageList +
      ',"coordinates":"' +
      location +
      '"}';
    // todo: Parse body for images and links and include them in the json_metadata
    var jsonMetadata = JSON.parse(metadata);
    var username = getUser();
    if (this.props.edit != false) {
      const json = JSON.parse(this.props.edit.json_metadata);
      parentPermlink = json.tags != "undefined" ? json.tags[0] : "travelfeed";
      permlink = this.props.edit.permlink;
    }
    if (this.props.edit == false) {
      body += `<hr /><center>View this post <a href="https://travelfeed.io/@${username}/${permlink}">on the TravelFeed dApp</a> for the best experience.</center>`;
    }
    this.setState({ user: username, permlink: permlink });
    this.timer = setInterval(this.progress, 20);
    comment(parentAuthor, parentPermlink, permlink, title, body, jsonMetadata);
  }
  getLocation(bodyText) {
    var coordinates = extractSWM(bodyText);
    if (coordinates != null && coordinates.length > 2) {
      const lat = coordinates[1];
      const long = coordinates[2];
      return [lat, long];
    } else {
      return "";
    }
  }
  render() {
    var submittext = "Publish";
    if (this.props.edit != false) {
      submittext = "Edit";
    }
    const bodyText = this.state.content;
    let sanitized = sanitize(bodyText, { allowedTags: [] });
    const readingtime = readingTime(sanitized);
    const wordCount = readingtime.words;
    const readTime = readingtime.text;
    var location = this.getLocation(bodyText);
    var publishBtn = "";
    var progress = <Fragment />;
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
    if (wordCount > 250 && this.state.title != "" && this.state.tags != "") {
      publishBtn = (
        <Fragment>
          {progress}
          <Button
            color="primary"
            variant="outlined"
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
            <Button color="primary" variant="outlined" disabled>
              {submittext}
            </Button>
          </span>
        </Tooltip>
      );
    }
    var editor = <Fragment />;
    if (this.state.completed == 100) {
      this.success();
      const url = `${ROOTURL}/@${this.state.user}/${this.state.permlink}`;
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
              "autolink link image textpattern hr map media table paste code",
            selection_toolbar:
              "bold italic | alignleft aligncenter | quicklink h2 h3 blockquote",
            insert_toolbar: "image media map quicktable hr | code",
            browser_spellcheck: true,
            extended_valid_elements:
              "+iframe[src|width|height|name|align|class]",
            mobile: { theme: "mobile" }
          }}
          value={this.state.content}
          onEditorChange={this.handleContentEditorChange}
        />
      );
    }
    return (
      <Fragment>
        <InputBase
          autoFocus={true}
          className="font-weight-bold inputtitle"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleTitleEditorChange}
          fullWidth
        />
        <div className="postcontent">{editor}</div>
        <div />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <TextField
                label="Tags"
                placeholder="Tags separated by spaces"
                margin="normal"
                value={this.state.tags}
                onChange={this.handleTagsEditorChange}
                fullWidth
              />
            </div>
            <div className="col-md-6 text-right">
              <TextField
                label="Location"
                placeholder="Add a map to the post to add a location"
                value={location}
                margin="normal"
                fullWidth
              />
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
  parentAuthor: PropTypes.string,
  parentPermlink: PropTypes.string,
  edit: PropTypes.object
};

export default PostEditor;
