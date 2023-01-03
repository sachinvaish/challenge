import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './features/userSlice';
import SubmissionReducer from './features/submissionSlice';
import FeedbackReducer from './features/feedbackSlice';
import VoteReducer from './features/voteSlice';

export const store = configureStore({
    reducer: {
        UserReducer: UserReducer,
        SubmissionReducer : SubmissionReducer,
        FeedbackReducer : FeedbackReducer,
        VoteReducer : VoteReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false
        }),
})
