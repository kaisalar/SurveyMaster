import * as actionType from '../actions/types';
import * as questionType from '../../Components/Question/QuestionTypes'
const initialState= {
   surveyId:0,
    answers:[{
        questionId:0,
        type:"",
        content:{ value : "" /**number or string */ }
    }]    
}

const contentReducer = (state = initialState , action)=>{
    let _answers = state.answers;
    let _content = action.content;
    switch(action.type){    
      case actionType.ANSWER_TEXT:
      case actionType.ANSWER_MULTIPLE_CHOICE:
      case actionType.ANSWER_RANGE:
      case actionType.ANSWER_SINGLE_NUMBER_VALUE:
            console.log('answer content reducer' , action.content)
            console.log('initial State' , state)
            let Qid =_content.questionId;
            let isContain = _answers.includes(_content);
            if(isContain){
              _answers[_answers.indexOf(_content)] = _content
              return {
                ...state,
                surveyId: action.id,
                answers: _answers
              };
            }
            else {return {
                    ...state,
                    surveyId: action.id,
                    answers: _answers.concat(_content)
                  };}
          case actionType.POST:
            return{

            }        
        default:
        console.log(JSON.stringify(state));
        return {...state}
    }
}

function getSafe(fn, defaultVal) {
  try {
      console.log('sss',fn())
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

export default contentReducer;