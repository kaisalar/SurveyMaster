import * as actionTypes from './types';
import axios from '../../axios-requests';
let answers = []
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
  console.log('state action ',state)
   dispatch({
     type: state.info.type,
     content: state.info,
     id: state.survey_id
   });
}
// export const addId = (state) => dispatch => {
//    dispatch({
    
//      id : state
//    })
// }

export const postAnswers = (answers,surveyId) => dispatch=> {

  //console.log("answersssss" , answers)
   axios.post('/fill/'+surveyId,answers).then(response => {
     console.log("rrrrrrrrrrrrrrrrrrr",response.data)
    return dispatch({
     type:actionTypes.POST,
     payload:response.data

   })}).catch(error=>{ 
     console.log("rrrrrrrrrrrrrrrrrrr", error.message);
   return  dispatch({
     type:actionTypes.POST_FAILED,
     payload:error.message
   
   
    })})
  }
  