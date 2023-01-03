import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createFeedback = createAsyncThunk('feedback/createFeedback',
    async ({feedback, authToken}) => {
        // console.log('inside create feedback thunk', feedback);
        return fetch('http://localhost:5000/feedbacks/',{
            method : 'POST',
            headers : {
                'Content-type':'application/json',
                'auth-token' : authToken
            },
            body:JSON.stringify({
                submission_id : feedback.submission_id,
                feedback : feedback.feedback
            })
        }).then((res)=>res.json()
        ).then((res)=>res
        ).catch((err)=>console.log(err))
    })

export const getFeedbacks = createAsyncThunk('feedback/getFeedbacks',
async(submission_id)=>{
    // console.log('inside get feedbacksTHUNK', submission_id);
    return fetch(`http://localhost:5000/feedbacks/${submission_id}`,{
        method:'GET',
        headers : {
            'Content-type':'application/json'
        }
    }).then((res)=>res.json()
    ).then((res)=>res
    ).catch((err)=>console.log(err))
})

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        feedbacks: null,
        loading: false,
        error: null,
        message: null
    },
    reducers: { },
    extraReducers:
        (builder) => {
            builder.addCase(createFeedback.fulfilled, (state, action) => {
                // console.log('ADDfeedback fulfilled',action.payload);
            });
            builder.addCase(createFeedback.rejected, (state, action) => {
                console.log('ADDfeedback rejected', action.payload);
            });
            builder.addCase(getFeedbacks.fulfilled, (state, action) => {
                state.feedbacks = action.payload;
                // console.log('getFeedbacks fulfilled');
            });
            builder.addCase(getFeedbacks.rejected, (state, action) => {
                console.log('getfeedbacks rejected', action.payload);
            });
        }
})

export default feedbackSlice.reducer;