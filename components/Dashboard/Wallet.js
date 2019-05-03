import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import { Query } from "react-apollo";
import { GET_USER_STATS } from "../../helpers/graphql/stats";
import RecentEarnings from "./Stats/RecentEarningsChart";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  green,
  orange,
  indigo,
  teal,
  pink,
  purple,
  lightGreen
} from "@material-ui/core/colors";

class Wallet extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"Wallet | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Grid container spacing={0} justify="center" className="p-1">
          <Query query={GET_USER_STATS}>
            {({ data, loading, error }) => {
              if (loading || error || data.userstats === null) {
                return <Fragment />;
              }
              return (
                <Fragment>
                  <Grid item className="p-1" lg={6} md={6} sm={12} xs={12}>
                    <Card>
                      <CardHeader
                        style={{ background: purple[600] }}
                        title={
                          <Typography
                            variant="h4"
                            align="center"
                            className="p-2 text-light"
                          >
                            Wallet
                          </Typography>
                        }
                      />
                      <CardContent>
                        <p>
                          You have earned{" "}
                          <strong>${data.userstats.total_payout}</strong> with
                          your TravelBlog so far.
                        </p>
                        <p>
                          For now, you need to use steemit wallet to transfer
                          and power up your earnings.
                        </p>
                        <a
                          href="https://steemitwallet.com/"
                          target="_blank"
                          rel="nofollow noreferrer noopener"
                        >
                          <Button variant="contained" color="primary">
                            Go to steemit wallet
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item className="p-1" lg={6} md={6} sm={12} xs={12}>
                    <Card>
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
        </Grid>
      </Fragment>
    );
  }
}

export default Wallet;
