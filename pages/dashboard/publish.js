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
import Header from "../../components/Header";

class Publish extends Component {
  state = {
    readtime: { words: 0, text: "0 min read" },
    location: ""
  };
  handleEditorChange = e => {
    const bodyText = e.target.getContent();
    console.log("Content was updated:", bodyText);
    let sanitized = sanitize(bodyText, { allowedTags: [] });
    const readtime = readingTime(sanitized);
    var swmregex = /!\bsteemitworldmap\b\s((?:[-+]?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?)))\s\blat\b\s((?:[-+]?(?:180(?:\.0+)?|(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d+)?)))\s\blong\b/i;
    const location = swmregex.exec(bodyText);
    var lat = 0.0;
    var long = 0.0;
    if (location != null && location.length > 2) {
      lat = location[1];
      long = location[2];
      this.setState({
        readtime: readtime,
        location: [lat, long]
      });
    } else {
      this.setState({
        readtime: readtime,
        location: ""
      });
    }
  };
  render() {
    const wordCount = this.state.readtime.words;
    const readTime = this.state.readtime.text;
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
    return (
      <Fragment>
        <Helmet>
          <title>{"Publish | TravelFeed: The Travel Community"}</title>
          <script src="/js/tinymce/tinymce.min.js" />
          {/* <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCcSWDf27U1epBvPVgSzLYqw0Z5FzNoOI4&libraries=places&callback=initAutocomplete"
            async
            defer
          />
          <script src="/js/places-autocomplete.js" /> */}
        </Helmet>
        <Header drawer={true} />
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
          style={{ paddingLeft: "75px" }}
        >
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <Card>
              <CardContent>
                <InputBase
                  autoFocus={true}
                  className="font-weight-bold"
                  placeholder="Title"
                  style={{ fontSize: "40px !important" }}
                />
                <div className="postcontent">
                  <Editor
                    initialValue="<p>You can select text to format it. Add a new paragraph to add images, media, maps, tables or dividers. Happy blogging, we can't wait to hear your travel story!</p>"
                    init={{
                      branding: false,
                      theme: "inlite",
                      inline: true,
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
                    onChange={this.handleEditorChange}
                  />
                </div>
                <div />
                <div>
                  {/* <input
                    id="pac-input"
                    className="controls"
                    type="text"
                    placeholder="Search Box"
                  />
                  <div id="map" /> */}
                </div>
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
                        value={this.state.location}
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Publish.propTypes = {
  stream: PropTypes.array
};

export default Publish;
