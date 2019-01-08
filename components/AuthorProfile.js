import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import { client } from "../helpers/client";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import FollowButton from "./FollowButton";

class PostAuthorProfile extends Component {
  state = {
    author: this.props.author,
    profiledesc: "",
    cover: ""
  };
  async getProfile() {
    // TODO: get current author name from permlink
    const acc = await client.database.getAccounts([this.state.author]);
    var profiledesc = "A TravelFeed author.";
    var cover =
      "https://cdn.steemitimages.com/DQme1phKjAipUM1zg5GQNaobssCMgmLAvFLFTVJpe9YVSvv/Steem_Gradient_Blue.png";
    if (acc[0].json_metadata != "") {
      const json = JSON.parse(acc[0].json_metadata);
      profiledesc =
        json.profile.about != "" ? json.profile.about : "A TravelFeed author.";
      cover =
        typeof json.profile.cover_image != "undefined"
          ? `https://steemitimages.com/1500x0/${json.profile.cover_image}`
          : "https://cdn.steemitimages.com/DQme1phKjAipUM1zg5GQNaobssCMgmLAvFLFTVJpe9YVSvv/Steem_Gradient_Blue.png";
    }
    this.setState({ profiledesc: profiledesc, cover: cover });
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
      marginTop: "-10px"
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
                  <Typography variant="h6" className="text-light">
                    {this.props.author}
                  </Typography>
                </div>
                <p className="p-2">{this.state.profiledesc}</p>
              </Fragment>
              <div>
                <FollowButton author={this.props.author} btnstyle="default" />
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
