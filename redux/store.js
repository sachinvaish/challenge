import { configureStore} from "@reduxjs/toolkit";
import UserReducer from './services/userSlice';

export const store = configureStore({
    reducers :{
        UserReducer : UserReducer
    },
    middleware : (getDefaultMiddleware)=>{
        getDefaultMiddleware({
            serializableCheck : false
        });
    }
})