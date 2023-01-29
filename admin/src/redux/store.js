import { configureStore} from "@reduxjs/toolkit";
import UserReducer from './services/userSlice';
import ChallengeReducer from './services/challengeSlice';
import SubmissionReducer from './services/submissionSlice';
import VoteReducer from './services/voteSlice';
import FeedbackReducer from './services/feedbackSlice';

export const store = configureStore({
    reducer : {
        UserReducer : UserReducer,
        ChallengeReducer : ChallengeReducer,
        SubmissionReducer : SubmissionReducer,
        VoteReducer : VoteReducer,
        FeedbackReducer : FeedbackReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false
        }),
})