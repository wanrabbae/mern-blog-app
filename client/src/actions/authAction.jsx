import { login } from "../apis/auth";
import { toast } from "react-toastify";

export const loginAction = (dataUser) => async (dispatch) => {
  try {
    const { data } = await login(dataUser);
    console.log(data);
    dispatch({
      type: "LOGIN",
      payload: data,
    });
    toast.success(data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
