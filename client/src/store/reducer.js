import * as actions from "./actions";
const initialState = {
  Questions: []
};
const reducer = (state = initialState, action) => {
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
      const newQuestions = [...state.Questions];
      newQuestions[action.index].title = "test"
      return {
        ...state,
        Questions: newQuestions
      };
      default:
      break;
  }
  return state;
};

export default reducer;
