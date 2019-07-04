import * as actionTypes from "../actions/types";
const initialState = {
    surveyId: "",
    survey: {},
    answers: [],
    error: null
};

const reportReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.PREVIEW_REPORT:
            console.log("Report reducer", action.payload);
            return {
                ...state,
                surveyId: action.payload.surveyId,
                survey: action.payload.survey,
                answers: action.payload.answers,
            };
        default:
            return {
                ...state
            };
    }
};
export default reportReducer;
