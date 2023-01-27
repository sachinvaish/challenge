import { configureStore} from "@reduxjs/toolkit";
import UserReducer from './services/userSlice';
import ChallengeReducer from './services/challengeSlice';

export const store = configureStore({
    reducer : {
        UserReducer : UserReducer,
        ChallengeReducer : ChallengeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false
        }),
})