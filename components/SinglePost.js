import { Query } from "react-apollo";
import React, { Fragment } from "react";
import { GET_POSTS } from "../helpers/graphql/singlePost";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Helmet from "react-helmet";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import BookmarkIconBorder from "@material-ui/icons/BookmarkBorder";
import VoteSlider from "../components/VoteSlider";
import Header from "../components/Header";
import NotFound from "../components/NotFound";
import InvalidPost from "../components/InvalidPost";
import AppIcon from "../components/AppIcon";
import getImage from "../helpers/getImage";
import isBlacklisted from "../helpers/isBlacklisted";
import PostAuthorProfile from "../components/PostAuthorProfile";
import PostMap from "../components/PostMap";
import dateFromJsonString from "../helpers/dateFromJsonString";
import PostComments from "../components/PostComments";
import sanitize from "sanitize-html";
import readingTime from "reading-time";
import FollowButton from "../components/FollowButton";
import parseBody from "../helpers/parseBody";
import IsCurated from "../components/IsCurated";

export const SinglePost = React.forwardRef((props, ref) => (
  <Fragment ref={ref}>
    <Query query={GET_POSTS}>
      {({ data, loading, error }) => {
        if (loading) {
          return "Loading...";
        }
        if (error) {
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
        if (
          data.post.is_travelfeed === false ||
          data.post.is_nsfw === true ||
          isBlacklisted(data.post.author, data.post.permlink, {})
        ) {
          const url =
            "https://steemit.com/@" +
            data.post.author +
            "/" +
            data.post.permlink;
          return <InvalidPost url={url} />;
        }
        let htmlBody = parseBody(data.post.body, {});
        const bodyText = { __html: htmlBody };
        let sanitized = sanitize(htmlBody, { allowedTags: [] });
        const readtime = readingTime(sanitized);
        const json_date = '{ "date": "' + data.post.created_at + 'Z" }';
        const date_object = new Date(
          JSON.parse(json_date, dateFromJsonString).date
        );
        const created = date_object.toDateString();
        const image = getImage(data.post.img_url, data.post.body, "1000x0");
        // Set the canonical URL to steemit.com by default to avoid duplicate content SEO problems
        let canonicalUrl =
          "https://steemit.com/travelfeed/@" +
          data.post.author +
          "/" +
          data.post.permlink;
        // Set the caninical URL to travelfeed.io if the post was authored through the dApp
        if (data.post.app == "travelfeed") {
          canonicalUrl =
            "https://travelfeed.io/@" +
            data.post.author +
            "/" +
            data.post.permlink;
        }
        let excerpt =
          sanitized.substring(0, 143) + `[...] by ${data.post.author}`;
        return (
          <Fragment>
            <Helmet>
              <title>
                {data.post.title +
                  " - " +
                  data.post.author +
                  "'s Blog on TravelFeed"}
              </title>
              <link rel="canonical" href={canonicalUrl} />
              <meta property="description" content={excerpt} />
              <meta
                property="og:title"
                content={data.post.title + " - TravelFeed"}
              />
              <meta property="og:type" content="article" />
              <meta
                property="og:url"
                content={
                  "https://travelfeed.io/@" +
                  data.post.author +
                  "/" +
                  data.post.permlink
                }
              />
              <meta property="og:image" content={image} />
              <meta property="og:description" content={excerpt} />
              <meta
                property="twitter:card"
                content={image ? "summary_large_image" : "summary"}
              />
              <meta
                property="twitter:title"
                content={data.post.title + " - TravelFeed"}
              />
              <meta property="twitter:description" content={excerpt} />
              <meta property="twitter:image" content={image} />
            </Helmet>
            <Header subheader={data.post.author} />
            <Grid
              container
              spacing={0}
              className="pt-4"
              alignItems="center"
              justify="center"
            >
              <Grid item lg={7} md={8} sm={11} xs={12} className="pb-4">
                <Card>
                  <CardHeader
                    avatar={
                      <Link
                        as={`/@${data.post.author}`}
                        href={`/blog?author=${data.post.author}`}
                        passHref
                        prefetch
                      >
                        <a>
                          <Avatar
                            className="cpointer"
                            src={`https://steemitimages.com/u/${
                              data.post.author
                            }/avatar/small`}
                          />
                        </a>
                      </Link>
                    }
                    action={
                      <Fragment>
                        <IconButton>
                          <BookmarkIconBorder />
                        </IconButton>
                        <AppIcon is_travelfeed={data.post.is_travelfeed} />
                        <IsCurated
                          votes={data.post.curation_score}
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
                            {data.post.author}
                          </a>
                        </Link>
                        <FollowButton
                          author={data.post.author}
                          btnstyle="minimal"
                        />
                      </Fragment>
                    }
                    subheader={created + " | " + readtime.text}
                  />
                  <CardContent>
                    <Typography
                      variant="h4"
                      className="text-dark font-weight-bold"
                    >
                      {data.post.title}
                    </Typography>
                    <hr />
                    <div
                      className="postcontent"
                      dangerouslySetInnerHTML={bodyText}
                    />
                    <hr />
                    <div className="fullwidth">
                      <PostMap
                        location={{
                          coordinates: {
                            lat: data.post.latitude,
                            lng: data.post.longitude
                          }
                        }}
                      />
                    </div>
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-9 col-sm12">
                          <PostAuthorProfile author={data.post.author} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <VoteSlider
                    post={data.post}
                    tags={data.post.tags}
                    mode="post"
                  />
                </Card>
              </Grid>
              <Grid item lg={6} md={7} sm={10} xs={11} className="pb-2">
                <PostComments
                  author={data.post.author}
                  permlink={data.post.permlink}
                />
              </Grid>
            </Grid>
          </Fragment>
        );
      }}
    </Query>
  </Fragment>
));
