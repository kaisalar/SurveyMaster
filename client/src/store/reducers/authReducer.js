import * as actionTypes from "../actions/types";
const initialState = {
  token: localStorage.getItem('token'),
  loading: false,
  error:null
};
const authStart = state => {
  return { ...state, loading: true };
};
const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    loading: false,
  };
};


const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    default: 
    return {...state,token:localStorage.getItem('token')}
  }
};
export default authReducer;
