import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import PublishIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Update';
import Router from 'next/router';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import readingTime from 'reading-time';
import Editor from 'rich-markdown-editor';
import sanitize from 'sanitize-html';
import getSlug from 'speakingurl';
import { APP_VERSION, ROOTURL } from '../../config';
import { comment } from '../../helpers/actions';
import { SAVE_DRAFT } from '../../helpers/graphql/drafts';
import uploadFile from '../../helpers/imageUpload';
import { getImageList } from '../../helpers/parsePostContents';
import { getUser } from '../../helpers/token';
import FeaturedImageUpload from '../Editor/FeaturedImageUpload';
import HtmlEditor from '../Editor/HTMLEditor';
import HtmlEditorPreview from '../Editor/HTMLEditorPreview';
import LocationPicker from '../Editor/LocationPickerButton';
import SwitchEditorModeButton from '../Editor/SwitchEditorModeButton';
import TagPicker from '../Editor/TagPicker';
import PostMap from '../Maps/PostMap';

class PostEditor extends Component {
  state = {
    title: '',
    content: undefined,
    tags: undefined,
    completed: 0,
    location: undefined,
    codeEditor: false,
    saved: true,
    featuredImage: undefined,
    // codeEditor: true
  };

  componentDidMount() {
    const json =
      this.props.edit.json && this.props.edit.json !== 'undefined'
        ? JSON.parse(this.props.edit.json)
        : undefined;
    const title = this.props.edit.title ? this.props.edit.title : '';
    const content = this.props.edit.body ? this.props.edit.body : '';
    const codeEditor = this.props.edit.body !== undefined;
    const tags = json && json.tags ? json.tags : ['travelfeed'];
    const location = json && json.location ? json.location : undefined;
    const featuredImage =
      json && json.featuredImage ? json.featuredImage : undefined;
    const id = this.props.edit.id
      ? this.props.edit.id
      : `${getUser()}-${getSlug(new Date().toJSON()).replace(/-/g, '')}`;
    this.setState({
      title,
      content,
      tags,
      location,
      id,
      mounted: true,
      codeEditor,
      featuredImage,
    });
    // Save draft every 20 seconds
    this.interval = setInterval(() => this.setState({ saved: false }), 20000);
  }

  componentWillUnmount() {
    // Stop saving drafts
    clearInterval(this.interval);
  }

  handleTagClick = op => {
    this.setState(op);
  };

  handleTitleEditorChange = title => {
    this.setState({ title: title.target.value });
  };

  handleEditorChange = value => {
    const content = value();
    this.setState({ content });
  };

  handleHtmlEditorChange = content => {
    this.setState({ content });
  };

  onLocationPick = ({ latitude, longitude }) => {
    this.setState({ location: { latitude, longitude } });
  };

  setFeaturedImage = featuredImage => {
    this.setState({ featuredImage });
  };

  removeFeaturedImage = () => {
    this.setState({ featuredImage: undefined });
  };

  progress = () => {
    const { loading } = this.state;
    if (loading < 100) {
      this.setState({ loading: loading + 1 });
    } else {
      this.setState({ loading: 0 });
    }
  };

  changeEditorMode() {
    this.setState(prevState => ({
      codeEditor: !prevState.codeEditor,
    }));
  }

  handleTagsEditorChange(tags) {
    this.setState({ tags: tags.target.value });
  }

  publishPost() {
    const username = getUser();
    const parentAuthor = '';
    const parentPermlink = 'travelfeed';
    const { title } = this.state;
    let permlink = getSlug(title);
    let body = this.state.content;
    const { location } = this.state;
    const featuredImage = this.state.featuredImage
      ? [this.state.featuredImage]
      : [];
    const imageList = featuredImage.concat(getImageList(body));
    const metadata = {};
    metadata.tags = this.state.tags;
    metadata.app = APP_VERSION;
    metadata.community = 'travelfeed';
    if (imageList !== null) {
      metadata.image = imageList;
    }
    if (!this.props.edit.editmode === 'true') {
      body += `<hr /><center>View this post <a href="https://travelfeed.io/@${username}/${permlink}">on the TravelFeed dApp</a> for the best experience.</center>`;
    }
    if (location !== undefined) {
      metadata.coordinates = [location.latitude, location.longitude];
      if (
        !this.props.edit.editmode === 'true' ||
        location !== this.props.edit.location
      ) {
        body += `\n\n[//]:# (!steemitworldmap ${location.latitude} lat ${
          location.longitude
        } long  d3scr)`;
      }
    }
    // Todo: Parse body for images and links and include them
    // in the json_metadata
    if (this.props.edit.editmode === 'true') {
      ({ permlink } = this.props.edit);
    }
    this.setState({ user: username, permlink });
    // Steemconnect broadcast
    return comment(
      parentAuthor,
      parentPermlink,
      permlink,
      title,
      body,
      metadata,
      'comment',
    ).then(res => {
      if (res) {
        this.newNotification(res);
        this.setState({ loading: undefined });
      }
    });
  }

  newNotification(notification) {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      this.props.enqueueSnackbar(notification.message, { variant });
      if (notification.success === true) {
        this.setState({ success: true });
      }
    }
  }

  render() {
    const sanitized = this.state.content
      ? sanitize(this.state.content, { allowedTags: [] })
      : '';
    let wordCount = '';
    let readTime = '';
    const readingtime = this.state.content
      ? readingTime(sanitized)
      : { words: 0, text: '0 min' };
    wordCount = readingtime.words;
    readTime = readingtime.text;
    const { location } = this.state;
    if (this.state.completed === 100 && this.state.success === true) {
      this.success();
      const url = `${ROOTURL}/@${this.state.user}/${this.state.permlink}`;
      Router.push(url);
    }
    const publishTooltip =
      wordCount < 250 || this.state.title === ''
        ? 'You need to write at least 250 words and set a title before you can publish your post'
        : 'Once published, your post cannot be deleted';
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12 p-1 pt-3">
              <Card>
                <CardContent>
                  <InputBase
                    autoFocus
                    inputProps={{
                      maxLength: 100,
                    }}
                    multiline
                    className="font-weight-bold inputtitle"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.handleTitleEditorChange}
                    fullWidth
                  />
                </CardContent>
              </Card>
            </div>
            <div className="col-xl-12 col-md-12 p-1">
              <Card>
                <CardContent>
                  <CardHeader
                    action={
                      <Fragment>
                        <span className="badge badge-secondary m-1 p-1 pl-2 pr-2 rounded">
                          {`${wordCount} words`}
                        </span>
                        <span className="badge badge-secondary m-1 p-1 pl-2 pr-2 rounded">
                          {readTime}
                        </span>
                      </Fragment>
                    }
                  />
                  <Mutation
                    mutation={SAVE_DRAFT}
                    variables={{
                      id: this.state.id,
                      title: this.state.title,
                      body: this.state.content,
                      json: JSON.stringify({
                        tags: this.state.tags,
                        location: this.state.location,
                        featuredImage: this.state.featuredImage,
                      }),
                    }}
                  >
                    {saveDraft => {
                      if (!this.state.saved) {
                        if (wordCount > 1) saveDraft();
                        this.setState({ saved: true });
                      }
                      return (
                        <div>
                          {(this.state.codeEditor && this.state.mounted && (
                            <Fragment>
                              <HtmlEditor
                                data={this.state.content}
                                onChange={this.handleHtmlEditorChange}
                              />
                            </Fragment>
                          )) || (
                            <div>
                              {this.state.mounted && (
                                <Editor
                                  style={{ minHeight: '300px' }}
                                  className="border postcontent pl-2"
                                  uploadImage={file => {
                                    return uploadFile(file, getUser()).then(
                                      res => {
                                        return res;
                                      },
                                    );
                                  }}
                                  placeholder="Start writing your next awesome travel blog!"
                                  onChange={this.handleEditorChange}
                                  defaultValue={this.state.content}
                                  autoFocus
                                />
                              )}
                            </div>
                          )}
                          <div className="text-right">
                            <SwitchEditorModeButton
                              switchMode={() => this.changeEditorMode()}
                              codeEditor={this.state.codeEditor}
                            />
                          </div>
                          <h5 className="pt-2">Preview</h5>
                          <HtmlEditorPreview preview={this.state.content} />
                        </div>
                      );
                    }}
                  </Mutation>
                </CardContent>
              </Card>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-xl-3 col-md-6 col-sm-12 p-1">
                  <Card>
                    {this.state.featuredImage && (
                      <CardMedia
                        className="h-100"
                        style={{ minHeight: '200px' }}
                        image={this.state.featuredImage}
                      />
                    )}
                    <CardContent className="text-center">
                      <h5>Featured Image</h5>
                      {(this.state.featuredImage && (
                        <Button
                          variant="contained"
                          color="secondary"
                          component="span"
                          onClick={this.removeFeaturedImage}
                        >
                          Remove Image <DeleteIcon />
                        </Button>
                      )) || (
                        <FeaturedImageUpload
                          setFeaturedImage={this.setFeaturedImage}
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
                <div className="col-xl-3 col-md-6 col-sm-12 p-1">
                  <Card>
                    <CardContent>
                      <h5 className="text-center">
                        Location
                        {this.state.location &&
                          `: ${this.state.location.latitude}, ${
                            this.state.location.longitude
                          }`}
                      </h5>
                      {location && (
                        <PostMap
                          location={{
                            coordinates: {
                              lat: this.state.location.latitude,
                              lng: this.state.location.longitude,
                            },
                          }}
                        />
                      )}
                      <div className="text-center p-1">
                        <LocationPicker
                          onPick={this.onLocationPick}
                          isChange={this.state.location}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="col-xl-3 col-md-6 col-sm-12 p-1">
                  <Card>
                    <CardContent>
                      <h5 className="text-center">Tags</h5>
                      {this.state.tags && (
                        <TagPicker
                          initialValue={this.state.tags}
                          onChange={this.handleTagClick}
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
                <div className="col-xl-3 col-md-6 col-sm-12 text-center p-1">
                  <Card>
                    <CardContent>
                      <h5>Publish</h5>
                      <Tooltip title={publishTooltip}>
                        <div>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.publishPost()}
                            disabled={
                              wordCount < 250 || this.state.title === ''
                            }
                          >
                            {(this.props.edit.editmode === 'true' && (
                              <span>
                                Update Post <EditIcon />
                              </span>
                            )) || (
                              <span>
                                Publish Now
                                <PublishIcon />
                              </span>
                            )}
                          </Button>
                        </div>
                      </Tooltip>
                      {this.state.completed !== 0 && (
                        <CircularProgress
                          variant="determinate"
                          value={this.state.completed}
                          className="p-1"
                          size={35}
                          thickness={5}
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

PostEditor.defaultProps = {
  edit: {},
};

PostEditor.propTypes = {
  edit: PropTypes.objectOf(PropTypes.any),
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(PostEditor);
