import { combineReducers } from "redux";
import postReducer from "./posts";
import authReducer from "./auth";
import userReducer from "./user";

export default combineReducers({
  posts: postReducer,
  auth: authReducer,
  user: userReducer,
});
