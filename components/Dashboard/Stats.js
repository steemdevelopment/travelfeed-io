// Todo: Show current mana, ressource credits, upvote worth
import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
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
  cyan,
  orange,
  indigo,
  teal,
  pink,
  purple,
  lightGreen
} from "@material-ui/core/colors";
import CardHeader from "@material-ui/core/CardHeader";
import WelcomeCard from "./Stats/WelcomeCard";

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
                    <WelcomeCard user={this.props.user} />
                    <Card className="mt-2">
                      <CardHeader
                        style={{ background: teal[600] }}
                        title={
                          <Typography
                            variant="h4"
                            align="center"
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
          <Grid item className="p-1" lg={6} md={6} sm={12} xs={12}>
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
                          variant="h4"
                          align="center"
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
                  <Card className="mt-2">
                    <CardHeader
                      style={{ background: lightGreen[600] }}
                      title={
                        <Typography
                          variant="h4"
                          align="center"
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
