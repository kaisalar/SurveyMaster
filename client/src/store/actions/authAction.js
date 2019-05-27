import * as actionTypes from "./types";
import axios from "../../axios-requests";
import { Alert } from "rsuite";
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");;

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
    // console.log(JSON.stringify(authData))
    const response = await axios.post("/api/users", authData);
    
    return dispatch(authSuccess(response.headers["x-auth-token"]));
  } catch (err) {
    console.log(err.response.data)
    dispatch(authFail(err));
  }
};

export const authSignIn = (email, password) => async (dispatch) => {
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


/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkMzdkZmEyNS1mOTA5LTQxMTAtYjIzYS0zODg5NjRhNjc1ODkiLCJmaXJzdE5hbWUiOiJmbGFuIiwibGFzdE5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJhbW1hcjEyQGhlbGFsYWFhaS5jb20iLCJpYXQiOjE1NTg5NDI1MDl9.CV2STTQmNEnCwLA2WI5xX5Mm-AQ7TsRVY6V-0-SMzOE

*/