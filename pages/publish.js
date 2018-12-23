import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class Index extends Component {
  handleEditorChange = e => {
    console.log("Content was updated:", e.target.getContent());
  };
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"Publish | TravelFeed: The Travel Community"}</title>
          <script src="/js/tinymce/tinymce.min.js" />
        </Helmet>
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <Card>
              <CardContent>
                <Typography
                  variant="display1"
                  className="text-dark font-weight-bold"
                >
                  Publish
                </Typography>
                <div>Title, Categories, Content, Location, Preview</div>
                <Editor
                  initialValue="<p>This is the initial content of the editor</p>"
                  init={{
                    branding: false,
                    plugins: "link image code",
                    toolbar:
                      "undo redo | bold italic | alignleft aligncenter alignright | code"
                  }}
                  onChange={this.handleEditorChange}
                />
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
