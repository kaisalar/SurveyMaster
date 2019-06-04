import * as actionTypes from "../actions/types";
const initialState = {
  _id: 0,
  title: "",
  description: "",
  date: 0,
  pages: [

  ],
  error:null
};

const answerReducer = (state = initialState, action) => {
    
  switch (action.type) {
    case actionTypes.PREVIEW_SURVEY:
    // console.log("answers reducer", action.payload);
      return {
        ...state,
        _id: action.payload._id,
        title: action.payload.title,
        description: action.payload.description,
        date: action.payload.date,
        pages: action.payload.pages
      };

  
    case actionTypes.POST_FAILED:
      console.log("failed", action.payload)
      return {
        ...state,
        error: action.payload
      }    
    default:
      return {
        ...state
      };
  }
};
export default answerReducer;
