import * as actionTypes from './types';
import axios from '../../axios-requests';
export const previewSurvey = (id,dataLoaded) => dispatch => {
     axios.get("/fill/" + id)
     .then(response => {
       dispatch({
           type: actionTypes.PREVIEW_SURVEY,
           payload: response.data
       });
       dataLoaded(true);
     })
}
export const addquestion = (state) => dispatch => {
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
    alert("Submitted Successfully");
     
    return dispatch({
     type:actionTypes.POST,
     payload:response.data

   })
  
  }).catch(error=>{ 
   return  dispatch({
     type:actionTypes.POST_FAILED,
     payload:error.message
   
   
    })})
  }
  