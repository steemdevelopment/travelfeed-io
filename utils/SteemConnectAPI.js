import steemconnect from "steemconnect";

const api = steemconnect.Initialize({
  app: "travelfeed.app",
  callbackURL: "http://localhost:3000/dashboard/login",
  accessToken: "access_token",
  scope: ["login", "vote", "comment", "custom_json"]
});

export default api;
