///combine reducers
import {combineReducers} from 'redux';
import answersReducer from './answersReducer';
import createSurveyReducer from './createSurveyReducer'
export default combineReducers({
    fill_items:answersReducer,
    createSurvey:createSurveyReducer,
})
