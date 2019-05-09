import * as actions from "../actions/types";
import * as Qtypes from "../../Components/Question/QuestionTypes";
const initialState = {
  title: "newSurvey",
  pages: [
    {
      questions: []
    }
  ]
};
const reducer = (state = initialState, action) => {
  let newPages = [...state.pages];
  switch (action.type) {
    case actions.ADD_QUESTION:
      const newQuestion = {
        type: Qtypes.TEXT,
        title: "Untitled Question",
        content: {
          choices: ["Option 1"],
          min: '0',
          max: '0',
          step: '0',
          defaultValue: '0'
        }
      };
      newPages[0].questions.push(newQuestion);
      break;
    case actions.DELETE_QUESTION:
    newPages[0].questions = newPages[0].questions.filter((_,index) => index !== action.index)
      break;
    case actions.CHANGE_QUESTION_TITLE:
      newPages[0].questions[action.index].title = action.val;
      break;
    case actions.CHANGE_QUESTION_TYPE:
      newPages[0].questions[action.index].type = action.val;
      break;

    case actions.CHANGE_CHOISE_LABEL:
      newPages[0].questions[action.index].content.choices[action.choiceIndex] =
        action.val;
      break;
    case actions.ADD_CHOICE:
      newPages[0].questions[action.index].content.choices.push(
        "Option " +
          (newPages[0].questions[action.index].content.choices.length + 1)
      );
      break;
    case actions.DELETE_CHOICE:
      const newChoices = newPages[0].questions[
        action.index
      ].content.choices.filter((_, index) => index !== action.choiceIndex);
      newPages[0].questions[action.index].content.choices = newChoices;
      break;
    case actions.CHANGE_LINEAR_CONTENT:
      switch (action.content) {
        case actions.CHANGE_MIN_VALUE:
          newPages[0].questions[action.index].content.min = action.val;
          break;
        case actions.CHANGE_MAX_VALUE:
          newPages[0].questions[action.index].content.max = action.val;
          break;
        case actions.CHANGE_STEP_VALUE:
          newPages[0].questions[action.index].content.step = action.val;
          break;
        case actions.CHANGE_DEFAULT_VALUE:
          newPages[0].questions[action.index].content.defaultValue = action.val;
          break;
        default:
        break;
      }
      break;
    default:
      break;
  }
  return {
    ...state,
    pages: newPages
  };
};
// const handleContentOfType = Question => {
//   switch (Question.type) {
//     case Qtypes.TEXT:
//       Question.content = {};
//       return;
//     case Qtypes.RADIO_GROUP:
//     case Qtypes.CHECKBOX:
//     case Qtypes.DROPDOWN:
//       Question.content = {
//         choices: ["Option 1"]
//       };
//       return;
//     default:
//       return;
//   }
// };
export default reducer;
