import * as ActionTypes from "../actions/types";

const initialState = {
  surveys: [],
  currentUser: null
};
const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_SURVEYS:
      return {
        ...state,
        surveys: action.payload
      };
    case ActionTypes.CURRENT_USER:
      return {
        ...state,
        currentUser: action.value
      };
    default:
      return {
        ...state,
        

      };
  }
};
export default viewReducer;
