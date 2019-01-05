export const DEFAULT_IMAGE = "";
export const APP_VERSION = "travelfeed/0.2.2";
export const GMAPS_JS_APIKEY = "AIzaSyCPxDdLuLnseopR4g3ClB2PvsZyiMBjS7c";

var url = "http://localhost:3000/dashboard/login";
var rooturl = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  url = "https://travelfeed.io/dashboard/login";
  rooturl = "https://travelfeed.io";
}
export const STEEMCONNECT_CALLBACK_URL = url;
export const ROOTURL = rooturl;

export const DEFAULT_META_DESCRIPTION =
  "Find inspiration for your travels on TravelFeed. Join the TravelFeed community, write your own travel blog and start earning!";

// This is in no way meant to judge accounts. It is simply an (incomplete) list of accounts with frequent automated comments and/or frequent spam comments. We want to save the comments for human interaction exclusively. If you believe that a specific account should not be in this list feel free to contact us.
export const comment_author_blacklist = [
  "travelfeed",
  "steemitworldmap",
  "curie",
  "c-squared",
  "trips.teem",
  "steemitworldmap",
  "trufflepig",
  "creativecrypto",
  "steem-bootcamp",
  "archisteem",
  "followforupvotes",
  "pifc",
  "boomerang",
  "upvotebank",
  "teamvn",
  "steem-plus",
  "steemitboard",
  "photochainreward",
  "tipu",
  "steem-ua",
  "altobot",
  "germanbot",
  "mikrobi",
  "curationvoter",
  "drotto",
  "steemdunk",
  "cabbage-dealer",
  "sharkbank",
  "steemitboard",
  "kakibukit",
  "coolbot",
  "sleepagent",
  "microbot",
  "nanobot",
  "minibot",
  "treeplanter",
  "esteemapp",
  "tuanis",
  "partiko",
  "voteme",
  "entrust",
  "peace-bot",
  "getup",
  "moneymatchgaming",
  "whalepromobot",
  "steemdiffuser",
  "honestbot",
  "votejar",
  "whalecreator",
  "botox",
  "seakraken",
  "ptbot",
  "aksdwi",
  "dolphinbot",
  "ocdb",
  "ssg-community",
  "minnowsupport",
  "snackplus",
  "pixresteemer"
];

export const author_blacklist = [];

// E.g. post with copyright violations can be blacklisted here manually
export const permlink_blacklist = [];
