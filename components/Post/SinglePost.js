import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import dynamic from "next/dynamic";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import readingTime from "reading-time";
import sanitize from "sanitize-html";
import LazyLoad from "vanilla-lazyload";
import { GET_SETTINGS } from "../../helpers/graphql/settings";
import { GET_POST } from "../../helpers/graphql/singlePost";
import parseBody from "../../helpers/parseBody";
import { getUser } from "../../helpers/token";
import CuratorMenu from "../CuratorMenu/PostMenu";
import InvalidPost from "../General/InvalidPost";
import NotFound from "../General/NotFound";
import Head from "../Header/Head";
import Header from "../Header/Header";
import PostMap from "../Maps/PostMap";
import PostAuthorProfile from "../Profile/PostAuthorProfile";
import OrderBySelect from "./OrderBySelect";
import PostCommentItem from "./PostCommentItem";
import PostComments from "./PostComments";
import PostImageHeader from "./PostImageHeader";
import SubHeader from "./SubHeader";
import VoteSlider from "./VoteSlider";

export class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
  }
  state = {
    title: "Most miles",
    orderby: "total_votes",
    orderdir: "DESC",
    bgpos: "fixed",
    bgheight: "100%",
    bgmargin: "0px",
    userComment: undefined,
    cardWidth: 800
  };
  onCommentAdd(userComment) {
    this.setState({ userComment });
  }
  handleClick(op) {
    this.setState(op);
  }
  componentDidMount() {
    if (this.myInput.current) {
      const cardWidth =
        Math.round(this.myInput.current.offsetWidth / 100) * 100;
      this.setState({ cardWidth });
    }
    if (!document.lazyLoadInstance) {
      document.lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy",
        threshold: 1200
      });
    }
    this.setState({ parent_id: this.props.post_id });
    // Update lazyLoad after first rendering of every image
    document.lazyLoadInstance.update();
  }
  // Update lazyLoad after rerendering of every image
  componentDidUpdate() {
    document.lazyLoadInstance.update();
  }
  render() {
    // Prevent SSR
    const BookmarkIcon = dynamic(() => import("./BookmarkIcon"), {
      ssr: false
    });
    return (
      <Fragment>
        <Query query={GET_POST} variables={this.props.post}>
          {({ data, loading, error }) => {
            if (loading) {
              return (
                <Fragment>
                  <Header />
                  <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justify="center"
                    className="pt-4 pb-4"
                  >
                    <Grid item lg={7} md={8} sm={12} xs={12} />
                  </Grid>
                </Fragment>
              );
            }
            // 404 for error and if post does not exist
            if (error || data.post === null) {
              return (
                <Fragment>
                  <Header />
                  <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justify="center"
                    className="pt-4 pb-4"
                  >
                    <Grid item lg={7} md={8} sm={11} xs={12}>
                      <NotFound statusCode={404} />
                    </Grid>
                  </Grid>
                </Fragment>
              );
            }
            // Don't render invalid posts but return Steempeak link
            // Todo: Display NSFW posts for logged in users based on prefererences
            if (!data.post.is_travelfeed && data.post.depth === 0) {
              const url =
                "https://steempeak.com/@" +
                data.post.author +
                "/" +
                data.post.permlink;
              return <InvalidPost url={url} />;
            }
            // If comment, render comment component
            let card = <Fragment />;
            let head = <Fragment />;
            // Render post
            let htmlBody = parseBody(data.post.body, {
              cardWidth: this.state.cardWidth
            });
            const bodyText = { __html: htmlBody };
            let bodycontent = (
              <div className="postcontent" dangerouslySetInnerHTML={bodyText} />
            );
            let isBacklisted = data.post.is_blacklisted;
            let isNSFW = data.post.is_nsfw;
            if (data.post.is_blacklisted || data.post.is_nsfw) {
              bodycontent = (
                <Query query={GET_SETTINGS}>
                  {({ data, loading, error }) => {
                    if (loading || error) {
                      return <Fragment />;
                    }
                    if (isNSFW && data && !data.preferences.showNSFW) {
                      return (
                        <p>
                          This post has been marked as NSFW. To view it, you
                          need to adjust your preferences.
                        </p>
                      );
                    }
                    if (isBacklisted && data.preferences.useTfBlacklist) {
                      return <p>This post has been removed from TravelFeed.</p>;
                    }
                    return (
                      <div
                        className="postcontent"
                        dangerouslySetInnerHTML={bodyText}
                      />
                    );
                  }}
                </Query>
              );
            }
            const sanitized = sanitize(htmlBody, { allowedTags: [] });
            const readtime = readingTime(sanitized);
            if (data.post.depth > 0) {
              head = (
                <Head
                  title={`Re: ${data.post.root_title} - TravelFeed`}
                  description={excerpt}
                  canonicalUrl={canonicalUrl}
                />
              );
              card = (
                <PostCommentItem
                  loadreplies={false}
                  post={{
                    post_id: data.post.post_id,
                    body: data.post.body,
                    created_at: data.post.created_at,
                    children: data.post.children,
                    author: data.post.author,
                    display_name: data.post.display_name,
                    permlink: data.post.permlink,
                    depth: data.post.depth,
                    total_votes: data.post.total_votes,
                    votes: data.post.votes,
                    parent_author: data.post.parent_author,
                    parent_permlink: data.post.parent_permlink,
                    root_author: data.post.parent_author,
                    root_permlink: data.post.root_permlink,
                    root_title: data.post.root_title
                  }}
                  title={true}
                />
              );
            } else {
              head = (
                <Head
                  title={`${data.post.title} - TravelFeed`}
                  image={data.post.img_url}
                  description={excerpt}
                  canonicalUrl={canonicalUrl}
                />
              );
              card = (
                <div ref={this.myInput}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Link
                          as={`/@${data.post.author}`}
                          href={`/blog?author=${data.post.author}`}
                          passHref
                        >
                          <a>
                            <Avatar
                              className="cpointer"
                              src={`https://steemitimages.com/u/${
                                data.post.author
                              }/avatar/small`}
                              alt={data.post.author}
                            />
                          </a>
                        </Link>
                      }
                      action={
                        <Fragment>
                          <span>{appIcon}</span>
                          <BookmarkIcon
                            author={data.post.author}
                            permlink={data.post.permlink}
                          />
                          <CuratorMenu
                            author={data.post.author}
                            permlink={data.post.permlink}
                          />
                        </Fragment>
                      }
                      title={
                        <Fragment>
                          <Link
                            as={`/@${data.post.author}`}
                            href={`/blog?author=${data.post.author}`}
                            passHref
                          >
                            <a className="text-dark cpointer">
                              <strong>{data.post.display_name}</strong>
                              <span className="text-muted">
                                {" "}
                                @{data.post.author}
                              </span>
                            </a>
                          </Link>
                        </Fragment>
                      }
                      subheader={
                        <SubHeader
                          created_at={data.post.created_at}
                          readtime={readtime}
                        />
                      }
                    />
                    <CardContent>
                      {bodycontent}
                      <hr />
                      {data.post.latitude && (
                        <div className="fullwidth">
                          <div className="text-center">
                            <Typography variant="h5" className="p-2">
                              Post Location:
                            </Typography>
                          </div>
                          <PostMap
                            location={{
                              coordinates: {
                                lat: data.post.latitude,
                                lng: data.post.longitude
                              }
                            }}
                          />
                          <hr />
                        </div>
                      )}
                      <div className="container">
                        <div className="row justify-content-center">
                          <div className="col-lg-6 col-md-9 col-sm12">
                            <PostAuthorProfile author={data.post.author} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <VoteSlider
                      author={data.post.author}
                      permlink={data.post.permlink}
                      votes={data.post.votes}
                      total_votes={data.post.total_votes}
                      tags={data.post.tags}
                      depth={data.post.depth}
                      mode="post"
                      onCommentAdd={this.onCommentAdd.bind(this)}
                    />
                  </Card>
                </div>
              );
            }
            // Don't load comment area  if there are no comments
            let comments = <Fragment />;
            if (data.post.children !== 0) {
              comments = (
                <Fragment>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <OrderBySelect
                      handleClick={this.handleClick.bind(this)}
                      selection={this.state.title || "Most miles"}
                    />
                  </Grid>
                  <PostComments
                    post_id={data.post.post_id}
                    orderby={this.state.orderby || "total_votes"}
                    orderdir={this.state.orderdir || "DESC"}
                    ismain={true}
                  />
                </Fragment>
              );
            }
            // Set the canonical URL to steemit.com by default to avoid duplicate content SEO problems
            let canonicalUrl =
              "https://steemit.com/travelfeed/@" +
              data.post.author +
              "/" +
              data.post.permlink;
            let appIcon = <Fragment />;
            // Set the caninical URL to travelfeed.io if the post was authored through the dApp
            if (data.post.app.split("/")[0] === "travelfeed") {
              canonicalUrl =
                "https://travelfeed.io/@" +
                data.post.author +
                "/" +
                data.post.permlink;
              appIcon = (
                <img
                  width="25"
                  className="mr-1"
                  src="https://travelfeed.io/favicon.ico"
                />
              );
            }
            const excerpt =
              sanitized.substring(0, 180) + `[...] by ${data.post.author}`;
            return (
              <Fragment>
                <Head>
                  <link rel="preconnect" href="https://maps.gstatic.com" />
                </Head>
                {head}
                <Header subheader={data.post.display_name} />
                <div style={{ position: "relative" }}>
                  {data.post.depth === 0 && (
                    <PostImageHeader backgroundImage={data.post.img_url} />
                  )}
                  <div className="w-100" style={{ position: "relative" }}>
                    <Grid
                      container
                      spacing={0}
                      alignItems="center"
                      justify="center"
                    >
                      <Grid item lg={7} md={8} sm={11} xs={12} className="pb-4">
                        {data.post.depth === 0 && (
                          <div className="container">
                            <div
                              className="row"
                              style={{
                                height: "500px"
                              }}
                            >
                              <div className="text-center col my-auto">
                                <Typography
                                  variant="h3"
                                  className="text-light font-weight-bold"
                                  style={{
                                    textShadow: "1px 1px 20px #343A40"
                                  }}
                                >
                                  {data.post.title}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        )}
                        {data.post.depth !== 0 && (
                          <div className="container">
                            <div
                              className="row"
                              style={{
                                height: "50px"
                              }}
                            />
                          </div>
                        )}
                        {card}
                      </Grid>
                      <Grid item lg={6} md={7} sm={11} xs={12} className="pb-2">
                        {// "Fake" display new user comment after submitting comment without refreshing from the API
                        this.state.userComment && (
                          <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            className="pb-2"
                          >
                            <PostCommentItem
                              post={{
                                body: this.state.userComment.body,
                                created_at: new Date(),
                                children: 0,
                                author: getUser(),
                                display_name: "",
                                permlink: this.state.userComment.permlink,
                                depth: this.props.post.depth + 1,
                                total_votes: 0,
                                votes: "",
                                parent_author: "",
                                parent_permlink: "",
                                root_title: ""
                              }}
                            />
                          </Grid>
                        )}
                        {comments}
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

SinglePost.propTypes = {
  post: PropTypes.object,
  post_id: PropTypes.number
};
