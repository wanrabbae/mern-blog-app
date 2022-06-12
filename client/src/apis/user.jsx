import api from "./index";

export const getProfile = () => {
  return api.get("/user/getProfile");
};

export const updateProfile = (data) => {
  return api.put("/user/updateProfile", data);
};
