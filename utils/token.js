import api from "./SteemConnectAPI";

export const setToken = token => {
  localStorage.setItem("access_token", token);
};
export const setUser = username => {
  localStorage.setItem("username", username);
};
export const getUser = () => localStorage.getItem("username");
export const getToken = () => localStorage.getItem("access_token");
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("username");
  api.revokeToken();
};
export const getLoginURL = api.getLoginURL();
