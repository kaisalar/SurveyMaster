import * as ActionTypes from "../actions/types";

const initialState = {
  surveys: []
};
const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_SURVEYS:
      return {
        ...state,
        surveys: action.payload
      };
    case ActionTypes.FETCH_SURVEYS_FAILED:
      return {
        ...state
      };
      default:
      return{
          ...state
      }
  }
};
export default answerReducer;
