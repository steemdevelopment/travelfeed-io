import steemconnect from "steemconnect";

const api = steemconnect.Initialize({
  app: "travelfeed.app",
  callbackURL: process.env.STEEMCONNECT_CALLBACK_URL,
  accessToken: "access_token",
  scope: []
});

export default api;
