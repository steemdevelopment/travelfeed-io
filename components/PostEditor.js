/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import InputBase from "@material-ui/core/InputBase";
import sanitize from "sanitize-html";
import readingTime from "reading-time";
import TextField from "@material-ui/core/TextField";

class Publish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.initialValue
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleEditorChange(content) {
    this.setState({ content });
  }
  componentDidMount() {
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
  render() {
    const bodyText = this.state.content;
    let sanitized = sanitize(bodyText, { allowedTags: [] });
    const readingtime = readingTime(sanitized);
    const wordCount = readingtime.words;
    const readTime = readingtime.text;
    var swmregex = /!\bsteemitworldmap\b\s((?:[-+]?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?)))\s\blat\b\s((?:[-+]?(?:180(?:\.0+)?|(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d+)?)))\s\blong\b/i;
    const coordinates = swmregex.exec(bodyText);
    var lat = 0.0;
    var long = 0.0;
    var location = "";
    if (coordinates != null && coordinates.length > 2) {
      lat = coordinates[1];
      long = coordinates[2];
      location = [lat, long];
    } else {
      location = "";
    }
    var publishBtn = "";
    if (wordCount > 250) {
      publishBtn = (
        <Button color="primary" variant="outlined">
          Publish Now
        </Button>
      );
    } else {
      publishBtn = (
        <Tooltip title="You need to write at least 250 words before you can publish your post">
          <span>
            <Button color="primary" variant="outlined" disabled>
              Publish Now
            </Button>
          </span>
        </Tooltip>
      );
    }
    var editor = <Fragment />;
    if (this.state.mounted == true) {
      editor = (
        <Editor
          init={{
            branding: false,
            theme: "inlite",
            inline: true,
            external_plugins: {
              map: "/tinymce/plugins/map/plugin.js"
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
          onEditorChange={this.handleEditorChange}
        />
      );
    }
    return (
      <Fragment>
        <InputBase
          autoFocus={true}
          className="font-weight-bold inputtitle"
          placeholder="Title"
        />
        <div className="postcontent">{editor}</div>
        <div />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <TextField
                id="standard-with-placeholder"
                label="Tags"
                placeholder="Tags separated by spaces"
                margin="normal"
                fullWidth
              />
            </div>
            <div className="col-md-6 text-right">
              <TextField
                id="standard-with-placeholder"
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

export default Publish;
