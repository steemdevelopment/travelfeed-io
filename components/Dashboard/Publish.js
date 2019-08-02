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
import React, { Fragment, useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import readingTime from 'reading-time';
import Editor from 'rich-markdown-editor';
import sanitize from 'sanitize-html';
import getSlug from 'speakingurl';
import { APP_VERSION, ROOTURL } from '../../config';
import { comment } from '../../helpers/actions';
import { SAVE_DRAFT } from '../../helpers/graphql/drafts';
import uploadFile from '../../helpers/imageUpload';
import {
  getImageList,
  getLinkList,
  getMentionList,
} from '../../helpers/parsePostContents';
import { getUser } from '../../helpers/token';
import FeaturedImageUpload from '../Editor/FeaturedImageUpload';
import HtmlEditor from '../Editor/HTMLEditor';
import LocationPicker from '../Editor/LocationPickerButton';
import SwitchEditorModeButton from '../Editor/SwitchEditorModeButton';
import TagPicker from '../Editor/TagPicker';
import PostMap from '../Maps/PostMap';

const PostEditor = props => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(undefined);
  const [tags, setTags] = useState(undefined);
  const [completed, setCompleted] = useState(0);
  const [location, setLocation] = useState(undefined);
  const [codeEditor, setCodeEditor] = useState(true);
  const [saved, setSaved] = useState(true);
  const [featuredImage, setFeaturedImage] = useState([]);
  const [user, setUser] = useState(undefined);
  const [permlink, setPermlink] = useState(undefined);
  const [id, setId] = useState(undefined);
  const [mounted, setMounted] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const json =
      props.edit.json && props.edit.json !== 'undefined'
        ? JSON.parse(props.edit.json)
        : undefined;
    setTitle(props.edit.title ? props.edit.title : '');
    setContent(props.edit.body ? props.edit.body : '');
    // setCodeEditor(props.edit.body !== undefined);
    setTags(json && json.tags ? json.tags : ['travelfeed']);
    setLocation(json && json.location ? json.location : undefined);
    setFeaturedImage(
      json && json.featuredImage ? json.featuredImage : undefined,
    );
    setId(
      props.edit.id
        ? props.edit.id
        : `${getUser()}-${getSlug(new Date().toJSON()).replace(/-/g, '')}`,
    );
    setMounted(true);
    // Save draft every 20 seconds
    const interval = setInterval(() => setSaved(false), 20000);

    return () => {
      // "will unmount": stop saving drafts
      clearInterval(interval);
    };
  }, []);

  const handleTagClick = op => {
    setTags(op);
  };

  const handleEditorChange = value => {
    const text = value();
    setContent(text);
  };

  const handleHtmlEditorChange = ({ text }) => {
    setContent(text);
  };

  const handleTitleEditorChange = changedtitle => {
    setTitle(changedtitle.target.value);
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(undefined);
  };

  const changeEditorMode = () => {
    setCodeEditor(!codeEditor);
  };

  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      props.enqueueSnackbar(notification.message, { variant });
      if (notification.success === true) {
        setSuccess(true);
      }
    }
  };

  const publishPost = () => {
    const username = getUser();
    const parentAuthor = '';
    const parentPermlink = 'travelfeed';
    setPermlink(getSlug(title));
    let body = content;
    const imageList = featuredImage.concat(getImageList(body));
    const linkList = getLinkList(body);
    const mentionList = getMentionList(body);
    const metadata = {};
    metadata.tags = tags;
    metadata.app = APP_VERSION;
    metadata.community = 'travelfeed';
    if (imageList !== null) metadata.image = imageList;
    if (linkList !== null) metadata.links = linkList;
    if (mentionList !== null) metadata.users = mentionList;
    if (!props.edit.editmode === 'true') {
      body += `<hr /><center>View this post <a href="https://travelfeed.io/@${username}/${permlink}">on the TravelFeed dApp</a> for the best experience.</center>`;
    }
    if (location !== undefined) {
      metadata.coordinates = [location.latitude, location.longitude];
      if (!props.edit.editmode === 'true' || location !== props.edit.location) {
        body += `\n\n[//]:# (!steemitworldmap ${location.latitude} lat ${location.longitude} long  d3scr)`;
      }
    }
    // Todo: Parse body for images and links and include them
    // in the json_metadata
    if (props.edit.editmode === 'true') {
      setPermlink(props.edit);
    }
    setUser(username);
    setPermlink(permlink);
    // Steemconnect broadcast
    return comment(
      parentAuthor,
      parentPermlink,
      permlink,
      title,
      body,
      metadata,
      'post',
    ).then(res => {
      if (res) {
        newNotification(res);
      }
    });
  };

  const sanitized = content ? sanitize(content, { allowedTags: [] }) : '';
  let wordCount = '';
  let readTime = '';
  const readingtime = content
    ? readingTime(sanitized)
    : { words: 0, text: '0 min' };
  wordCount = readingtime.words;
  readTime = readingtime.text;
  if (completed === 100 && success === true) {
    const url = `${ROOTURL}/@${user}/${permlink}`;
    Router.push(url);
  }
  const publishTooltip =
    wordCount < 250 || title === ''
      ? 'You need to write at least 250 words and set a title before you can publish your post'
      : 'Once published, your post cannot be deleted';
  return (
    <Fragment>
      <div className="container-fluid p-4">
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
                  value={title}
                  onChange={handleTitleEditorChange}
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
                    id,
                    title,
                    body: content,
                    json: JSON.stringify({
                      tags,
                      location,
                      featuredImage,
                    }),
                  }}
                >
                  {saveDraft => {
                    if (!saved) {
                      if (wordCount > 1) saveDraft();
                      setSaved(true);
                    }
                    return (
                      <div>
                        {(codeEditor && mounted && (
                          <Fragment>
                            <HtmlEditor
                              data={content}
                              onChange={handleHtmlEditorChange}
                            />
                          </Fragment>
                        )) || (
                          <div>
                            {mounted && (
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
                                onChange={handleEditorChange}
                                defaultValue={content}
                                autoFocus
                              />
                            )}
                          </div>
                        )}
                        <div className="text-right">
                          <SwitchEditorModeButton
                            switchMode={() => changeEditorMode()}
                            codeEditor={codeEditor}
                          />
                        </div>
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
                  {featuredImage && (
                    <CardMedia
                      className="h-100"
                      style={{ minHeight: '200px' }}
                      image={featuredImage}
                    />
                  )}
                  <CardContent className="text-center">
                    <h5>Featured Image</h5>
                    {(featuredImage && (
                      <Button
                        variant="contained"
                        color="secondary"
                        component="span"
                        onClick={removeFeaturedImage}
                      >
                        Remove Image <DeleteIcon />
                      </Button>
                    )) || (
                      <FeaturedImageUpload
                        setFeaturedImage={setFeaturedImage}
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
                      {location &&
                        `: ${location.latitude}, ${location.longitude}`}
                    </h5>
                    {location && (
                      <PostMap
                        location={{
                          coordinates: {
                            lat: location.latitude,
                            lng: location.longitude,
                          },
                        }}
                      />
                    )}
                    <div className="text-center p-1">
                      <LocationPicker
                        onPick={setLocation}
                        isChange={location}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="col-xl-3 col-md-6 col-sm-12 p-1">
                <Card>
                  <CardContent>
                    <h5 className="text-center">Tags</h5>
                    {tags && (
                      <TagPicker
                        initialValue={tags}
                        onChange={handleTagClick}
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
                          onClick={() => publishPost()}
                          disabled={wordCount < 250 || title === ''}
                        >
                          {(props.edit.editmode === 'true' && (
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
                    {completed !== 0 && (
                      <CircularProgress
                        variant="determinate"
                        value={completed}
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
};

PostEditor.defaultProps = {
  edit: {},
};

PostEditor.propTypes = {
  edit: PropTypes.objectOf(PropTypes.any),
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(PostEditor);
