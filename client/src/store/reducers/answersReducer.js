import * as actionTypes from "../actions/types";
const initialState = {
  _id: 0,
  title: "",
  description: "",
  date: 0,
  pages: [
    // {
    //   _id: 1,
    //   title: "no title",
    //   type: "QUESTION_TEXT"
    // }
  ]
};

const answerReducer = (state = initialState, action) => {
    console.log("hellooo")
  switch (action.type) {
    case actionTypes.PREVIEW_SURVEY:
      console.log("answers reducer", action.payload);
      return {
        ...state,
        _id: action.payload._id,
        title: action.payload.title,
        description: action.payload.description,
        date: action.payload.date,
        pages: action.payload.pages
      };

    //   case actionTypes.SUBMET_SURVEY:

    default:
      return {
        ...state
      };
  }
};
export default answerReducer;
