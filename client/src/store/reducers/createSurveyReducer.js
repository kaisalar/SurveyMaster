import * as actions from "../actions/types";
import * as Qtypes from '../../Components/Question/QuestionTypes'
const initialState = {
  Questions: []
};
const reducer = (state = initialState, action) => {
  let newQuestions;
  switch (action.type) {
    case actions.ADD_QUESTION:
      const newQuestion = {
        _id: state.Questions.length + 1,
        type: "Text",
        title: "Untitled Question",
        content: {}
      };
      return {
        ...state,
        Questions: state.Questions.concat(newQuestion)
      };
    case actions.CHANGE_QUESTION_TITLE:
      newQuestions = [...state.Questions];
      newQuestions[action.index].title = action.val
      return {
        ...state,
        Questions: newQuestions
      };
      case actions.CHANGE_QUESTION_TYPE:
      newQuestions = [...state.Questions];
      newQuestions[action.index].type = action.val;
      handleContentOfType(newQuestions[action.index]);
      return { 
        ...state,
        Questions: newQuestions
      }
      case actions.CHANGE_CHOISE_LABEL: 
      newQuestions = [...state.Questions];
      newQuestions[action.index].content.choices[action.choiceIndex] = action.val;
      return { 
        ...state,
        Questions: newQuestions
      }
      default:
      break;
  }
  return state;
};
const handleContentOfType = (Question) => { 
  switch (Question.type) { 
    case Qtypes.TEXT: 
    Question.content = {}
    return;
    case Qtypes.MULTIPLE_CHOISE: 
    Question.content = {
      choices: ["Option 1"]
    }
    return;
    default: 
    return;
  }
}
export default reducer;
