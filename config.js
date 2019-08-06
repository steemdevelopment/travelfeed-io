export const GMAPS_API_KEY = process.env.NEXT_PUBLIC_GMAPS_API_KEY;
export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const DEFAULT_IMAGE = '';
export const APP_VERSION = 'travelfeed/1.1.0';

let url = 'http://localhost:3000/login';
let rooturl = 'http://localhost:3000';

if (process.env.NODE_ENV === 'production') {
  url = 'https://travelfeed.io/login';
  rooturl = 'https://travelfeed.io';
}

if (process.env.NEXT_PUBLIC_ENV === 'staging') {
  url = 'https://staging.travelfeed.io/login';
  rooturl = 'https://staging.travelfeed.io';
}

export const GRAPHQL_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.travelfeed.io/graphql'
    : 'https://api.travelfeed.io/graphql';
// Enable for local API development
// : "http://localhost:4000/graphql";

export const STEEMCONNECT_CALLBACK_URL = url;
export const ROOTURL = rooturl;

export const DEFAULT_META_DESCRIPTION =
  'Find inspiration for your travels on TravelFeed. Join the TravelFeed community, write your own travel blog and start earning!';

// Cloudinary
export const { CLOUDINARY_CLOUD_NAME } = process.env;
