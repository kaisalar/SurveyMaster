import axios from "../../axios-requests";
import * as actions from "../actions/types";
import _ from 'lodash'

export const AddQuestion = () => dispatch =>
  dispatch({ type: actions.ADD_QUESTION });
export const SubmitNewSurvey = survey => dispatch => {
    const finalSurveyQuestions = survey.pages[0].questions.map(el => _.pick(el,['title','type','content']))
    survey.pages[0].questions = finalSurveyQuestions
    console.log(survey)
  axios
    .post("/api/surveys", survey)
    .then(response => console.log(response))
    .catch(err => console.log(err));
};
