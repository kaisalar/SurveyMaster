import * as ActionType from "./types";
import axios from "../../axios-requests";
import { Alert } from "rsuite";
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

export const setSurveys = surveys => {
  return {
    type: ActionType.SHOW_SURVEYS,
    payload: surveys
  };
};
////////////////////////
export const deleteSurvey = id => dispatch => {
  axios
    .delete("api/surveys/" + id)
    .then(response => {
      console.log(response.data);
      dispatch(initSurvey());
    })
    .catch(err => {
      console.log(err.response);
      if (err.response && err.response.status === 404)
        Alert.warning("This survey has been already deleted");
    });
};
////////////////////////
export const initSurvey = () => dispatch => { 
 
  const header = {
    "x-auth-token": localStorage.getItem("token")
  };
  axios
    .get("api/surveys",{headers:header})
    .then(response => {
      dispatch(setSurveys(response.data));
    })
    .catch(error => {
        Alert.warning(
          "You don't have authentication to access your surveys,please sign in again"
        );
    });
};
export const currentUser = value => dispatch => {
  console.log('currentUser')
  dispatch( {
    value: value,
    type: ActionType.CURRENT_USER
  });
};
