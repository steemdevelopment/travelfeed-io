import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PostGrid from "../components/PostGrid";
import Header from "../components/Header";
import Head from "../components/Head";
import Typography from "@material-ui/core/Typography";
import TagsOrderBySelect from "../components/Grid/TagsOrderBySelect";

class Tag extends Component {
  static async getInitialProps(props) {
    let { orderby } = props.query;
    const { tags } = props.query;
    let min_curation_score = 0;
    let selection = 0;
    let title = "Taking Off";
    if (orderby === "featured") {
      selection = 1;
      orderby = "sc_trend";
      min_curation_score = 5000;
      title = "Featured";
    } else if (orderby === "total_votes") {
      selection = 2;
      min_curation_score = 10000;
      title = "Favorites";
    }
    return {
      orderby,
      tags,
      min_curation_score,
      selection,
      title
    };
  }
  render() {
    return (
      <Fragment>
        <Head
          title={`${this.props.title}: ${this.props.tags
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
          className="pt-5 pb-3"
        >
          {this.props.tags.charAt(0).toUpperCase() + this.props.tags.slice(1)}
        </Typography>
        <TagsOrderBySelect
          tags={this.props.tags}
          selection={this.props.selection}
        />
        <PostGrid
          query={{
            tags: this.props.tags,
            orderby: this.props.orderby,
            min_curation_score: this.props.min_curation_score,
            limit: 8
          }}
          grid={{ lg: 3, md: 4, sm: 6, xs: 12 }}
          cardHeight={170}
          poststyle="grid"
        />
      </Fragment>
    );
  }
}

Tag.propTypes = {
  tags: PropTypes.string,
  title: PropTypes.string,
  orderby: PropTypes.string,
  min_curation_score: PropTypes.number,
  selection: PropTypes.number
};

export default Tag;
