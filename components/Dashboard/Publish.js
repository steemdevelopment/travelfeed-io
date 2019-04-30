import React, { Fragment, Component } from "react";
import Helmet from "react-helmet";
import PostEditor from "../PostEditor";

class Publish extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"Publish | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <PostEditor />
      </Fragment>
    );
  }
}

export default Publish;
