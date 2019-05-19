import {
  LOCALHOST_GMAPS_API_KEY,
  LOCALHOST_MAPBOX_TOKEN
} from "./config.local";

// The API keys in this file are used client-side and restricted to travelfeed.io, so don't bother trying to steal them ;)
export const GMAPS_API_KEY =
  process.env.NODE_ENV == "production"
    ? "AIzaSyCPxDdLuLnseopR4g3ClB2PvsZyiMBjS7c"
    : LOCALHOST_GMAPS_API_KEY;
export const MAPBOX_TOKEN =
  process.env.NODE_ENV == "production"
    ? "pk.eyJ1IjoidGlvdGRldiIsImEiOiJjanZ2NjVzdjQxZ3Q2M3ptczN5NTIwY3k4In0.ZIhYhbkfSAfbX11XDwI57w"
    : LOCALHOST_MAPBOX_TOKEN;

export const GRAPHQL_URL =
  process.env.NODE_ENV == "production"
    ? "https://api.travelfeed.io/graphql"
    : "http://localhost:4000/graphql";

export const DEFAULT_IMAGE = "";
export const APP_VERSION = "travelfeed/0.2.5";

var url = "http://localhost:3000/login";
var rooturl = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  url = "https://travelfeed.io/login";
  rooturl = "https://travelfeed.io";
}
export const STEEMCONNECT_CALLBACK_URL = url;
export const ROOTURL = rooturl;

export const DEFAULT_META_DESCRIPTION =
  "Find inspiration for your travels on TravelFeed. Join the TravelFeed community, write your own travel blog and start earning!";

// Cloudinary
export const CLOUDINARY_CLOUD_NAME = "dmuksl47x";
