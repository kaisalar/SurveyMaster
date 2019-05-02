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
        content: {
        }
      };
      return { 
        ...state,
        Questions: state.Questions.concat(newQuestion)
      }
    default:
      break;
  }
  return state;
};

export default reducer;
