import api from "./index";
import axios from "axios";

export const login = (data) => {
  return api.post("/signin", data);
};

export const register = (data) => {
  return api.post("/signup", data);
};

export const activate = (token) => {
  return api.post("/user/activation", { token: token });
};

export const googleLogin = (data) => {
  return api.post("/google/login", data);
};

export const getAccessTokenGithub = (code, client_id, client_secret) => {
  return axios.post(
    `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
};
