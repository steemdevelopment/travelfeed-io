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
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      author: getUser(),
      profileImage: '',
      coverImage: '',
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
    this.handleEditorChangeProfileImage = this.handleEditorChangeProfileImage.bind(
      this,
    );
    this.handleEditorChangeCoverImage = this.handleEditorChangeCoverImage.bind(
      this,
    );
    this.handleEditorChangeName = this.handleEditorChangeName.bind(this);
    this.handleEditorChangeAbout = this.handleEditorChangeAbout.bind(this);
    this.handleEditorChangeLocation = this.handleEditorChangeLocation.bind(
      this,
    );
    this.handleEditorChangeWebsite = this.handleEditorChangeWebsite.bind(this);
    this.handleEditorChangeFacebook = this.handleEditorChangeFacebook.bind(
      this,
    );
    this.handleEditorChangeTwitter = this.handleEditorChangeTwitter.bind(this);
    this.handleEditorChangeInstagram = this.handleEditorChangeInstagram.bind(
      this,
    );
    this.handleEditorChangeYoutube = this.handleEditorChangeYoutube.bind(this);
    this.handleEditorChangeCouchsurfing = this.handleEditorChangeCouchsurfing.bind(
      this,
    );
  }

  handleEditorChangeProfileImage(profileImage) {
    let { changed } = this.state;
    if (changed.indexOf(profileImage) > -1 === false) {
      changed = changed.concat(profileImage);
    }
    this.setState({
      profileImage: profileImage.target.value,
      changed,
    });
  }

  handleEditorChangeCoverImage(coverImage) {
    let { changed } = this.state;
    if (changed.indexOf('coverImage') > -1 === false) {
      changed = changed.concat('coverImage');
    }
    this.setState({
      coverImage: coverImage.target.value,
      changed,
    });
  }

  handleEditorChangeName(name) {
    let { changed } = this.state;
    if (changed.indexOf('name') > -1 === false) {
      changed = changed.concat('name');
    }
    this.setState({
      name: name.target.value,
      changed,
    });
  }

  handleEditorChangeAbout(about) {
    let { changed } = this.state;
    if (changed.indexOf('about') > -1 === false) {
      changed = changed.concat('about');
    }
    this.setState({
      about: about.target.value,
      changed,
    });
  }

  handleEditorChangeLocation(location) {
    let { changed } = this.state;
    if (changed.indexOf('location') > -1 === false) {
      changed = changed.concat('location');
    }
    this.setState({
      location: location.target.value,
      changed,
    });
  }

  handleEditorChangeWebsite(website) {
    let { changed } = this.state;
    if (changed.indexOf('website') > -1 === false) {
      changed = changed.concat('website');
    }
    this.setState({
      website: website.target.value,
      changed,
    });
  }

  handleEditorChangeFacebook(facebook) {
    let { changed } = this.state;
    if (changed.indexOf('facebook') > -1 === false) {
      changed = changed.concat('facebook');
    }
    this.setState({
      facebook: facebook.target.value,
      changed,
    });
  }

  handleEditorChangeTwitter(twitter) {
    let { changed } = this.state;
    if (changed.indexOf('twitter') > -1 === false) {
      changed = changed.concat('twitter');
    }
    this.setState({
      twitter: twitter.target.value,
      changed,
    });
  }

  handleEditorChangeInstagram(instagram) {
    let { changed } = this.state;
    if (changed.indexOf('instagram') > -1 === false) {
      changed = changed.concat('instagram');
    }
    this.setState({
      instagram: instagram.target.value,
      changed,
    });
  }

  handleEditorChangeYoutube(youtube) {
    let { changed } = this.state;
    if (changed.indexOf('youtube') > -1 === false) {
      changed = changed.concat('youtube');
    }
    this.setState({
      youtube: youtube.target.value,
      changed,
    });
  }

  handleEditorChangeCouchsurfing(couchsurfing) {
    let { changed } = this.state;
    if (changed.indexOf('couchsurfing') > -1 === false) {
      changed = changed.concat('couchsurfing');
    }
    this.setState({
      couchsurfing: couchsurfing.target.value,
      changed,
    });
  }

  linkBuilder() {
    const { changed } = this.state;
    if (changed.length === 0) {
      return '#';
    }
    let link = 'https://steemconnect.com/sign/profile-update?';
    let count = 0;
    changed.forEach(info => {
      if (count > 0) {
        link += '&';
      }
      link += `${info}=${this.state[info]}`;
      count += count;
    });
    window.open(link, '_blank');
    return '';
  }

  render() {
    const {
      changed,
      loaded,
      name,
      about,
      profileImage,
      location,
      website,
      coverImage,
      facebook,
      twitter,
      instagram,
      youtube,
      couchsurfing,
    } = this.state;
    let updatebtn = (
      <Button color="primary" variant="outlined" disabled>
        <SaveIcon />
        <span className="pl-2">Update Profile</span>
      </Button>
    );
    if (changed.length > 0) {
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
            if (data && data.profile && loaded === false) {
              this.setState({
                loaded: true,
                profileImage: data.profile.profileImage,
                coverImage: data.profile.coverImage,
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
                          value={name}
                          onChange={this.handleEditorChangeName}
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
                          value={about}
                          onChange={this.handleEditorChangeAbout}
                          fullWidth
                        />
                        <TextField
                          label="Profile image"
                          inputProps={{
                            maxLength: 1000,
                          }}
                          placeholder="Profile image"
                          margin="normal"
                          value={profileImage}
                          onChange={this.handleEditorChangeProfileImage}
                          fullWidth
                        />
                        <TextField
                          label="Cover image"
                          inputProps={{
                            maxLength: 1000,
                          }}
                          placeholder="Cover image for your blog"
                          margin="normal"
                          value={coverImage}
                          onChange={this.handleEditorChangeCoverImage}
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
                          value={location}
                          onChange={this.handleEditorChangeLocation}
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
                          value={website}
                          onChange={this.handleEditorChangeWebsite}
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
                          value={facebook}
                          onChange={this.handleEditorChangeFacebook}
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
                          value={twitter}
                          onChange={this.handleEditorChangeTwitter}
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
                          value={instagram}
                          onChange={this.handleEditorChangeInstagram}
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
                          value={youtube}
                          onChange={this.handleEditorChangeYoutube}
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
                          value={couchsurfing}
                          onChange={this.handleEditorChangeCouchsurfing}
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
