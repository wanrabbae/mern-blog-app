import api from "./index";

export const login = (data) => {
  return api.post("/signin", data);
};

export const register = (data) => {
  return api.post("/signup", data);
};

export const activate = (token) => {
  return api.post("/user/activation", { token: token });
};
