export const DEFAULT_IMAGE = "";
export const APP_VERSION = "travelfeed/0.2.5";
export const GMAPS_JS_APIKEY = "AIzaSyCPxDdLuLnseopR4g3ClB2PvsZyiMBjS7c";

var url = "http://localhost:3000/login";
var rooturl = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  url = "https://travelfeed.io/login";
  rooturl = "https://travelfeed.io";
}
export const STEEMCONNECT_CALLBACK_URL = url;
export const ROOTURL = rooturl;

export const GRAPHQL_URL = "http://localhost:4000/graphql";

export const DEFAULT_META_DESCRIPTION =
  "Find inspiration for your travels on TravelFeed. Join the TravelFeed community, write your own travel blog and start earning!";

export const author_blacklist = [];

// E.g. post with copyright violations can be blacklisted here manually
export const permlink_blacklist = [];
