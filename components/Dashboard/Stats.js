//  Masonry css: https://github.com/jh3y/driveway
// Todo: Show current mana, ressource credits, upvote worth
import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import Link from "next/link";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { GET_USER_STATS } from "../../helpers/graphql/stats";
import { GET_DASHBOARD_POSTS } from "../../helpers/graphql/posts";
import { GET_NOTIFICATIONS } from "../../helpers/graphql/posts";
import Typography from "@material-ui/core/Typography";
import RecentEarnings from "./Stats/RecentEarningsChart";
import SmallBox from "./Stats/SmallBox";
import TotalPostsIcon from "@material-ui/icons/Create";
import TotalPayoutIcon from "@material-ui/icons/AttachMoney";
import TotalFeaturedIcon from "@material-ui/icons/Star";
import QualityIcon from "@material-ui/icons/CheckCircle";
import CustomSnackbar from "../General/CustomSnackbar";
import PostsTable from "./Stats/PostsTable";

import {
  green,
  orange,
  indigo,
  teal,
  pink,
  purple,
  lightGreen
} from "@material-ui/core/colors";
import CardHeader from "@material-ui/core/CardHeader";

class Stats extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"Dashboard | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Grid
          container
          spacing={8}
          alignItems="center"
          justify="center"
          className="p-2"
        >
          <Query query={GET_USER_STATS}>
            {({ data, loading, error }) => {
              if (loading || error || data.userstats === null) {
                return <Fragment />;
              }
              return (
                <Fragment>
                  <Grid item lg={3} md={3} sm={6} xs={6}>
                    <SmallBox
                      Icon={TotalPostsIcon}
                      title="Total Posts"
                      value={data.userstats.total_posts}
                      iconColor={purple[600]}
                      boxColor={purple[400]}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xs={6}>
                    <SmallBox
                      Icon={TotalPayoutIcon}
                      title="Total Earnings"
                      value={data.userstats.total_payout}
                      prefix="$"
                      iconColor={orange[600]}
                      boxColor={orange[400]}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xs={6}>
                    <SmallBox
                      Icon={TotalFeaturedIcon}
                      title="Featured Posts"
                      value={data.userstats.total_featured}
                      iconColor={green[600]}
                      boxColor={green[400]}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xs={6}>
                    <SmallBox
                      Icon={QualityIcon}
                      title="Quality Score"
                      value={Math.floor(
                        (data.userstats.total_featured /
                          data.userstats.total_posts) *
                          100
                      )}
                      prefix="%"
                      iconColor={pink[600]}
                      boxColor={pink[400]}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card>
                      <CardContent>
                        <h1>Welcome {this.props.user}!</h1>
                        <p>Welcome to your personal TravelFeed Dashboard!</p>
                        <p>For now, you can:</p>
                        <ul>
                          <li>
                            <Link
                              as="/dashboard/publish"
                              href="/dashboard?page=publish"
                              passHref
                            >
                              <a>Write a new post</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              as="/dashboard/posts"
                              href="/dashboard?page=posts"
                              passHref
                            >
                              <a>View and edit your published posts</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              as="/dashboard/comments"
                              href="/dashboard?page=comments"
                              passHref
                            >
                              <a>View your comments</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              as="/dashboard/replies"
                              href="/dashboard?page=replies"
                              passHref
                            >
                              <a>View replies to you</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              as="/dashboard/profile"
                              href="/dashboard?page=profile"
                              passHref
                            >
                              <a>Edit your profile</a>
                            </Link>
                          </li>
                        </ul>
                        <p>
                          Or,{" "}
                          <Link href="/" passHref>
                            <a>return to the main app</a>
                          </Link>{" "}
                          to discover great travel content.
                        </p>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card>
                      <CardHeader
                        style={{ background: teal[600] }}
                        title={
                          <Typography
                            variant="h5"
                            align="center"
                            gutterBottom={true}
                            className="p-2 text-light"
                          >
                            Monthly Earnings
                          </Typography>
                        }
                      />
                      <CardContent>
                        <RecentEarnings
                          color={teal[400]}
                          recent_payouts={data.userstats.recent_payouts}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Fragment>
              );
            }}
          </Query>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Query
              query={GET_DASHBOARD_POSTS}
              variables={{ author: this.props.user, limit: 15 }}
            >
              {({ data, loading, error }) => {
                if (loading || error || data.post === null) {
                  return <Fragment />;
                }
                return (
                  <Card>
                    <CardHeader
                      style={{ background: indigo[600] }}
                      title={
                        <Typography
                          variant="h5"
                          align="center"
                          gutterBottom={true}
                          className="p-2 text-light"
                        >
                          Recent Posts
                        </Typography>
                      }
                    />
                    <CardContent>
                      <PostsTable data={data.posts} />
                    </CardContent>
                  </Card>
                );
              }}
            </Query>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Query
              query={GET_NOTIFICATIONS}
              variables={{
                author: this.props.user,
                min_curation_score: 5000,
                limit: 3
              }}
            >
              {({ data, loading, error }) => {
                if (loading || error || data.post === null) {
                  return <Fragment />;
                }
                return (
                  <Card>
                    <CardHeader
                      style={{ background: lightGreen[600] }}
                      title={
                        <Typography
                          variant="h5"
                          align="center"
                          gutterBottom={true}
                          className="p-2 text-light"
                        >
                          Notifications
                        </Typography>
                      }
                    />
                    <CardContent>
                      {(data.posts &&
                        data.posts.length === 0 &&
                        "No notifications.") ||
                        data.posts.map(post => {
                          return post.curation_score === 10000 ? (
                            <div className="d-flex justify-content-center p-2">
                              <CustomSnackbar
                                variant="success"
                                message={`Your post ${post.title}
                                was selected to be featured on the front page! Keep
                                up the great work!`}
                              />
                            </div>
                          ) : (
                            <CustomSnackbar
                              variant="info"
                              message={`Your post ${post.title}
                                received a small vote by our curation team! Good job!`}
                            />
                          );
                        })}
                    </CardContent>
                  </Card>
                );
              }}
            </Query>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Stats.propTypes = {
  user: PropTypes.string
};

export default Stats;
