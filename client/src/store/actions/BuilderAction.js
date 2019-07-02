import axios from "../../axios-requests";
import * as actions from "../actions/types";
import * as Qtypes from "../../Components/Question/QuestionTypes";
import _ from "lodash";
import {Alert} from 'rsuite'

export const ChangeTitle = (newVal) => dispatch =>
  dispatch({ type: actions.CHANGE_SURVEY_TITLE,val:newVal });

export const ChangeColor = (newVal) => dispatch => dispatch({type: actions.CHANGE_BG,color: newVal})
export const AddQuestion = (type) => dispatch =>
  dispatch({ type: actions.ADD_QUESTION,Qtype: type });
export const SubmitNewSurvey = (survey,submittig,Redirect) => dispatch => {
  let SC = _.cloneDeep(survey)
  SC.color = SC.color.toString()
  console.log(SC.color)
  SC.pages[0].questions = SC.pages[0].questions.map(el => {
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
      case Qtypes.RANGE:
        newQ.content = _.pick(newQ.content, [
          "min",
          "max",
          "step",
          "defaultValue"
        ]);
        console.log(newQ)
        newQ.content = newQ.content.step === "" ? _.omit(newQ.content,["step"]) : newQ.content
        newQ.content = newQ.content.defaultValue === "" ? _.omit(newQ.content,["defaultValue"]) : newQ.content
        break;
      case Qtypes.RATING:
          newQ.content = _.pick(newQ.content, [
            "min",
            "max",
            "defaultValue"
          ]);
        newQ.content = newQ.content.defaultValue === "" ? _.omit(newQ.content,["defaultValue"]) : newQ.content
        break;
      default:
        newQ.content = {};
        break;
    }
    return newQ;
  });
  const header = {
    "x-auth-token": localStorage.getItem("token")
  };
  axios
    .post("/api/surveys", SC,{headers:header})
    .then(response => {
      Alert.success("Submitted Successfully");
      console.log(response);
    }).then(submittig(false)).then(Redirect)
    .catch(err => console.log(err));
};
