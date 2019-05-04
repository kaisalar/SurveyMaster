import * as actionType from '../actions/types';
const initialState= {
   surveyId,
    answers:[{
        questionId,
        type,
        content:{ value : "" /**number or string */ }
    }]    
}

const contentReducer = (state = initialState , action)=>{
    switch(action.type){
        case actionType.SHORT_TEXT:
        return{
            ...state,
            surveyId : newAnswer[action.surveyId],
            answers: answers.push(action.content)
        }
        default:
        return {...state}
    }
}
export default contentReducer;