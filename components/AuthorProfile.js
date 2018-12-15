import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import { Client } from "dsteem";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
const client = new Client("https://api.steemit.com");
import Link from "next/link";
import Typography from "@material-ui/core/Typography";

class PostAuthorProfile extends Component {
  state = {
    author: this.props.author,
    profiledesc: "A TravelFeed author.",
    cover: ""
  };
  async getProfile() {
    // TODO: get current author name from permlink
    const acc = await client.database.getAccounts([this.state.author]);
    const json = JSON.parse(acc[0].json_metadata);
    const about = json.profile.about;
    const cover = `https://steemitimages.com/1500x0/${
      json.profile.cover_image
    }`;
    this.setState({ profiledesc: about, cover: cover });
  }
  componentDidMount() {
    this.getProfile();
  }
  render() {
    const divStyle = {
      backgroundImage: "url(" + this.state.cover + ")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      marginTop: "-15px"
    };
    return (
      <div className="text-center p-5 mb-3" style={divStyle}>
        <div className="container">
          <div className="row justify-content-center">
            <div
              style={{ backgroundColor: "rgba(52, 58, 64, 0.6)" }}
              className="col-lg-6 col-md-9 col-sm-12 p-3 text-light rounded"
            >
              <div className="pb-2">
                <img
                  style={{ cursor: "pointer" }}
                  src={`https://steemitimages.com/u/${
                    this.props.author
                  }/avatar`}
                  width="80"
                  height="80"
                  className="rounded-circle"
                />
              </div>
              <Fragment>
                <div>
                  <Typography variant="title" className="text-light">
                    {this.props.author}
                  </Typography>
                </div>
                <p className="p-2">{this.state.profiledesc}</p>
              </Fragment>
              <div>
                <Button variant="outlined" size="small" color="inherit">
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostAuthorProfile.propTypes = {
  author: PropTypes.string
};

export default PostAuthorProfile;
