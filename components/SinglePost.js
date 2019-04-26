import { Query } from "react-apollo";
import React, { Fragment, Component } from "react";
import { GET_POST } from "../helpers/graphql/singlePost";
import Head from "./Head";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import VoteSlider from "./VoteSlider";
import Header from "./Header";
import NotFound from "./NotFound";
import InvalidPost from "../components/InvalidPost";
import BookmarkIcon from "./Post/BookmarkIcon";
import PostAuthorProfile from "./PostAuthorProfile";
import PostMap from "../components/PostMap";
import PostComments from "./PostComments";
import sanitize from "sanitize-html";
import readingTime from "reading-time";
import parseBody from "../helpers/parseBody";
import IsCurated from "./IsCurated";
import SubHeader from "./Post/SubHeader";

export class SinglePost extends Component {
  render() {
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
            if (error || data.post === null || data.post.is_blacklisted) {
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
            // Don't render invalid posts but return Steemit link
            if (!data.post.is_travelfeed || data.post.is_nsfw) {
              const url =
                "https://steemit.com/@" +
                data.post.author +
                "/" +
                data.post.permlink;
              return <InvalidPost url={url} />;
            }
            // Render post
            const htmlBody = parseBody(data.post.body, {});
            const bodyText = { __html: htmlBody };
            const sanitized = sanitize(htmlBody, { allowedTags: [] });
            const readtime = readingTime(sanitized);
            // Todo: New Date function
            // const json_date = '{ "date": "' + data.post.created_at + 'Z" }';
            // const date_object = new Date(
            //   JSON.parse(json_date, dateFromJsonString).date
            // );
            // const created = date_object.toDateString();
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
                <Head
                  title={data.post.title}
                  image={data.post.img_url}
                  description={excerpt}
                  canonicalUrl={canonicalUrl}
                />
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
                            <span>{appIcon}</span>
                            <IsCurated
                              votes={data.post.curation_score}
                              author={data.post.author}
                              permlink={data.post.permlink}
                            />
                            <BookmarkIcon />
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
                        author={data.post.author}
                        permlink={data.post.permlink}
                        votes={data.post.votes}
                        total_votes={data.post.total_votes}
                        tags={data.post.tags}
                        mode="post"
                      />
                    </Card>
                  </Grid>
                  <Grid item lg={6} md={7} sm={11} xs={12} className="pb-2">
                    <PostComments post_id={data.post.post_id} />
                  </Grid>
                </Grid>
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

SinglePost.propTypes = {
  post: PropTypes.object
};
