import * as actionType from '../actions/types';
const initialState= {
   surveyId:0,
    answers:[{
        questionId:0,
        type:"",
        content:{}
    }],
   
}

const contentReducer = (state = initialState , action)=>{
    let _answers = state.answers;
    let _content = action.content;
    console.log("Content" , _content)
    console.log("type",action.type)
    switch(action.type){    
      case actionType.ANSWER_TEXT:
      case actionType.ANSWER_MULTIPLE_CHOICE:
      case actionType.ANSWER_RANGE:
      case actionType.ANSWER_SINGLE_NUMBER_VALUE:
            let isContain = _answers.includes(_content);
            if(isContain){
             console.log("I'm in Content")
              _answers[_answers.indexOf(_content)].content = _content.content
              return {
                ...state,
                surveyId: action.id,
                answers: _answers
              };
            }
            else {
        
              return {

                    ...state,
                    surveyId: action.id,
                    answers: deleteFirstItem(_answers,_content)
                  };}

    // case actionType.PREVIEW_SURVEY:
    // _answers = 
    //                return {
    //       ...state,
    //         answers:
    //     }   
        default:
      
        return {
          ...state,
                }
    }
}

const deleteFirstItem = (array,value) =>{
   array.push(value)
    if(array[0].questionId === 0)
     array.shift()
   return array
}
export default contentReducer;
