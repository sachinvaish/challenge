import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createFeedback = createAsyncThunk('feedback/createFeedback',
    async () => {
        console.log('inside create feedback thunk');
    })

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        feedbacks: null,
        loading: false,
        error: null,
        message: null
    },
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(createFeedback.fulfilled, (state, action) => {
                console.log(action.payload);
            });
        }
})

export default feedbackSlice.reducer;