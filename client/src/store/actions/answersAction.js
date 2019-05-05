import * as actionTypes from './types';
import axios from '../../axios-requests';
export const previewSurvey = (id) => dispatch => {
     axios.get("/fill/" + id)
     .then(response => {
       dispatch({
           type: actionTypes.PREVIEW_SURVEY,
           payload: response.data
       });
       console.log("Preview Survey from answersAction.js" , response.data);
     });
}
export const addquestion = (state) => dispatch => {
   dispatch({
     type:actionTypes.SHORT_TEXT,
     content : state
   })
}