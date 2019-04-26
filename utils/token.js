import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";
import api from "./SteemConnectAPI";

export const setAccessToken = (token, expires_in) => {
  const expiry = new Date(new Date().getTime() + expires_in * 1000);
  Cookie.set("access_token", token, { expires: expiry });
};
export const setScToken = (token, expires_in) => {
  const expiry = new Date(new Date().getTime() + expires_in * 1000);
  Cookie.set("sc_token", token, { expires: expiry });
};
export const getUser = () => {
  const token = Cookie.get("access_token");
  if (token === undefined) {
    return undefined;
  }
  const jwt = jwt_decode(token);
  return jwt.name;
};
export const getScToken = () => Cookie.get("sc_token");
export const logout = () => {
  Cookie.remove("access_token");
  Cookie.remove("sc_token");
  api.revokeToken();
};
export const getLoginURL = api.getLoginURL();
