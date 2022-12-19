import { configureStore} from '@reduxjs/toolkit';
import UserReducer from './features/userSlice';

export const store= configureStore({
    reducer : {
        app : UserReducer,
    }
})