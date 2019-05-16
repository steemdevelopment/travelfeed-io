// Todo: Show current mana, ressource credits, upvote worth
import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { GET_USER_STATS } from "../../helpers/graphql/stats";
import { GET_DASHBOARD_POSTS } from "../../helpers/graphql/posts";
import { GET_NOTIFICATIONS } from "../../helpers/graphql/posts";
import RecentEarnings from "./Stats/RecentEarningsChart";
import SmallBox from "./Stats/SmallBox";
import TotalPostsIcon from "@material-ui/icons/Create";
import TotalPayoutIcon from "@material-ui/icons/AttachMoney";
import TotalFeaturedIcon from "@material-ui/icons/Star";
import QualityIcon from "@material-ui/icons/CheckCircle";
import CustomSnackbar from "../General/CustomSnackbar";
import PostsTable from "./Stats/PostsTable";
import {
  cyan,
  orange,
  indigo,
  green,
  teal,
  pink,
  purple,
  lightGreen
} from "@material-ui/core/colors";
import HeaderCard from "../../components/General/HeaderCard";
import Link from "next/link";
import { getUser } from "../../utils/token";

class Stats extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"Dashboard | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Grid container spacing={0} justify="center" className="p-1">
          <Query query={GET_USER_STATS}>
            {({ data, loading, error }) => {
              if (loading || error || data.userstats === null) {
                return <Fragment />;
              }
              return (
                <Fragment>
                  <Grid item className="p-1" lg={3} md={3} sm={6} xs={6}>
                    <SmallBox
                      Icon={TotalPostsIcon}
                      title="Total Posts"
                      value={data.userstats.total_posts}
                      iconColor={purple[600]}
                      boxColor={purple[400]}
                    />
                  </Grid>
                  <Grid item className="p-1" lg={3} md={3} sm={6} xs={6}>
                    <SmallBox
                      Icon={TotalPayoutIcon}
                      title="Total Earnings"
                      value={data.userstats.total_payout}
                      prefix="$"
                      iconColor={cyan[800]}
                      boxColor={cyan[600]}
                    />
                  </Grid>
                  <Grid item className="p-1" lg={3} md={3} sm={6} xs={6}>
                    <SmallBox
                      Icon={TotalFeaturedIcon}
                      title="Featured Posts"
                      value={data.userstats.total_featured}
                      iconColor={orange[600]}
                      boxColor={orange[400]}
                    />
                  </Grid>
                  <Grid item className="p-1" lg={3} md={3} sm={6} xs={6}>
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
                  <Grid item className="p-1" lg={6} md={6} sm={12} xs={12}>
                    <HeaderCard
                      title={`Welcome, ${getUser()}!`}
                      background={green[600]}
                      content={
                        <Fragment>
                          <p>
                            Welcome to &quot;TravelBlog&quot;, your personal
                            TravelFeed Dashboard!
                          </p>
                          <p>
                            Here you can manage everything related to your blog,
                            for example:
                          </p>
                          <ul>
                            <li>
                              <Link href="/dashboard/publish" passHref>
                                <a>Write your next awesome travel post</a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/dashboard/drafts" passHref>
                                <a>
                                  Access your drafts and continue where you left
                                  off
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/dashboard/posts" passHref>
                                <a>View and edit your published posts</a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/dashboard/replies" passHref>
                                <a>
                                  View and answer replies from your followers
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/dashboard/profile" passHref>
                                <a>Edit your profile</a>
                              </Link>
                            </li>
                          </ul>
                          <p>
                            To return to TravelFeed and discover other travel
                            blogs, you can always click on your profile icon on
                            the top right and select &quot;TravelFeed&quot; to{" "}
                            <Link href="/" passHref>
                              <a>return to the feed.</a>
                            </Link>
                          </p>
                        </Fragment>
                      }
                    />
                    <div className="mt-2">
                      <HeaderCard
                        title="Monthly Earnings"
                        background={teal[600]}
                        content={
                          <RecentEarnings
                            color={teal[400]}
                            recent_payouts={data.userstats.recent_payouts}
                          />
                        }
                      />
                    </div>
                  </Grid>
                </Fragment>
              );
            }}
          </Query>
          <Grid item className="p-1" lg={6} md={6} sm={12} xs={12}>
            <Query
              query={GET_DASHBOARD_POSTS}
              variables={{ author: getUser(), limit: 15 }}
            >
              {({ data, loading, error }) => {
                if (loading || error || data.post === null) {
                  return <Fragment />;
                }
                return (
                  <HeaderCard
                    title="Recent Posts"
                    background={indigo[600]}
                    content={<PostsTable data={data.posts} />}
                  />
                );
              }}
            </Query>
            <Query
              query={GET_NOTIFICATIONS}
              variables={{
                author: getUser(),
                min_curation_score: 5000,
                limit: 3
              }}
            >
              {({ data, loading, error }) => {
                if (loading || error || data.post === null) {
                  return <Fragment />;
                }
                return (
                  <div className="mt-2">
                    <HeaderCard
                      title="Notifications"
                      background={lightGreen[600]}
                      content={
                        (data.posts &&
                          data.posts.length === 0 &&
                          "No notifications.") ||
                        data.posts.map((post, index) => {
                          return post.curation_score === 10000 ? (
                            <div
                              key={index}
                              className="d-flex justify-content-center p-2"
                            >
                              <CustomSnackbar
                                variant="success"
                                message={`Your post ${post.title}
                        was selected to be featured on the front page! Keep
                        up the great work!`}
                              />
                            </div>
                          ) : (
                            <div
                              key={index}
                              className="d-flex justify-content-center p-2"
                            >
                              <CustomSnackbar
                                variant="info"
                                message={`Your post ${post.title}
                        received a small vote by our curation team! Good job!`}
                              />
                            </div>
                          );
                        })
                      }
                    />
                  </div>
                  // Todo: Card for recent drafts
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
