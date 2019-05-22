import * as actionTypes from "./types";
import axios from "../../axios-requests";
import { Alert } from "rsuite";

axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')
export const authStart = () => {
  console.log("auth started");
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authToken => {
  localStorage.setItem("token", authToken);
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: authToken
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authSignUp = (
  firstName,
  lastName,
  email,
  password
) => async dispatch => {
  try {
    dispatch(authStart());
    const authData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const response = await axios.post("/api/users", authData);
    return dispatch(authSuccess(response.headers["x-auth-token"]));
  } catch (err) {
    if (err.response && err.response.status === 400) {
      console.log("failed");
      setTimeout(() => {
        dispatch(authFail(err));
        Alert.warning("This account is already registered");
      }, 1000);
    }
  }
};
