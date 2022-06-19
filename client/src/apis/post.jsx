import api from "./index";

// export const getProfile = () => {
//   return api.get("/user/getProfile");
// };

export const createPost = (data) => {
  return api.post("/posts", data);
};
