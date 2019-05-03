import * as ActionTypes from "../actions/types";

const initialState = {
  surveys: []
};
const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_SURVEYS:
     console.log("view reducer", action.payload)
      return {
        ...state,
        surveys: action.payload
      };
    

    default:
      return {
        ...state
      };
  }
};
export default viewReducer;
