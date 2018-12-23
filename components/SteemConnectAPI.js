import steemconnect from "steemconnect";

var api = steemconnect.Initialize({
  app: "travelfeed.app",
  callbackURL: "http://localhost:3000/login/",
  accessToken: "access_token",
  scope: ["vote", "comment"]
});

var link = api.getLoginURL(state);
console.log(link);

api.me(function(err, res) {
  console.log(err, res);
});

export default api;
