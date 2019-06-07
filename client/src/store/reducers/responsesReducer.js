import * as ActionTypes from "../actions/types";

const initialState = {
  data: [],
  response: null
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_RESPONSES_LIST:
      return {
        ...state,
        data: action.payload
      };
    case ActionTypes.LOAD_RESPONSE: 
    return {
      ...state,
      response: action.payload
    }
    default:
      return {
        ...state,
      };
  }
};
export default reducer;
