import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";
import { Query } from "react-apollo";
import { GET_PROFILE } from "../../helpers/graphql/profile";
import SaveIcon from "@material-ui/icons/Save";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      author: this.props.user,
      profile_image: "",
      cover_image: "",
      name: "",
      about: "",
      location: "",
      website: "",
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      couchsurfing: "",
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
    this.handleEditorChange_twitter = this.handleEditorChange_twitter.bind(
      this
    );
    this.handleEditorChange_instagram = this.handleEditorChange_instagram.bind(
      this
    );
    this.handleEditorChange_youtube = this.handleEditorChange_youtube.bind(
      this
    );
    this.handleEditorChange_couchsurfing = this.handleEditorChange_couchsurfing.bind(
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
  handleEditorChange_twitter(twitter) {
    var changed = this.state.changed;
    if (changed.indexOf("twitter") > -1 === false) {
      changed = this.state.changed.concat("twitter");
    }
    this.setState({
      twitter: twitter.target.value,
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
  handleEditorChange_couchsurfing(couchsurfing) {
    var changed = this.state.changed;
    if (changed.indexOf("couchsurfing") > -1 === false) {
      changed = this.state.changed.concat("couchsurfing");
    }
    this.setState({
      couchsurfing: couchsurfing.target.value,
      changed: changed
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
  render() {
    var updatebtn = (
      <Button color="primary" variant="outlined" disabled>
        <SaveIcon />
        <span className="pl-2">Update Profile</span>
      </Button>
    );
    if (this.state.changed.length > 0) {
      updatebtn = (
        <Button
          color="primary"
          variant="contained"
          onClick={() => this.linkBuilder()}
        >
          <SaveIcon />
          <span className="pl-2">Update Profile</span>
        </Button>
      );
    }
    return (
      <Fragment>
        <Helmet>
          <title>{"Profile | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Query query={GET_PROFILE} variables={{ author: this.props.user }}>
          {({ data }) => {
            if (data && data.profile && this.state.loaded === false) {
              this.setState({
                loaded: true,
                profile_image: data.profile.profile_image,
                cover_image: data.profile.cover_image,
                name: data.profile.display_name,
                about: data.profile.about,
                location: data.profile.location,
                website: data.profile.website,
                facebook: data.profile.facebook,
                twitter: data.profile.twitter,
                instagram: data.profile.instagram,
                youtube: data.profile.youtube,
                couchsurfing: data.profile.couchsurfing
              });
            }
            return (
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
                        label="Twitter"
                        inputProps={{
                          maxLength: 50
                        }}
                        multiline={true}
                        placeholder="Your Twitter username"
                        margin="normal"
                        value={this.state.twitter}
                        onChange={this.handleEditorChange_twitter}
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
                      <TextField
                        label="Couchsurfing"
                        inputProps={{
                          maxLength: 50
                        }}
                        multiline={true}
                        placeholder="Your Couchsurfing username or fanpage"
                        margin="normal"
                        value={this.state.couchsurfing}
                        onChange={this.handleEditorChange_couchsurfing}
                        fullWidth
                      />
                      {updatebtn}
                      <Link
                        as={`/@${this.props.user}`}
                        href={`/blog?author=${this.props.user}`}
                        passHref
                      >
                        <a>
                          <Button
                            color="primary"
                            variant="outlined"
                            className="ml-2"
                          >
                            View your public profile
                          </Button>
                        </a>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.string
};

export default Profile;
