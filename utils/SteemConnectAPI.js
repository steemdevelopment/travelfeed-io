import steemconnect from "steemconnect";

const api = steemconnect.Initialize({
  app: "travelfeed.app",
  callbackURL: process.env.STEEMCONNECT_CALLBACK_URL,
  accessToken: "access_token",
  scope: ["login", "vote", "comment", "custom_json"]
});

export default api;
