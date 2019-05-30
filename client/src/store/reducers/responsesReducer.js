import * as ActionTypes from "../actions/types";

const initialState = {
  data: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_RESPONSES_LIST:
      return {
        ...state,
        data: action.payload
      };
    default:
      return {
        ...state,
      };
  }
};
export default reducer;
