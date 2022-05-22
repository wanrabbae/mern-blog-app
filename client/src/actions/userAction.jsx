import { getProfile } from "../apis/user";
import { toast } from "react-toastify";

export const getProfileAction = async (navigate) => {
  try {
    const response = await getProfile();
    return response.data.user;
  } catch (error) {
    if (error.response.data.message == "Unauthorized") {
      toast.warning("You are not authorized to access this page");
      localStorage.clear();
      navigate("/");
    } else {
      toast.error("Error fetching user profile data");
    }
  }
};
