export const DEFAULT_IMAGE = "";
export const APP_VERSION = "travelfeed/0.2";
export const GMAPS_JS_APIKEY = "AIzaSyCPxDdLuLnseopR4g3ClB2PvsZyiMBjS7c";

var url = "http://localhost:3000/dashboard/login";
if (process.env.NODE_ENV == "production") {
  url = "https://travelfeed.io/dashboard/login";
}
export const STEEMCONNECT_CALLBACK_URL = url;
