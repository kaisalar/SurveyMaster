import * as ActionTypes from "../actions/types";

const initialState = {
  surveys: [],
  isFill: false
};
const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_SURVEYS:
      return {
        ...state,
        surveys: action.payload
      };
    case ActionTypes.FILL:
      return {
        ...state,
        isFill: true
      };
    default:
      return {
        ...state
      };
  }
};
export default viewReducer;
