import Cookie from "js-cookie";
import api from "./SteemConnectAPI";

export const setToken = (token, expires_in) => {
  const expiry = new Date(new Date().getTime() + expires_in * 1000);
  Cookie.set("access_token", token, { expires: expiry });
};
export const setUser = (username, expires_in) => {
  const expiry = new Date(new Date().getTime() + expires_in * 1000);
  Cookie.set("username", username, { expires: expiry });
};
export const getUser = () => Cookie.get("username");
export const getToken = () => Cookie.get("access_token");
export const logout = () => {
  Cookie.remove("access_token");
  Cookie.remove("username");
  api.revokeToken();
};
export const getLoginURL = api.getLoginURL();
