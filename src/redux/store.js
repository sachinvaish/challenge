import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './features/userSlice';
import SubmissionReducer from './features/submissionSlice';
import FeedbackReducer from './features/feedbackSlice';
import VoteReducer from './features/voteSlice';
import ChallengeReducer from './features/challengeSlice';
import AlertReducer from './features/alertSlice';

export const store = configureStore({
    reducer: {
        UserReducer: UserReducer,
        ChallengeReducer : ChallengeReducer,
        SubmissionReducer : SubmissionReducer,
        FeedbackReducer : FeedbackReducer,
        VoteReducer : VoteReducer,
        AlertReducer : AlertReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false
        }),
})
