import * as actionType from '../actions/types';
const initialState= {
   surveyId:0,
    answers:[{
        questionId:0,
        type:"",
        content:{ value : "" /**number or string */ }
    }]    
}

const contentReducer = (state = initialState , action)=>{
    switch(action.type){
        case actionType.SHORT_TEXT:
            console.log('answer content reducer' , action.content)
        return{
            // ...state,
            // surveyId : newAnswer[action.surveyId],
            // answers: answers.push(action.content)
            ...state,
            answers:[...state.answers,action.content]
        }
        default:
        return {...state}
    }
}

export default contentReducer;