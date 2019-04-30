// https://material-ui.com/demos/snackbars/#snackbars

import React, { Fragment, Component } from "react";
import Helmet from "react-helmet";
import { Query } from "react-apollo";
import { GET_NOTIFICATIONS } from "../../helpers/graphql/posts";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import InfoIcon from "@material-ui/icons/Info";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import classNames from "classnames";
import PropTypes from "prop-types";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

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
                    data.posts.map(post => {
                      return post.curation_score === 10000 ? (
                        <div className="d-flex justify-content-center p-2">
                          <MySnackbarContentWrapper
                            variant="success"
                            message={`Your post ${post.title}
                            was selected to be featured on the front page! Keep
                            up the great work!`}
                          />
                        </div>
                      ) : (
                        <MySnackbarContentWrapper
                          variant="info"
                          message={`Your post ${post.title}
                            received a small vote by our curation team! Good job!`}
                        />
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
