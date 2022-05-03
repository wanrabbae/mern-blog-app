import { login, register, activate } from "../apis/auth";
import { toast } from "react-toastify";

export const loginAction = (dataUser, navigate) => async (dispatch) => {
  try {
    const { data } = await login(dataUser);
    dispatch({
      type: "LOGIN",
      payload: { token: data.token, status: data.status },
    });
    localStorage.setItem("token", data.token);
    navigate("/");
    toast.success("Sign in successfull!");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const registerAction = (dataUser, navigate) => async (dispatch) => {
  try {
    const { data } = await register(dataUser);
    dispatch({
      type: "REGISTER",
      payload: data,
    });
    toast.success(data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const activateAction = (token, navigate) => async (dispatch) => {
  try {
    const { data } = await activate(token);
    dispatch({
      type: "ACTIVATE",
      payload: data,
    });
    toast.success(data.message);
    navigate("/auth");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
