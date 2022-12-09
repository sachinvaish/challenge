import {combineReducers} from 'redux';
import {handleSubmissions} from './submissions';

const rootReducer = combineReducers({
    handleSubmissions : handleSubmissions
})

export default rootReducer;