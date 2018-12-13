import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import Layout from "../components/Layout.js";
import { Client } from "dsteem";
import dateFromJsonString from "../helpers/dateFromJsonString";
import marked from "marked";
import PropTypes from "prop-types";
const client = new Client("https://api.steemit.com");

class Post extends Component {
  static async getInitialProps(props) {
    const { author } = props.query;
    const { permlink } = props.query;
    const post = await client.call("condenser_api", "get_content", [
      author,
      permlink
    ]);

    const json_date = '{ "date": "' + post.created + 'Z" }';
    const date_object = new Date(
      JSON.parse(json_date, dateFromJsonString).date
    );
    const created = date_object.toDateString();
    const json = JSON.parse(post.json_metadata);
    const image =
      typeof json.image != "undefined" &&
      json.image.length > 0 &&
      json.image[0] !== ""
        ? "https://steemitimages.com/1200x400/" + json.image[0]
        : "https://steemitimages.com/640x640/https://cdn.steemitimages.com/DQmPmEJ5NudyR5Vhh5X36U1qY8FgM5iuaN1Smc5N55cr363/default-header.png"; //todo: try fetching first image from post if no image is defined in json_metadata
    const tags = json.tags;
    const body = { __html: marked(post.body) };

    const blog = {
      post: {
        title: post.title,
        tags: tags,
        created: created,
        image: image,
        body: body
      }
    };

    return { blog };
  }
  render() {
    return (
      <Fragment>
        <Layout>
          <h1>{this.props.blog.post.title}</h1>
          <p>{this.props.blog.post.image}</p>
          <p>{this.props.blog.post.tags}</p>
          <p>{this.props.blog.post.created}</p>
          <p dangerouslySetInnerHTML={this.props.blog.post.body} />
        </Layout>
      </Fragment>
    );
  }
}
Post.propTypes = {
  blog: PropTypes.object
};

export default Post;
