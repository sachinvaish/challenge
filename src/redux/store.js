import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import UserReducer from './features/userSlice';

export const store = configureStore({
    reducer: {
        app: UserReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false
        }),
})
