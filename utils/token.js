import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";
import api from "./SteemConnectAPI";
import { broadcastActiveUser } from "./actions";

export const setAccessToken = (token, expires_in) => {
  // If cookies are not accepted, set only session cookie (allowed by gdpr)
  const expiry =
    Cookie.get("cookie_consent") !== "true"
      ? ""
      : new Date(new Date().getTime() + expires_in * 1000);
  Cookie.set("access_token", token, { expires: expiry });
};
export const setScToken = (token, expires_in) => {
  const expiry =
    Cookie.get("cookie_consent") !== "true"
      ? ""
      : new Date(new Date().getTime() + expires_in * 1000);
  Cookie.set("sc_token", token, { expires: expiry });
};
export const getRoles = () => {
  const token = Cookie.get("access_token");
  if (token === undefined) {
    return undefined;
  }
  const jwt = jwt_decode(token);
  return jwt.roles ? jwt.roles : [];
};
export const getUser = () => {
  const token = Cookie.get("access_token");
  if (token === undefined) {
    return undefined;
  }
  const jwt = jwt_decode(token);
  return jwt.name;
};
export const getUserActive = () => {
  const token = Cookie.get("access_token");
  if (token === undefined) {
    return undefined;
  }
  const jwt = jwt_decode(token);
  // Submit custom_json for steemapps.com tracking once a day
  const active = Cookie.get("last_active_broadcast");
  if (active === undefined || active !== jwt.name) {
    broadcastActiveUser();
    const expiry =
      Cookie.get("cookie_consent") !== "true"
        ? ""
        : new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
    Cookie.set("last_active_broadcast", jwt.name, {
      expires: expiry
    });
  }
  return jwt.name;
};
export const getScToken = () => Cookie.get("sc_token");
export const getAccessToken = () => {
  const token = Cookie.get("access_token");
  const decoded = jwt_decode(token);
  const expires = new Date(decoded.exp * 1000);
  return { token, expires };
};
export const logout = () => {
  Cookie.remove("access_token");
  Cookie.remove("sc_token");
  api.revokeToken();
};
export const hasCookieConsent = () => {
  return Cookie.get("cookie_consent");
};
export const setCookieConsent = consent => {
  // Set cookie with one year expiry
  const expires = new Date(new Date().getTime() + 3600 * 1000 * 24 * 365);
  Cookie.set("cookie_consent", consent, { expires });
};
export const deleteCookieConsent = () => {
  Cookie.remove("cookie_consent");
};
export const getLoginURL = api.getLoginURL();
