import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './features/userSlice';
import SubmissionReducer from './features/submissionSlice';
import FeedbackReducer from './features/feedbackSlice';

export const store = configureStore({
    reducer: {
        UserReducer: UserReducer,
        SubmissionReducer : SubmissionReducer,
        FeedbackReducer : FeedbackReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false
        }),
})
