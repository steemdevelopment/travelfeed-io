import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Client } from "dsteem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Router from "next/router";

const client = new Client("https://api.steemit.com");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: this.props.user,
      profile_image: "",
      cover_image: "",
      name: "",
      about: "",
      location: "",
      website: "",
      facebook: "",
      instagram: "",
      youtube: "",
      changed: []
    };
    this.handleEditorChange_profile_image = this.handleEditorChange_profile_image.bind(
      this
    );
    this.handleEditorChange_cover_image = this.handleEditorChange_cover_image.bind(
      this
    );
    this.handleEditorChange_name = this.handleEditorChange_name.bind(this);
    this.handleEditorChange_about = this.handleEditorChange_about.bind(this);
    this.handleEditorChange_location = this.handleEditorChange_location.bind(
      this
    );
    this.handleEditorChange_website = this.handleEditorChange_website.bind(
      this
    );
    this.handleEditorChange_facebook = this.handleEditorChange_facebook.bind(
      this
    );
    this.handleEditorChange_instagram = this.handleEditorChange_instagram.bind(
      this
    );
    this.handleEditorChange_youtube = this.handleEditorChange_youtube.bind(
      this
    );
  }
  handleEditorChange_profile_image(profile_image) {
    var changed = this.state.changed;
    if (changed.indexOf("profile_image") > -1 === false) {
      changed = this.state.changed.concat("profile_image");
    }
    this.setState({
      profile_image: profile_image.target.value,
      changed: changed
    });
  }
  handleEditorChange_cover_image(cover_image) {
    var changed = this.state.changed;
    if (changed.indexOf("cover_image") > -1 === false) {
      changed = this.state.changed.concat("cover_image");
    }
    this.setState({
      cover_image: cover_image.target.value,
      changed: changed
    });
  }
  handleEditorChange_name(name) {
    var changed = this.state.changed;
    if (changed.indexOf("name") > -1 === false) {
      changed = this.state.changed.concat("name");
    }
    this.setState({
      name: name.target.value,
      changed: changed
    });
  }
  handleEditorChange_about(about) {
    var changed = this.state.changed;
    if (changed.indexOf("about") > -1 === false) {
      changed = this.state.changed.concat("about");
    }
    this.setState({
      about: about.target.value,
      changed: changed
    });
  }
  handleEditorChange_location(location) {
    var changed = this.state.changed;
    if (changed.indexOf("location") > -1 === false) {
      changed = this.state.changed.concat("location");
    }
    this.setState({
      location: location.target.value,
      changed: changed
    });
  }
  handleEditorChange_website(website) {
    var changed = this.state.changed;
    if (changed.indexOf("website") > -1 === false) {
      changed = this.state.changed.concat("website");
    }
    this.setState({
      website: website.target.value,
      changed: changed
    });
  }
  handleEditorChange_facebook(facebook) {
    var changed = this.state.changed;
    if (changed.indexOf("facebook") > -1 === false) {
      changed = this.state.changed.concat("facebook");
    }
    this.setState({
      facebook: facebook.target.value,
      changed: changed
    });
  }
  handleEditorChange_instagram(instagram) {
    var changed = this.state.changed;
    if (changed.indexOf("instagram") > -1 === false) {
      changed = this.state.changed.concat("instagram");
    }
    this.setState({
      instagram: instagram.target.value,
      changed: changed
    });
  }
  handleEditorChange_youtube(youtube) {
    var changed = this.state.changed;
    if (changed.indexOf("youtube") > -1 === false) {
      changed = this.state.changed.concat("youtube");
    }
    this.setState({
      youtube: youtube.target.value,
      changed: changed
    });
  }
  async getProfile() {
    // TODO: get current author name from permlink
    const acc = await client.database.getAccounts([this.state.author]);
    const json = JSON.parse(acc[0].json_metadata);
    var profile_image =
      typeof json.profile.profile_image != "undefined"
        ? json.profile.profile_image
        : "";
    var cover_image =
      typeof json.profile.cover_image != "undefined"
        ? json.profile.cover_image
        : "";
    var name = typeof json.profile.name != "undefined" ? json.profile.name : "";
    var about =
      typeof json.profile.about != "undefined" ? json.profile.about : "";
    var location =
      typeof json.profile.location != "undefined" ? json.profile.location : "";
    var website =
      typeof json.profile.website != "undefined" ? json.profile.website : "";
    var facebook =
      typeof json.profile.facebook != "undefined" ? json.profile.facebook : "";
    var instagram =
      typeof json.profile.instagram != "undefined"
        ? json.profile.instagram
        : "";
    var youtube =
      typeof json.profile.youtube != "undefined" ? json.profile.youtube : "";
    this.setState({
      profile_image: profile_image,
      cover_image: cover_image,
      name: name,
      about: about,
      location: location,
      website: website,
      facebook: facebook,
      instagram: instagram,
      youtube: youtube
    });
  }
  linkBuilder() {
    if (this.state.changed.length == 0) {
      return "#";
    }
    var link = "https://steemconnect.com/sign/profile-update?";
    var count = 0;
    for (let info of this.state.changed) {
      if (count > 0) {
        link += "&";
      }
      link += info + "=" + this.state[info];
      ++count;
    }
    window.open(link, "_blank");
  }
  componentDidMount() {
    this.getProfile();
  }
  render() {
    var updatebtn = (
      <Button color="primary" variant="outlined" disabled>
        Update
      </Button>
    );
    if (this.state.changed.length > 0) {
      updatebtn = (
        <Button
          color="primary"
          variant="outlined"
          onClick={() => this.linkBuilder()}
        >
          Update
        </Button>
      );
    }
    return (
      <Fragment>
        <Helmet>
          <title>{"Profile | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <Card>
              <CardContent>
                <h1>Your Profile</h1>
                {/* Todo: Find out what the blockchain imposed length limits are for each field */}
                <TextField
                  label="Name"
                  inputProps={{
                    maxLength: 20
                  }}
                  multiline={true}
                  placeholder="Your display name"
                  margin="normal"
                  value={this.state.name}
                  onChange={this.handleEditorChange_name}
                  fullWidth
                />
                <TextField
                  label="Profile description"
                  inputProps={{
                    maxLength: 160
                  }}
                  multiline={true}
                  placeholder="Profile description"
                  margin="normal"
                  value={this.state.about}
                  onChange={this.handleEditorChange_about}
                  fullWidth
                />
                <TextField
                  label="Profile image"
                  inputProps={{
                    maxLength: 1000
                  }}
                  placeholder="Profile image"
                  margin="normal"
                  value={this.state.profile_image}
                  onChange={this.handleEditorChange_profile_image}
                  fullWidth
                />
                <TextField
                  label="Cover image"
                  inputProps={{
                    maxLength: 1000
                  }}
                  placeholder="Cover image for your blog"
                  margin="normal"
                  value={this.state.cover_image}
                  onChange={this.handleEditorChange_cover_image}
                  fullWidth
                />
                <TextField
                  label="Location"
                  inputProps={{
                    maxLength: 30
                  }}
                  multiline={true}
                  placeholder="Your location"
                  margin="normal"
                  value={this.state.location}
                  onChange={this.handleEditorChange_location}
                  fullWidth
                />
                <TextField
                  label="Website"
                  inputProps={{
                    maxLength: 100
                  }}
                  multiline={true}
                  placeholder="Your website"
                  margin="normal"
                  value={this.state.website}
                  onChange={this.handleEditorChange_website}
                  fullWidth
                />
                <TextField
                  label="Facebook"
                  inputProps={{
                    maxLength: 50
                  }}
                  multiline={true}
                  placeholder="Your Facebook username or fanpage"
                  margin="normal"
                  value={this.state.facebook}
                  onChange={this.handleEditorChange_facebook}
                  fullWidth
                />
                <TextField
                  label="Instagram"
                  inputProps={{
                    maxLength: 30
                  }}
                  multiline={true}
                  placeholder="Your Instagram username"
                  margin="normal"
                  value={this.state.instagram}
                  onChange={this.handleEditorChange_instagram}
                  fullWidth
                />
                <TextField
                  label="Youtube"
                  inputProps={{
                    maxLength: 20
                  }}
                  multiline={true}
                  placeholder="Your Youtube username"
                  margin="normal"
                  value={this.state.youtube}
                  onChange={this.handleEditorChange_youtube}
                  fullWidth
                />
                {updatebtn}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.string
};

export default Profile;
