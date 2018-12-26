/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, Component } from "react";
import "@babel/polyfill";
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
import PostEditor from "../../components/PostEditor";

class Publish extends Component {
  state = {
    readtime: { words: 0, text: "0 min read" },
    location: "",
    mounted: false
  };
  componentDidMount() {
    this.setState({ mounted: true });
  }
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"Publish | TravelFeed: The Travel Community"}</title>
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
                <PostEditor initialValue="<p>You can select text to format it. Add a new paragraph to add images, media, maps, tables or dividers. Happy blogging, we can't wait to hear your travel story!</p>" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default Publish;
