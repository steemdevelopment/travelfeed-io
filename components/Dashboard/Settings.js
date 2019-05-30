// Todo: Add delete account to remove all of users data from our database
import { teal } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import { CHANGE_SETTINGS, GET_SETTINGS } from '../../helpers/graphql/settings';
import HeaderCard from '../General/HeaderCard';

const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Settings extends Component {
  state = {
    loaded: false,
    saved: true,
    defaultVoteWeight: 0,
    defaultCommentsVoteWeight: 0,
    showNSFW: false,
    useTfBlacklist: true,
  };

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

  newNotification(notification) {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      const { enqueueSnackbar } = this.props;
      enqueueSnackbar(notification.message, { variant });
    }
  }

  render() {
    const {
      defaultVoteWeight,
      defaultCommentsVoteWeight,
      loaded,
      showNSFW,
      useTfBlacklist,
      saved,
    } = this.state;
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
                  {({ data }) => {
                    if (data) {
                      if (loaded === false) {
                        this.setState({
                          loaded: true,
                          defaultVoteWeight: data.preferences.defaultVoteWeight,
                          defaultCommentsVoteWeight:
                            data.preferences.defaultCommentsVoteWeight,
                          showNSFW: data.preferences.showNSFW,
                          useTfBlacklist: data.preferences.useTfBlacklist,
                        });
                        return <Fragment />;
                      }
                      return (
                        <Mutation
                          mutation={CHANGE_SETTINGS}
                          variables={{
                            defaultVoteWeight,
                            defaultCommentsVoteWeight,
                            showNSFW,
                            useTfBlacklist,
                          }}
                        >
                          {changeSettings => {
                            if (data.loading && saved) {
                              this.setState({ saved: false });
                            }
                            if (data.data && !saved) {
                              this.newNotification({
                                success: data.data.updatePreferences.success,
                                message: data.data.updatePreferences.message,
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
                                          checked={showNSFW}
                                          onChange={this.handleCheckboxChange(
                                            'showNSFW',
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
                                          checked={useTfBlacklist}
                                          onChange={this.handleCheckboxChange(
                                            'useTfBlacklist',
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
                                      value={defaultVoteWeight}
                                      onChange={value => {
                                        this.setDefaultVoteWeight(
                                          value.target.value,
                                        );
                                        changeSettings({
                                          variables: {
                                            defaultVoteWeight:
                                              value.target.value,
                                          },
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
                                      value={defaultCommentsVoteWeight}
                                      onChange={value => {
                                        this.setDefaultCommentsVoteWeight(
                                          value.target.value,
                                        );
                                        changeSettings({
                                          variables: {
                                            defaultCommentsVoteWeight:
                                              value.target.value,
                                          },
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
                    return <Fragment />;
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
  enqueueSnackbar: PropTypes.func.isRequired,
};
export default withSnackbar(Settings);
