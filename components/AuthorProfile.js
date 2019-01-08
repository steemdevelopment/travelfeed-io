import React, { Fragment, Component } from "react";
import "@babel/polyfill";
import { client } from "../helpers/client";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import FollowButton from "./FollowButton";
import Helmet from "react-helmet";

class PostAuthorProfile extends Component {
  state = {
    author: this.props.author,
    about: "",
    cover_image: "",
    name: "",
    location: "",
    website: "",
    facebook: "",
    instagram: "",
    youtube: ""
  };
  async getProfile() {
    // TODO: get current author name from permlink
    const acc = await client.database.getAccounts([this.state.author]);
    var about = "A TravelFeed author.";
    var cover_image =
      "https://cdn.steemitimages.com/DQme1phKjAipUM1zg5GQNaobssCMgmLAvFLFTVJpe9YVSvv/Steem_Gradient_Blue.png";
    var name = "";
    var location = "";
    var website = "";
    var facebook = "";
    var instagram = "";
    var youtube = "";
    if (acc[0].json_metadata != "") {
      const json = JSON.parse(acc[0].json_metadata);
      name = typeof json.profile.name != "undefined" ? json.profile.name : "";
      about =
        typeof json.profile.about != "undefined" ? json.profile.about : "";
      location =
        typeof json.profile.location != "undefined"
          ? json.profile.location
          : "";
      website =
        typeof json.profile.website != "undefined" ? json.profile.website : "";
      facebook =
        typeof json.profile.facebook != "undefined"
          ? json.profile.facebook
          : "";
      instagram =
        typeof json.profile.instagram != "undefined"
          ? json.profile.instagram
          : "";
      youtube =
        typeof json.profile.youtube != "undefined" ? json.profile.youtube : "";
      about =
        json.profile.about != "" ? json.profile.about : "A TravelFeed author.";
      cover_image =
        typeof json.profile.cover_image != "undefined"
          ? `https://steemitimages.com/1500x0/${json.profile.cover_image}`
          : "https://cdn.steemitimages.com/DQme1phKjAipUM1zg5GQNaobssCMgmLAvFLFTVJpe9YVSvv/Steem_Gradient_Blue.png";
    }
    this.setState({
      about: about,
      cover_image: cover_image,
      name: name,
      location: location,
      website: website,
      facebook: facebook,
      instagram: instagram,
      youtube: youtube
    });
  }
  componentDidMount() {
    this.getProfile();
  }
  render() {
    const divStyle = {
      backgroundImage: "url(" + this.state.cover_image + ")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover_image",
      marginTop: "-10px"
    };
    var location = <Fragment />;
    var website = <Fragment />;
    var facebook = <Fragment />;
    var instagram = <Fragment />;
    var youtube = <Fragment />;
    if (this.state.location != "") {
      location = (
        <span>
          <i className="fas fa-map-marker-alt pr-2" />
          {this.state.location}
        </span>
      );
    }
    if (this.state.website != "") {
      website = (
        <a
          href={this.state.website}
          target="_blank"
          rel="nofollow noreferrer noopener"
        >
          <i className="fas fa-link text-light fa-2x p-1" />
        </a>
      );
    }
    if (this.state.facebook != "") {
      facebook = (
        <a
          href={"https://facebook.com/" + this.state.facebook}
          target="_blank"
          rel="nofollow noreferrer noopener"
        >
          <i className="fab fa-facebook-f text-light fa-2x p-1" />
        </a>
      );
    }
    if (this.state.instagram != "") {
      instagram = (
        <a
          href={"https://instagram.com/" + this.state.instagram}
          target="_blank"
          rel="nofollow noreferrer noopener"
        >
          <i className="fab fa-instagram text-light fa-2x p-1" />
        </a>
      );
    }
    if (this.state.youtube != "") {
      youtube = (
        <a
          href={"https://youtube.com/" + this.state.youtube}
          target="_blank"
          rel="nofollow noreferrer noopener"
        >
          <i className="fab fa-youtube text-light fa-2x p-1" />
        </a>
      );
    }
    return (
      <Fragment>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
            integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
            crossOrigin="anonymous"
          />
        </Helmet>
        <div className="text-center p-5 mb-3" style={divStyle}>
          <div className="container">
            <div className="row justify-content-center">
              <div
                style={{ backgroundColor: "rgba(52, 58, 64, 0.6)" }}
                className="col-lg-6 col-md-9 col-sm-12 p-3 text-light rounded"
              >
                <Fragment>
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
                  <div>
                    <Typography variant="h6" className="text-light">
                      {this.state.name}
                    </Typography>
                  </div>
                  <p className="p-2">{this.state.about}</p>
                  <p>{location}</p>
                </Fragment>
                <p>
                  {website}
                  {facebook}
                  {instagram}
                  {youtube}
                </p>
                <div>
                  <FollowButton author={this.props.author} btnstyle="default" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

PostAuthorProfile.propTypes = {
  author: PropTypes.string
};

export default PostAuthorProfile;
