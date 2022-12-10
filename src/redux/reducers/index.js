import {combineReducers} from 'redux';
import {handleSubmissions} from './submissions';
import { handleFeedbacks } from './feedbacks';

const rootReducer = combineReducers({
    handleSubmissions : handleSubmissions,
    handleFeedbacks : handleFeedbacks
})

export default rootReducer;