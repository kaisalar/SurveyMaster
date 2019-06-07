import * as actionTypes from './types';
import axios from '../../axios-requests';
import {Alert} from 'rsuite';

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
  console.log(state)
   dispatch({
     type: state.info.type,
     content: state.info,
     id: state.survey_id
   });
}

export const postAnswers = (answers,surveyId) => dispatch=> {
   axios.post('/fill/'+surveyId,answers).then(response => {
   
    Alert.success(
          "Thanks For your Time , Your Opinion is priceless :)"
        );    
    
     window.setTimeout(() =>  window.location = '/surveys', 2000); 
    return dispatch({
     type:actionTypes.POST,
     payload:response.data
   })
  }).catch(error=>{
    Alert.error("There Was Error While Submitting  your response") 
   return  dispatch({
     type: actionTypes.POST_FAILED,
     payload: "failed"
   
   
    })})
  }
  