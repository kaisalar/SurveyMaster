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
   dispatch({
     type: state.content.type,
     content: state.content,
     id: state.survey_id
   });
}
// export const addId = (state) => dispatch => {
//    dispatch({
    
//      id : state
//    })
// }
export const holdBackState = (recievedState) => dispatch =>{
  answers.push(recievedState)
  console.log(answers)
  dispatch({
    content: recievedState
  })
}
export const postAnswers = (answers,surveyId) => dispatch=> {

  console.log("answersssss" , answers)
   axios.post('/fill/'+surveyId,answers).then(response => dispatch({
     type:actionTypes.POST,
     payload:response.data
   })).catch(error=>dispatch({
     type:actionTypes.POST_FAILED,
     payload:error.message
   }))
}