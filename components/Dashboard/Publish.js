import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import PublishIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Update';
import WarnIcon from '@material-ui/icons/Warning';
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
import postExists from '../../helpers/postExists';
import { invalidPermlink } from '../../helpers/regex';
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
  const [permlink, setPermlink] = useState('');
  const [permlinkValid, setPermlinkValid] = useState(true);
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

  const sanitized = sanitize(
    parseBody(codeEditor ? content : json2md(content), {
      lazy: false,
      hideimgcaptions: true,
    }),
    { allowedTags: [] },
  );
  const readingtime = content
    ? readingTime(sanitized)
    : { words: 0, text: '0 min' };
  const wordCount = readingtime.words;

  const checklist = [
    {
      label: (
        <span>
          <WarnIcon />
          {'  '}You need to set a title
        </span>
      ),
      hide: title !== '',
      checked: title !== '',
    },
    {
      label: (
        <span>
          <WarnIcon />
          {'  '}You need to set a valid permlink
        </span>
      ),
      hide:
        permlink !== ''
          ? !permlink.match(invalidPermlink) || permlink.length < 2
          : !getSlug(title).match(invalidPermlink) || permlink.length < 2,
      checked:
        permlink !== ''
          ? !permlink.match(invalidPermlink)
          : !getSlug(title).match(invalidPermlink),
    },
    {
      label: (
        <span>
          <WarnIcon />
          {'  '}You need to write more than 250 words
        </span>
      ),
      hide: readingtime.words > 250,
      checked: readingtime.words > 250,
    },
    {
      label: (
        <span>
          <WarnIcon />
          {'  '}You need to select at least 1 more tag
        </span>
      ),
      hide: tags.length > 0,
      checked: tags.length > 0,
    },
    {
      label: (
        <span>
          <WarnIcon />
          {'  '}You need to set a location. If your post is not about a specific
          country/region/place (e.g. &quot;What to pack for travelling&quot;),
          please select &quot;traveladvice&quot; as tag
        </span>
      ),
      hide: location || tags.indexOf('traveladvice') !== -1,
      checked: location || tags.indexOf('traveladvice') !== -1,
    },
    {
      label: (
        <span>
          <WarnIcon />
          {'  '}You cannot set an existing permlink
        </span>
      ),
      hide: permlinkValid,
      checked: permlinkValid,
    },
    {
      label:
        'If you are using any media or text that are not your own, please make sure to get a permission from the owner and leave the source in the post',
    },
    {
      label:
        'You must post in the language selected, without the use of translation tools',
    },
    {
      label: 'Your post must not be a repost of your previous TravelFeed posts',
    },
  ];

  const publishPost = () => {
    if (
      !checklist[0].checked ||
      !checklist[1].checked ||
      !checklist[2].checked ||
      !checklist[3].checked ||
      !checklist[4].checked
    ) {
      newNotification({
        message:
          'Your post does not meet the requirements. Please check the checklist.',
        success: false,
      });
      return;
    }
    if (permlink === '') setPermlink(getSlug(title));
    postExists(getUser(), permlink).then(res => {
      if (res) {
        setPermlinkValid(false);
        newNotification({
          message:
            'The permlink of your post has been used in a previous post. Please change it.',
          success: false,
        });
      } else {
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
        if (!props.edit.editmode) {
          body += `<hr /><center>View this post <a href="https://travelfeed.io/@${username}/${permlink}">on the TravelFeed dApp</a> for the best experience.</center>`;
        }
        if (location !== undefined) {
          metadata.coordinates = [location.latitude, location.longitude];
          if (
            !props.edit.editmode === 'true' ||
            location !== props.edit.location
          ) {
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
      }
    });
  };

  if (completed === 100 && success === true) {
    const url = `${ROOTURL}/@${user}/${permlink}`;
    Router.push(url);
  }

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
                      setTagRecommendations(categoryFinder(sanitized));
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
          <div className="col-12 p-1">
            <DetailedExpansionPanel
              expanded
              title="Featured Image"
              description="The featured image will be used as the post thumbail and as background at the top of your post"
              helper="We recommend selecting an image that is not in your post."
              value={featuredImage ? 'Uploaded' : 'None'}
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
                    <FeaturedImageUpload setFeaturedImage={setFeaturedImage} />
                  )}
                </div>
              }
            />
          </div>
          <div className="col-12 p-1">
            <DetailedExpansionPanel
              expanded
              title="Location"
              description="Drag the marker, use the search field or click on the GPS icon to pick a location"
              helper="The location you set makes it easier for readers to find your post and gives you a chance for extra rewards."
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
          {!props.edit.editmode && (
            <div className="col-12 p-1">
              <DetailedExpansionPanel
                title="Language"
                description="Select the language of your post"
                helper="Only one language can be selected. We encourage you to write separate posts for each language instead of bilingual posts since bilingual posts are often hard to read."
                value={languages.find(lang => lang.code === language).name}
                selector={
                  <LanguageSelector onChange={setLanguage} value={language} />
                }
              />
            </div>
          )}
          <div className="col-12 p-1">
            <DetailedExpansionPanel
              expanded
              title="Tags"
              description="You can set up to 9 custom tags here. Only lowercase letters, numbers and dashes are permitted"
              helper="The first tag is set automatically based on your language selection. Selected tribe tags are highlighted. Use the space key to separeate tags. We do not recommend setting location-based tags since locations are indexed based on your location setting, not by tags."
              value={`${
                language === 'en' ? 'travelfeed' : `${language}-travelfeed`
              }${tags && tags.map((t, i) => `${(i > 0 && '') || ', '}${t}`)}`}
              selector={
                <TagPicker
                  recommendations={tagRecommendations}
                  content={sanitized}
                  defaultTag={
                    language === 'en' ? 'travelfeed' : `${language}-travelfeed`
                  }
                  value={tags}
                  onChange={handleTagClick}
                />
              }
            />
          </div>
          {!props.edit.editmode && (
            <Fragment>
              <div className="col-12 p-1">
                <DetailedExpansionPanel
                  title="Payout Options"
                  description="Choose how to receive your reward"
                  helper="This is an advanced option for experienced Steem-users."
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
              <div className="col-12 p-1">
                <DetailedExpansionPanel
                  title={
                    !permlinkValid ? (
                      <span>
                        <WarnIcon />
                        {'  '}Permlink
                      </span>
                    ) : (
                      <span>Permlink</span>
                    )
                  }
                  description="Only lowercase letter, numbers and dash and a length of 2-255 chracters is permitted"
                  helper="Set a custom permlink here if you are unhappy with the long default permlink or if your permlink is conflicting with an existing post."
                  value={`https://travelfeed.io/@${getUser()}/${permlink ||
                    getSlug(title)}`}
                  selector={
                    <PermlinkInput
                      onChange={pl => {
                        setPermlink(pl);
                        setPermlinkValid(true);
                      }}
                      value={permlink}
                      placeholder={getSlug(title)}
                    />
                  }
                />
              </div>
              <div className="col-12 p-1">
                <DetailedExpansionPanel
                  title="Beneficiaries"
                  description="If you would like to share your rewards for this post with someone else, you can include their username and the percentage they will receive from your author rewards here."
                  helper="This is an advanced option for experienced Steem-users. You will receive less rewards if you set beneficiaries. Only set beneficiaries if you know what you are doing!"
                  value={
                    beneficiaries.length === 0
                      ? 'None'
                      : `${beneficiaries.length} Beneficiar${
                          beneficiaries.length === 1 ? 'y' : 'ies'
                        } set`
                  }
                  selector={
                    <BeneficiaryInput
                      onChange={setBeneficiaries}
                      value={beneficiaries}
                    />
                  }
                />
              </div>
            </Fragment>
          )}
          <div className="col-12 p-1">
            <DetailedExpansionPanel
              fullWidth
              title="Preview"
              value="See how your post will look on TravelFeed"
              selector={
                <EditorPreview
                  img_url={featuredImage}
                  title={title}
                  permlink={permlink}
                  readtime={readingtime}
                  content={codeEditor ? content : json2md(content)}
                  latitude={location ? location.latitude : undefined}
                  longitude={location ? location.longitude : undefined}
                  tags={tags}
                />
              }
            />
          </div>
          <div className="col-12 p-1">
            <DetailedExpansionPanel
              fullWidth
              expanded
              title="Publish"
              value="Publish your post"
              selector={
                <Fragment>
                  <Checks checklist={checklist} />
                  <h5>Save Draft</h5>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => publishPost()}
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
                  {completed !== 0 && (
                    <CircularProgress
                      variant="determinate"
                      value={completed}
                      className="p-1"
                      size={35}
                      thickness={5}
                    />
                  )}
                </Fragment>
              }
            />
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
