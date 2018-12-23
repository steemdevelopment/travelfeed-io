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

class Index extends Component {
  state = {
    readtime: { words: 0, text: "0 min read" }
  };
  handleEditorChange = e => {
    // console.log("Content was updated:", e.target.getContent());
    let sanitized = sanitize(e.target.getContent(), { allowedTags: [] });
    const readtime = readingTime(sanitized);
    this.setState({
      readtime: readtime
    });
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
        </Helmet>
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <Card className="mb-5">
              <CardContent>
                <InputBase
                  autoFocus={true}
                  className="font-weight-bold"
                  placeholder="Title"
                  style={{ fontSize: "40px !important" }}
                  multiline
                />
                <div className="postcontent">
                  Preview | HTML
                  <Editor
                    initialValue="<p>We can't wait to hear your travel story...</p>"
                    init={{
                      branding: false,
                      theme: "inlite",
                      inline: true,
                      plugins:
                        "autolink link image textpattern hr map media table paste code",
                      selection_toolbar:
                        "bold italic | alignleft aligncenter | quicklink h2 h3 blockquote | code",
                      insert_toolbar: "quickimage media map quicktable hr",
                      browser_spellcheck: true,
                      extended_valid_elements:
                        "+iframe[src|width|height|name|align|class]"
                    }}
                    onChange={this.handleEditorChange}
                  />
                </div>
                Pick Location, tags
                <div className="container">
                  <div className="row">
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

Index.propTypes = {
  stream: PropTypes.array
};

export default Index;
