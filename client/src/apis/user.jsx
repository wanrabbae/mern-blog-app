import api from "./index";

export const getProfile = () => {
  return api.get("/user/getProfile");
};
