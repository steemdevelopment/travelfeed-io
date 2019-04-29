import React, { Fragment, Component } from "react";
import Cookie from "js-cookie";
import Header from "../components/Header";
import Grid from "@material-ui/core/Grid";
import NotFound from "../components/NotFound";
import { setAccessToken, setScToken } from "../utils/token";
import Router from "next/router";
import PropTypes from "prop-types";
import { Mutation, Query } from "react-apollo";
import { GET_LOGIN_TOKEN } from "../helpers/graphql/token";
import { CHANGE_SETTINGS } from "../helpers/graphql/settings";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

class Login extends Component {
  state = {
    updated: false,
    loaded: false,
    hasAcceptedTos: false
  };
  static async getInitialProps({ req }) {
    return {
      sc: {
        sc_token: req.query.access_token,
        expires_in: req.query.expires_in
      }
    };
  }
  render() {
    return (
      <Fragment>
        <Query query={GET_LOGIN_TOKEN} variables={this.props.sc}>
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
                    style={{ paddingLeft: "75px" }}
                  >
                    <Grid item lg={7} md={8} sm={11} xs={12} />
                  </Grid>
                </Fragment>
              );
            }
            if (error || data.login === null) {
              return (
                <Fragment>
                  <Header />
                  <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justify="center"
                    className="pt-4 pb-4"
                    style={{ paddingLeft: "75px" }}
                  >
                    <Grid item lg={7} md={8} sm={11} xs={12}>
                      <NotFound statusCode={404} />
                    </Grid>
                  </Grid>
                </Fragment>
              );
            }
            if (data) {
              if (data && data.login && !this.state.loaded) {
                this.setState({
                  loaded: true,
                  hasAcceptedTos: data.login.hasAcceptedTos
                });
              }
              if (this.state.hasAcceptedTos === false) {
                // Set temporary access token with short expiry to accept tos. This is not a good solution since this gives users temporarily access to everything without accepting the TOS
                const expiry = new Date(new Date().getTime() + 300000);
                Cookie.set("access_token", data.login.jwt, { expires: expiry });
                return (
                  <Mutation
                    mutation={CHANGE_SETTINGS}
                    // This should work  instead of the cookie but does not - why?
                    // context={{
                    //   headers: {
                    //     authorization: data.login.jwt ? data.login.jwt : ""
                    //   }
                    // }}
                    variables={{
                      acceptTos: true
                    }}
                  >
                    {(changeSettings, data) => {
                      if (
                        data &&
                        data.data &&
                        data.data.updatePreferences.success &&
                        !this.state.updated
                      ) {
                        this.setState({
                          updated: true,
                          hasAcceptedTos: true
                        });
                      }
                      return (
                        <Fragment>
                          <Header />
                          <Dialog
                            aria-labelledby="customized-dialog-title"
                            open={true}
                          >
                            <MuiDialogTitle
                              id="customized-dialog-title"
                              onClose={this.handleClose}
                            >
                              Terms of Service
                            </MuiDialogTitle>
                            <MuiDialogContent>
                              <Typography gutterBottom>
                                Cras mattis consectetur purus sit amet
                                fermentum. Cras justo odio, dapibus ac facilisis
                                in, egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros.
                              </Typography>
                              <Typography gutterBottom>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.
                              </Typography>
                              <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                              </Typography>
                              <Typography gutterBottom>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.
                              </Typography>
                              <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                              </Typography>
                              <Typography gutterBottom>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.
                              </Typography>
                              <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                              </Typography>
                              <Typography gutterBottom>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.
                              </Typography>
                              <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                              </Typography>
                              <Typography gutterBottom>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.
                              </Typography>
                              <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                              </Typography>
                              <Typography gutterBottom>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.
                              </Typography>
                              <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                              </Typography>
                              <Typography gutterBottom>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.
                              </Typography>
                              <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                              </Typography>
                              <Typography gutterBottom>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.
                              </Typography>
                              <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                              </Typography>
                              <Typography gutterBottom>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.
                              </Typography>
                              <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                              </Typography>
                            </MuiDialogContent>
                            <MuiDialogActions>
                              <Button onClick={changeSettings} color="primary">
                                Accept
                              </Button>
                            </MuiDialogActions>
                          </Dialog>
                        </Fragment>
                      );
                    }}
                  </Mutation>
                );
              }
              if (this.state.hasAcceptedTos === true) {
                setScToken(this.props.sc.sc_token, this.props.sc.expires_in);
                setAccessToken(data.login.jwt, this.props.sc.expires_in);
                Router.replace("/dashboard");
              }
            }
          }}
        </Query>
      </Fragment>
    );
  }
}

Login.propTypes = {
  sc: PropTypes.object
};

export default Login;
