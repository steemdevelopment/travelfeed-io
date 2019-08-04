import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Update';
import Router from 'next/router';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import readingTime from 'reading-time';
import sanitize from 'sanitize-html';
import getSlug from 'speakingurl';
import { APP_VERSION, ROOTURL } from '../../config';
import { comment } from '../../helpers/actions';
import categoryFinder from '../../helpers/categoryFinder';
import { SAVE_DRAFT } from '../../helpers/graphql/drafts';
import json2md from '../../helpers/json2md';
import md2json from '../../helpers/md2json';
import parseBody from '../../helpers/parseBody';
import {
  getImageList,
  getLinkList,
  getMentionList,
} from '../../helpers/parsePostContents';
import { getUser } from '../../helpers/token';
import BeneficiaryInput from '../Editor/BeneficiaryInput';
import Checks from '../Editor/Checks';
import DetailedExpansionPanel from '../Editor/DetailedExpansionPanel';
// import Editor from 'rich-markdown-editor';
import EasyEditor from '../Editor/EasyEditor';
import EditorPreview from '../Editor/EditorPreview';
import FeaturedImageUpload from '../Editor/FeaturedImageUpload';
import HtmlEditor from '../Editor/HTMLEditor';
import LanguageSelector, { languages } from '../Editor/LanguageSelector';
import LocationPicker from '../Editor/LocationPicker';
import PayoutTypeSelector from '../Editor/PayoutTypeSelector';
import PermlinkInput from '../Editor/PermlinkInput';
import SwitchEditorModeButton from '../Editor/SwitchEditorModeButton';
import TagPicker from '../Editor/TagPicker';

const PostEditor = props => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [location, setLocation] = useState(undefined);
  const [locationCategory, setLocationCategory] = useState(undefined);
  const [codeEditor, setCodeEditor] = useState(true);
  const [saved, setSaved] = useState(true);
  const [featuredImage, setFeaturedImage] = useState([]);
  const [user, setUser] = useState(undefined);
  const [permlink, setPermlink] = useState(undefined);
  const [id, setId] = useState(undefined);
  const [mounted, setMounted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [poweredUp, setPoweredUp] = useState(false);
  const [language, setLanguage] = useState('en');
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [tagRecommendations, setTagRecommendations] = useState([]);

  useEffect(() => {
    const json =
      props.edit.json && props.edit.json !== 'undefined'
        ? JSON.parse(props.edit.json)
        : undefined;
    setTitle(props.edit.title ? props.edit.title : '');
    setContent(props.edit.body ? props.edit.body : '');
    setCodeEditor(props.edit.body !== undefined);
    setTags(json && json.tags ? json.tags : []);
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

  const handleTagClick = taglist => {
    setTags(taglist);
  };

  const handleEditorChange = value => {
    setContent(value);
  };

  const handleHtmlEditorChange = ({ text }) => {
    if (!saved) setContent(text);
  };

  const handleTitleEditorChange = changedtitle => {
    setTitle(changedtitle.target.value);
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(undefined);
  };

  const changeEditorMode = () => {
    if (!codeEditor) setContent(json2md(content));
    else setContent(md2json(content));
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

  const sanitized = sanitize(
    parseBody(codeEditor ? content : json2md(content), {}),
    { allowedTags: [] },
  );
  const readingtime = content
    ? readingTime(sanitized)
    : { words: 0, text: '0 min' };
  const wordCount = readingtime.words;
  const readTime = readingtime.text;
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
                      setTagRecommendations(categoryFinder(content));
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
                              <EasyEditor
                                onChange={handleEditorChange}
                                data={content}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }}
                </Mutation>
                <div className="text-right">
                  <SwitchEditorModeButton
                    switchMode={() => changeEditorMode()}
                    codeEditor={codeEditor}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-12 pt-1">
            <div className="row">
              <div className="col-12 text-center">
                <Typography gutterBottom variant="h3">
                  Options
                </Typography>
              </div>
              <div className="col-12 pt-1">
                <DetailedExpansionPanel
                  expanded
                  title="Featured Image"
                  description="Select the featured image"
                  helper="The featured image will be displayed as the post thumbail as well as as background. We recommend selecting an image that is not in your post."
                  value={featuredImage}
                  selector={
                    <div>
                      {featuredImage && (
                        <CardMedia
                          className="h-100"
                          style={{ minHeight: '200px' }}
                          image={featuredImage}
                        />
                      )}
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
                    </div>
                  }
                />
              </div>
              <div className="col-12 pt-1">
                {console.log(locationCategory)}
                <DetailedExpansionPanel
                  expanded
                  title="Location"
                  description="Select the location of your post"
                  helper="Drag the marker, use the search field or click on the GPS icon to pick a location."
                  value={
                    location &&
                    `${location.latitude}, ${location.longitude} ${
                      locationCategory ? `[${locationCategory}]` : ''
                    }`
                  }
                  selector={
                    <div className="w-100">
                      <LocationPicker
                        locationCategory={locationCategory}
                        setLocationCategory={setLocationCategory}
                        setLocation={setLocation}
                        value={location}
                      />
                    </div>
                  }
                />
              </div>
              <div className="col-12 pt-1">
                <DetailedExpansionPanel
                  expanded={false}
                  title="Language"
                  description="Select the language of your post"
                  helper="Please select the language of your post here. Only one language can be selected. We encourage you to write separate posts instead of bilingual."
                  value={languages.find(lang => lang.code === language).name}
                  selector={
                    <LanguageSelector onChange={setLanguage} value={language} />
                  }
                />
              </div>
              <div className="col-12 pt-1">
                <DetailedExpansionPanel
                  expanded
                  title="Tags"
                  description="Tags are set automatically based on your language and category selection. Tribe tags are highlighted. If you are not happy with that, you can set up to 10 custom tags here."
                  helper="Tribe tags are highlighted. Only lowercase letters, numbers and hyphen characters are permitted. Use the space key to separeate tags. We do not recommend setting location-based tags since locations are indexed by coordinates, not by tags."
                  value={`${language}-travelfeed${tags &&
                    tags.map((t, i) => `${(i > 0 && '') || ', '}${t}`)}`}
                  selector={
                    <TagPicker
                      recommendations={tagRecommendations}
                      content={sanitized}
                      defaultTag={
                        language === 'en'
                          ? 'travelfeed'
                          : `${language}-travelfeed`
                      }
                      value={tags}
                      onChange={handleTagClick}
                    />
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <Typography gutterBottom variant="h3">
                  Advanced Options
                </Typography>
              </div>
              <div className="col-12 pt-1">
                <DetailedExpansionPanel
                  expanded={false}
                  title="Payout Options"
                  description="Choose how to receive your reward"
                  helper="..."
                  value={
                    poweredUp
                      ? '100% Steem Power'
                      : '50% liquid SBD/STEEM and 50% Steem Power'
                  }
                  selector={
                    <PayoutTypeSelector
                      onChange={setPoweredUp}
                      value={poweredUp}
                    />
                  }
                />
              </div>
              <div className="col-12 pt-1">
                <DetailedExpansionPanel
                  expanded={false}
                  title="Permlink"
                  description="Don't like the long link? Set a custom link here!"
                  helper="..."
                  value={`https://travelfeed.io/@jpphotography/${permlink ||
                    getSlug(title)}`}
                  selector={
                    <PermlinkInput
                      onClickOut={setPermlink}
                      value={permlink}
                      placeholder={getSlug(title)}
                    />
                  }
                />
              </div>
              <div className="col-12 pt-1">
                <DetailedExpansionPanel
                  expanded={false}
                  title="Beneficiaries"
                  description="If you would like to share your rewards for this post with someone else, you can include their username here."
                  helper="..."
                  value={
                    beneficiaries.length === 0
                      ? 'None'
                      : `${beneficiaries.length} Beneficiaries set`
                  }
                  selector={
                    <BeneficiaryInput
                      onChange={setBeneficiaries}
                      value={beneficiaries}
                    />
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <Typography gutterBottom variant="h3">
                  Review & Publish
                </Typography>
              </div>
              <div className="col-12 pt-1">
                Checks (hide these on edit)
                <Checks />
              </div>
              <div className="col-12 pt-1">
                Preview
                <EditorPreview
                  img_url={featuredImage}
                  title={title}
                  permlink={permlink}
                  readtime={{ words: 1337, text: '0 min' }}
                  content={content}
                  latitude={location ? location.latitude : undefined}
                  longitude={location ? location.longitude : undefined}
                  tags={tags}
                />
              </div>
              <div className="col-xl-3 col-md-6 col-sm-12 text-center p-1">
                <Card>
                  <CardContent>
                    <h5>Save Draft</h5>
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
