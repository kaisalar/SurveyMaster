///combine reducers
import {combineReducers} from 'redux';
import answersReducer from './answersReducer';
import QuestionsReducer from '../reducer'
export default combineReducers({
    fill_items:answersReducer,
    questions:QuestionsReducer,
})
