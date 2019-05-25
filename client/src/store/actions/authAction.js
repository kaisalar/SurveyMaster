import * as actionTypes from "./types";
import axios from "../../axios-requests";
import { Alert } from "rsuite";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log(error);
    Alert.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");;
export const authStart = () => {
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
    error: error.response.data
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
    console.log(err.response.data)
    dispatch(authFail(err));
  }
};

export const authSignIn = (email, password) => async dispatch => {
  try {
    const authData = {
      email: email  ,
      password: password
    };
    dispatch(authStart());
    const response = await axios.post("/api/auth", authData);
    return dispatch(authSuccess(response.data));
  } catch (err) {
    console.log(err.response.data)
    dispatch(authFail(err));
  }
};


