import { createPost } from "../apis/post";
import { toast } from "react-toastify";

export const createPostAction = async (data, navigate) => {
  try {
    const response = await createPost(data);
    // dispatch({
    //   type: "CREATE_POST",
    //   payload: response.data.data,
    // });
    return response.data.data;
  } catch (error) {
    console.log(error.message);
    if (error.response.data.message == "Unauthorized") {
      toast.warning("You are not authorized to access this page");
      localStorage.clear();
      navigate("/");
    } else {
      toast.error("Error creating post");
    }
  }
};
