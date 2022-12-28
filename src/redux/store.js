import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './features/userSlice';
import SubmissionReducer from './features/submissionSlice';

export const store = configureStore({
    reducer: {
        UserReducer: UserReducer,
        SubmissionReducer : SubmissionReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false
        }),
})
