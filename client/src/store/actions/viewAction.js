import * as ActionType from "./types";
import axios from "../../axios-requests";
export const setSurveys = surveys => {
  return {
    type: ActionType.SHOW_SURVEYS,
    payload: surveys
  };
};
////////////////////////
export const deleteSurvey = id => dispatch => {
  axios.delete("api/surveys/" + id)
       .then(response => {
              console.log(response);
              dispatch(initSurvey());
              });
};
////////////////////////
export const initSurvey = () => dispatch => {
  axios
    .get("api/surveys")
    .then(response => {
     console.log("get", response.data);
      dispatch(setSurveys(response.data));
    })
    .catch(error => {
      console.log(error);
    });
};
