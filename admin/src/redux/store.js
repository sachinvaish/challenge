import { configureStore} from "@reduxjs/toolkit";
import UserReducer from './services/userSlice';

export const store = configureStore({
    reducer : {
        UserReducer : UserReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false
        }),
})