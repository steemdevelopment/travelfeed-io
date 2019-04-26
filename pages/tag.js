import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PostGrid from "../components/PostGrid";
import Header from "../components/Header";
import Head from "../components/Head";
import Typography from "@material-ui/core/Typography";

class Tag extends Component {
  static async getInitialProps(props) {
    let { orderby } = props.query;
    const { tags } = props.query;
    let min_curation_score = 0;
    let title = orderby;
    if (orderby === "created_at") {
      title = "created";
    }
    if (orderby === "featured") {
      orderby = "created_at";
      min_curation_score = 10000;
    }
    return {
      orderby,
      tags,
      min_curation_score: min_curation_score,
      title: title
    };
  }
  render() {
    // if (typeof this.props.args.stream.notfound !== "undefined") {
    return (
      <Fragment>
        <Head
          title={`${this.props.title.charAt(0).toUpperCase() +
            this.props.title.slice(1)}: ${this.props.tags
            .charAt(0)
            .toUpperCase() +
            this.props.tags.slice(1)} - TravelFeed: The Travel Community`}
          description={`Explore posts about #${this.props.tags} on TravelFeed.`}
        />
        <Header />
        <Typography
          variant="h4"
          align="center"
          gutterBottom={true}
          className="pt-5"
        >
          {this.props.title.charAt(0).toUpperCase() + this.props.title.slice(1)}
          {": #"}
          {this.props.tags}
        </Typography>
        <PostGrid
          query={{
            tags: this.props.tags,
            orderby: this.props.orderby,
            min_curation_score: this.props.min_curation_score,
            limit: 12
          }}
        />
      </Fragment>
    );
  }
}

Tag.propTypes = {
  tags: PropTypes.string,
  title: PropTypes.string,
  orderby: PropTypes.string,
  min_curation_score: PropTypes.number
};

export default Tag;
