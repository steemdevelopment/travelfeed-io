import Button from '@material-ui/core/Button';
import { indigo } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Link from 'next/link';
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_PROFILE } from '../../helpers/graphql/profile';
import { getUser } from '../../helpers/token';
import HeaderCard from '../General/HeaderCard';

class Profile extends Component {
  state = {
    loaded: false,
    author: getUser(),
    profile_image: '',
    cover_image: '',
    name: '',
    about: '',
    location: '',
    website: '',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    couchsurfing: '',
    changed: [],
  };

  handleEditorChange_profile_image = profile_image => {
    let { changed } = this.state;
    if (changed.indexOf('profile_image') > -1 === false) {
      changed = this.state.changed.concat('profile_image');
    }
    this.setState({
      profile_image: profile_image.target.value,
      changed,
    });
  };

  handleEditorChange_cover_image = cover_image => {
    let { changed } = this.state;
    if (changed.indexOf('cover_image') > -1 === false) {
      changed = this.state.changed.concat('cover_image');
    }
    this.setState({
      cover_image: cover_image.target.value,
      changed,
    });
  };

  handleEditorChange_name = name => {
    let { changed } = this.state;
    if (changed.indexOf('name') > -1 === false) {
      changed = this.state.changed.concat('name');
    }
    this.setState({
      name: name.target.value,
      changed,
    });
  };

  handleEditorChange_about = about => {
    let { changed } = this.state;
    if (changed.indexOf('about') > -1 === false) {
      changed = this.state.changed.concat('about');
    }
    this.setState({
      about: about.target.value,
      changed,
    });
  };

  handleEditorChange_location = location => {
    let { changed } = this.state;
    if (changed.indexOf('location') > -1 === false) {
      changed = this.state.changed.concat('location');
    }
    this.setState({
      location: location.target.value,
      changed,
    });
  };

  handleEditorChange_website = website => {
    let { changed } = this.state;
    if (changed.indexOf('website') > -1 === false) {
      changed = this.state.changed.concat('website');
    }
    this.setState({
      website: website.target.value,
      changed,
    });
  };

  handleEditorChange_facebook = facebook => {
    let { changed } = this.state;
    if (changed.indexOf('facebook') > -1 === false) {
      changed = this.state.changed.concat('facebook');
    }
    this.setState({
      facebook: facebook.target.value,
      changed,
    });
  };

  handleEditorChange_twitter = twitter => {
    let { changed } = this.state;
    if (changed.indexOf('twitter') > -1 === false) {
      changed = this.state.changed.concat('twitter');
    }
    this.setState({
      twitter: twitter.target.value,
      changed,
    });
  };

  handleEditorChange_instagram = instagram => {
    let { changed } = this.state;
    if (changed.indexOf('instagram') > -1 === false) {
      changed = this.state.changed.concat('instagram');
    }
    this.setState({
      instagram: instagram.target.value,
      changed,
    });
  };

  handleEditorChange_youtube = youtube => {
    let { changed } = this.state;
    if (changed.indexOf('youtube') > -1 === false) {
      changed = this.state.changed.concat('youtube');
    }
    this.setState({
      youtube: youtube.target.value,
      changed,
    });
  };

  handleEditorChange_couchsurfing = couchsurfing => {
    let { changed } = this.state;
    if (changed.indexOf('couchsurfing') > -1 === false) {
      changed = this.state.changed.concat('couchsurfing');
    }
    this.setState({
      couchsurfing: couchsurfing.target.value,
      changed,
    });
  };

  linkBuilder = () => {
    if (this.state.changed.length === 0) {
      return;
    }
    let link = 'https://steemconnect.com/sign/profile-update?';
    let count = 0;
    this.state.changed.forEach(info => {
      if (count > 0) {
        link += '&';
      }
      link += `${info}=${this.state[info]}`;
      count += 1;
    });
    window.open(link, '_blank');
  };

  render() {
    let updatebtn = (
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
        <Query query={GET_PROFILE} variables={{ author: getUser() }}>
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
                couchsurfing: data.profile.couchsurfing,
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
                  <HeaderCard
                    title="Edit Your Profile"
                    background={indigo[600]}
                    content={
                      <Fragment>
                        {/* Todo: Find out what the blockchain imposed 
                        length limits are for each field */}
                        <TextField
                          label="Name"
                          inputProps={{
                            maxLength: 20,
                          }}
                          multiline
                          placeholder="Your display name"
                          margin="normal"
                          value={this.state.name}
                          onChange={this.handleEditorChange_name}
                          fullWidth
                        />
                        <TextField
                          label="Profile description"
                          inputProps={{
                            maxLength: 160,
                          }}
                          multiline
                          placeholder="Profile description"
                          margin="normal"
                          value={this.state.about}
                          onChange={this.handleEditorChange_about}
                          fullWidth
                        />
                        <TextField
                          label="Profile image"
                          inputProps={{
                            maxLength: 1000,
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
                            maxLength: 1000,
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
                            maxLength: 30,
                          }}
                          multiline
                          placeholder="Your location"
                          margin="normal"
                          value={this.state.location}
                          onChange={this.handleEditorChange_location}
                          fullWidth
                        />
                        <TextField
                          label="Website"
                          inputProps={{
                            maxLength: 100,
                          }}
                          multiline
                          placeholder="Your website"
                          margin="normal"
                          value={this.state.website}
                          onChange={this.handleEditorChange_website}
                          fullWidth
                        />
                        <TextField
                          label="Facebook"
                          inputProps={{
                            maxLength: 50,
                          }}
                          multiline
                          placeholder="Your Facebook username or fanpage"
                          margin="normal"
                          value={this.state.facebook}
                          onChange={this.handleEditorChange_facebook}
                          fullWidth
                        />
                        <TextField
                          label="Twitter"
                          inputProps={{
                            maxLength: 50,
                          }}
                          multiline
                          placeholder="Your Twitter username"
                          margin="normal"
                          value={this.state.twitter}
                          onChange={this.handleEditorChange_twitter}
                          fullWidth
                        />
                        <TextField
                          label="Instagram"
                          inputProps={{
                            maxLength: 30,
                          }}
                          multiline
                          placeholder="Your Instagram username"
                          margin="normal"
                          value={this.state.instagram}
                          onChange={this.handleEditorChange_instagram}
                          fullWidth
                        />
                        <TextField
                          label="Youtube"
                          inputProps={{
                            maxLength: 20,
                          }}
                          multiline
                          placeholder="Your Youtube username"
                          margin="normal"
                          value={this.state.youtube}
                          onChange={this.handleEditorChange_youtube}
                          fullWidth
                        />
                        <TextField
                          label="Couchsurfing"
                          inputProps={{
                            maxLength: 50,
                          }}
                          multiline
                          placeholder="Your Couchsurfing username or fanpage"
                          margin="normal"
                          value={this.state.couchsurfing}
                          onChange={this.handleEditorChange_couchsurfing}
                          fullWidth
                        />
                        {updatebtn}
                        <Link
                          as={`/@${getUser()}`}
                          href={`/blog?author=${getUser()}`}
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
                      </Fragment>
                    }
                  />
                </Grid>
              </Grid>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Profile;
