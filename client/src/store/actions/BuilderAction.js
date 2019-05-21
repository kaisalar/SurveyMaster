import axios from "../../axios-requests";
import * as actions from "../actions/types";
import * as Qtypes from "../../Components/Question/QuestionTypes"
import _ from "lodash";
import{Alert} from 'rsuite';

// axios.interceptors.response.use(null, error => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;
//   if (expectedError) {
//     console.log("Logging Error", error);
//     Alert.error("An unexpected error occured");
//   }
//   return Promise.reject();
// });

export const AddQuestion = () => dispatch =>
  dispatch({ type: actions.ADD_QUESTION });
export const SubmitNewSurvey = survey => dispatch => {
  survey.pages[0].questions = survey.pages[0].questions.map(el => { 
      let newQ = _.pick(el, ["title", "type", "content"]);
      switch(newQ.type) {
        case Qtypes.TEXT:
        case Qtypes.PARAGRAPH:
        newQ.content = {}
        break;
        case Qtypes.RADIO_GROUP:
        case Qtypes.CHECKBOX:
        case Qtypes.DROPDOWN:
        newQ.content = _.pick(newQ.content,["choices"])

        break;
        case Qtypes.SLIDER:
        newQ.content = _.pick(newQ.content,["min","max","step","defaultValue"])
        break;
        case Qtypes.RANGE:
        newQ.content = _.pick(newQ.content,["min","max","step"])
        break;
        case Qtypes.RATING:
        newQ.content = _.pick(newQ.content,["max"])
        break;
        default: 
        newQ.content = {}
        break;
      }
      return newQ
  }
    
  );

  // survey.pages[0].questions = finalSurveyQuestions
  console.log(survey);
  axios
    .post("/api/surveys", survey)
    .then(response =>{alert("Submitted Successfully");console.log(response)})
    .catch(err => console.log(err));
};
