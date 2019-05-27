import axios from "../../axios-requests";
import * as actions from "../actions/types";
import * as Qtypes from "../../Components/Question/QuestionTypes";
import _ from "lodash";
import {Alert} from 'rsuite'
const header = {
  "x-auth-token": localStorage.getItem("token")
};
export const ChangeTitle = (newVal) => dispatch =>
  dispatch({ type: actions.CHANGE_SURVEY_TITLE,val:newVal });


export const AddQuestion = (type) => dispatch =>
  dispatch({ type: actions.ADD_QUESTION,Qtype: type });
export const SubmitNewSurvey = survey => dispatch => {
  survey.pages[0].questions = survey.pages[0].questions.map(el => {
    let newQ = _.pick(el, ["title", "type", "content"]);
    switch (newQ.type) {
      case Qtypes.TEXT:
      case Qtypes.PARAGRAPH:
        newQ.content = {};
        break;
      case Qtypes.RADIO_GROUP:
      case Qtypes.CHECKBOX:
      case Qtypes.DROPDOWN:
        newQ.content = _.pick(newQ.content, ["choices"]);

        break;
      case Qtypes.SLIDER:
        newQ.content = _.pick(newQ.content, [
          "min",
          "max",
          "step",
          "defaultValue"
        ]);
        break;
      case Qtypes.RANGE:
        newQ.content = _.pick(newQ.content, ["min", "max", "step"]);
        break;
      case Qtypes.RATING:
        newQ.content = _.pick(newQ.content, ["max"]);
        break;
      default:
        newQ.content = {};
        break;
    }
    return newQ;
  });

  // survey.pages[0].questions = finalSurveyQuestions
  console.log(survey);
  axios
    .post("/api/surveys", survey,{headers:header})
    .then(response => {
      Alert.success("Submitted Successfully");
      console.log(response);
    })
    .catch(err => console.log(err));
};
