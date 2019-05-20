import * as actionTypes from './types';
import axios from '../../axios-requests';
import {Alert} from 'rsuite'
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (expectedError) {
    console.log("Logging Error", error);
    Alert.error("An unexpected error occured");
  }
  return Promise.reject();
});
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

  console.log("answersssss" , answers)
   axios.post('/fill/'+surveyId,answers).then(response => {
    console.log(response)    
    Alert.success(
          "Thanks For your Time , Your Opinion is priceless :)"
        );     
    return dispatch({
     type:actionTypes.POST,
     payload:response.data

   })
  
  }).catch(error=>{
    Alert.error("There Was Error While Submitting  your response") 
   return  dispatch({
     type:actionTypes.POST_FAILED,
     payload:error.message
   
   
    })})
  }
  