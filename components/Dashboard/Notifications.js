import React, { Fragment, Component } from "react";
import Helmet from "react-helmet";
import { Query } from "react-apollo";
import { GET_NOTIFICATIONS } from "../../helpers/graphql/posts";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomSnackbar from "../General/CustomSnackbar";
import PropTypes from "prop-types";

class Notifications extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"Notifications | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Query
          query={GET_NOTIFICATIONS}
          variables={{
            author: this.props.user,
            min_curation_score: 5000,
            limit: 10
          }}
        >
          {({ data, loading, error }) => {
            return (
              <Fragment>
                <div className="text-center w-100 pt-4">
                  <h1>Notifications</h1>
                  {loading && (
                    <div className="p-5 text-center">
                      <CircularProgress />
                    </div>
                  )}
                  {(error || data.posts === null) && (
                    <p>Error: Could not load notifications.</p>
                  )}
                  {data.posts && data.posts.length === 0 && (
                    <p>No notifications.</p>
                  )}
                  {data.posts &&
                    data.posts.length > 0 &&
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
                    })}
                </div>
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  user: PropTypes.string
};

export default Notifications;
