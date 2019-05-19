// Todo: Add delete account to remove all of users data from our database
import React, { Fragment, Component } from "react";
import Grid from "@material-ui/core/Grid";
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
import { teal } from "@material-ui/core/colors";
import HeaderCard from "../General/HeaderCard";

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
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          <Grid item lg={7} md={8} sm={11} xs={12}>
            <HeaderCard
              title="Settings"
              background={teal[600]}
              content={
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
              }
            />
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
