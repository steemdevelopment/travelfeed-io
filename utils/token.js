import SteemConnectAPI from "./SteemConnectAPI";

export const setToken = token => {
  localStorage.setItem("access_token", token);
};
export const setUser = username => {
  localStorage.setItem("username", username);
};
export const getUser = () => localStorage.getItem("username");
export const getToken = () => localStorage.getItem("access_token");
export const removeTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("username");
};
export const getLoginURL = SteemConnectAPI.getLoginURL();
