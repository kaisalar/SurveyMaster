import * as ActionType from "./types";
import axios from "../../axios-requests";
import {Alert} from 'rsuite'
// axios.interceptors.response.use(null,error => {
//   const expectedError= error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;
//     if(!expectedError)
//     {
//       console.log("Logging Error" ,error);
//       Alert.error("An unexpected error occured");
//     }
//     return Promise.reject();
// })
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
              
              dispatch(initSurvey());
              }).catch(err =>err.response && err.response.status === 404)
              Alert.warning("This survey has been already deleted")
              ;
};
////////////////////////
export const initSurvey = () => dispatch => {
  axios
    .get("api/surveys")
    .then(response => {
      dispatch(setSurveys(response.data));
    })
    .catch(error => {
      console.log(error.response);
    });
};
