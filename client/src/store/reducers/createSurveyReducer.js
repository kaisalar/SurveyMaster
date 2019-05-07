import * as actions from "../actions/types";
import * as Qtypes from "../../Components/Question/QuestionTypes";
const initialState = {
  title: "newSurvey",
  pages : [{
    questions: [],
  }]
};
const reducer = (state = initialState, action) => {
  let newPages
  switch (action.type) {
    case actions.ADD_QUESTION:
      const newQuestion = {
        _id: state.pages[0].questions.length + 1,
        type: Qtypes.TEXT,
        title: "Untitled Question",
        content: {
          choices: ["Option 1"]
        }
      };
      newPages = [...state.pages];
      newPages[0].questions.push(newQuestion)
      return {
        ...state,
        pages: newPages
      };
    case actions.CHANGE_QUESTION_TITLE:
      newPages = [...state.pages];
      newPages[0].questions[action.index].title = action.val;
      return {
        ...state,
        pages: newPages
      };
    case actions.CHANGE_QUESTION_TYPE:
      newPages = [...state.pages];
      newPages[0].questions[action.index].type = action.val;
     // handleContentOfType(newPages[action.index]);
      return {
        ...state,
        pages: newPages
      };
    case actions.CHANGE_CHOISE_LABEL:
      newPages = [...state.pages];
      newPages[0].questions[action.index].content.choices[action.choiceIndex] =
        action.val;
      return {
        ...state,
        pages: newPages
      };
      case actions.ADD_CHOICE:
      newPages = [...state.pages];
      newPages[0].questions[action.index].content.choices.push("Option " + (newPages[0].questions[action.index].content.choices.length +1));
      return {
        ...state,
        pages: newPages
      };
      case actions.DELETE_CHOICE:
      newPages = [...state.pages];
      const newChoices = newPages[0].questions[action.index].content.choices.filter((_,index) => index !== action.choiceIndex);
      newPages[action.index].content.choices = newChoices
      console.log(newPages)
      return {
        ...state,
        pages: newPages
      };
      case actions.SUBMIT_NEW_SERVEY: 

    default:
      break;
  }
  return state;
};
const handleContentOfType = Question => {
  switch (Question.type) {
    case Qtypes.TEXT:
      Question.content = {};
      return;
    case Qtypes.RADIO_GROUP:
    case Qtypes.CHECKBOX:
    case Qtypes.DROPDOWN:
      Question.content = {
        choices: ["Option 1"]
      };
      return;
    default:
      return;
  }
};
export default reducer;
