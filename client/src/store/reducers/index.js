///combine reducers
import { combineReducers } from "redux";
import viewReducer from "./viewReducer";
import createSurveyReducer from "./createSurveyReducer";
import fillSurveyReducer from "./answersReducer";
import answerContentReducer from "./answerContentReducer";
import authReducer from "./authReducer";
export default combineReducers({
  viewSurvey: viewReducer,
  createSurvey: createSurveyReducer,
  fillSurvey: fillSurveyReducer,
  questionAnswer: answerContentReducer,
  auth: authReducer
});
