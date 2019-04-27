import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PostGrid from "../components/PostGrid";
import Header from "../components/Header";
import Head from "../components/Head";
import Typography from "@material-ui/core/Typography";
import PostOrderBySelect from "../components/Grid/PostOrderBySelect";

class Tag extends Component {
  static async getInitialProps(props) {
    let { orderby } = props.query;
    const { tags } = props.query;
    let min_curation_score = 0;
    let title = tags;
    let value = 0;
    if (orderby === "created_at") {
      value = 0;
      min_curation_score = 0;
    } else if (orderby === "sc_hot") {
      value = 1;
      min_curation_score = 0;
    } else if (orderby === "featured") {
      value = 2;
      orderby = "created_at";
      min_curation_score = 10000;
    } else if (orderby === "total_votes") {
      //favourites
      title = "Favourites";
      value = 3;
      min_curation_score = 5000;
    }
    return {
      orderby,
      tags,
      min_curation_score: min_curation_score,
      title: title,
      value: value
    };
  }
  state = {
    min_curation_score: 0,
    orderby: "created_at"
  };
  handleClick(op) {
    this.setState(op);
    window.history.pushState("", "", `/${op.url}/${this.props.tags}`);
  }
  componentDidMount() {
    this.setState({
      min_curation_score: this.props.min_curation_score,
      orderby: this.props.orderby
    });
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
          className="pt-5 pb-3"
        >
          {this.props.tags.charAt(0).toUpperCase() + this.props.tags.slice(1)}
        </Typography>
        <PostOrderBySelect
          handleClick={this.handleClick.bind(this)}
          selection={this.state}
          value={this.props.value}
        />
        <PostGrid
          query={{
            tags: this.props.tags,
            orderby: this.state.orderby,
            min_curation_score: this.state.min_curation_score,
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
