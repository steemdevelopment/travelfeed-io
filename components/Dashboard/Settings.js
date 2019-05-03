// Todo: Add Settings Mutation/Query
// Todo: Replace  helmet everywhere
import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import { Mutation, Query } from "react-apollo";
import { GET_SETTINGS, CHANGE_SETTINGS } from "../../helpers/graphql/settings";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import { withSnackbar } from "notistack";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { deepOrange } from "@material-ui/core/colors";

const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Settings extends Component {
  state = {
    loaded: false,
    saved: true,
    defaultVoteWeight: 0,
    defaultCommentsVoteWeight: 0,
    showNSFW: false,
    useTfBlacklist: true
  };
  newNotification(notification) {
    if (notification != undefined) {
      let variant = "success";
      if (notification.success === false) {
        variant = "error";
      }
      this.props.enqueueSnackbar(notification.message, { variant });
      if (notification.success === true) {
        this.setState({ success: true });
      }
    }
  }
  handleCheckboxChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  setDefaultCommentsVoteWeight = value => {
    this.setState({ defaultCommentsVoteWeight: value });
  };
  setDefaultVoteWeight = value => {
    this.setState({ defaultVoteWeight: value });
  };
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{"Settings | TravelFeed: The Travel Community"}</title>
        </Helmet>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <Card>
              <CardHeader
                style={{ background: deepOrange[600] }}
                title={
                  <Typography
                    variant="h4"
                    align="center"
                    className="p-2 text-light"
                  >
                    Settings
                  </Typography>
                }
              />
              <CardContent>
                <Query query={GET_SETTINGS}>
                  {({ data, loading, error }) => {
                    if (loading || error) {
                      return <Fragment />;
                    }
                    if (data) {
                      if (this.state.loaded === false) {
                        this.setState({
                          loaded: true,
                          defaultVoteWeight: data.preferences.defaultVoteWeight,
                          defaultCommentsVoteWeight:
                            data.preferences.defaultCommentsVoteWeight,
                          showNSFW: data.preferences.showNSFW,
                          useTfBlacklist: data.preferences.useTfBlacklist
                        });
                        return <Fragment />;
                      }
                      return (
                        <Mutation
                          mutation={CHANGE_SETTINGS}
                          variables={{
                            defaultVoteWeight: this.state.defaultVoteWeight,
                            defaultCommentsVoteWeight: this.state
                              .defaultCommentsVoteWeight,
                            showNSFW: this.state.showNSFW,
                            useTfBlacklist: this.state.useTfBlacklist
                          }}
                        >
                          {(changeSettings, data) => {
                            if (data.loading && this.state.saved) {
                              this.setState({ saved: false });
                            }
                            if (data.data && !this.state.saved) {
                              this.newNotification({
                                success: data.data.updatePreferences.success,
                                message: data.data.updatePreferences.message
                              });
                              this.setState({ saved: true });
                            }
                            return (
                              <Fragment>
                                <FormControl fullWidth>
                                  <FormGroup>
                                    <FormControlLabel
                                      labelPlacement="end"
                                      control={
                                        <Switch
                                          checked={this.state.showNSFW}
                                          onChange={this.handleCheckboxChange(
                                            "showNSFW"
                                          )}
                                          onInput={changeSettings}
                                          value="showNSFW"
                                          color="primary"
                                        />
                                      }
                                      label="Show NSFW posts"
                                    />
                                    <Divider />
                                    <FormControlLabel
                                      labelPlacement="end"
                                      control={
                                        <Switch
                                          checked={this.state.useTfBlacklist}
                                          onChange={this.handleCheckboxChange(
                                            "useTfBlacklist"
                                          )}
                                          onInput={changeSettings}
                                          value="useTfBlacklist"
                                          color="primary"
                                        />
                                      }
                                      label="Use TravelFeed Blacklist"
                                    />
                                    <Divider />

                                    <TextField
                                      select
                                      label="Default miles weight for posts"
                                      value={this.state.defaultVoteWeight}
                                      onChange={value => {
                                        this.setDefaultVoteWeight(
                                          value.target.value
                                        );
                                        changeSettings({
                                          variables: {
                                            defaultVoteWeight:
                                              value.target.value
                                          }
                                        });
                                      }}
                                      margin="normal"
                                    >
                                      {weights.map(w => (
                                        <MenuItem key={w} value={w}>
                                          {w}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                    <Divider />
                                    <TextField
                                      select
                                      label="Default miles weight on comments"
                                      value={
                                        this.state.defaultCommentsVoteWeight
                                      }
                                      onChange={value => {
                                        this.setDefaultCommentsVoteWeight(
                                          value.target.value
                                        );
                                        changeSettings({
                                          variables: {
                                            defaultCommentsVoteWeight:
                                              value.target.value
                                          }
                                        });
                                      }}
                                      margin="normal"
                                    >
                                      {weights.map(w => (
                                        <MenuItem key={w} value={w}>
                                          {w}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </FormGroup>
                                </FormControl>
                              </Fragment>
                            );
                          }}
                        </Mutation>
                      );
                    }
                  }}
                </Query>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Settings.propTypes = {
  enqueueSnackbar: PropTypes.func
};
export default withSnackbar(Settings);
