import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createFeedback = createAsyncThunk('feedback/createFeedback',
    async ({feedback, authToken}) => {
        // console.log('inside create feedback thunk', feedback);
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/feedbacks/`,{
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
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/feedbacks/${submission_id}`,{
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
        feedbacksCount : 0,
        loading: false,
        error: null,
        message: null
    },
    reducers: { },
    extraReducers:
        (builder) => {
            builder.addCase(createFeedback.fulfilled, (state, action) => {
                // console.log('ADDfeedback fulfilled',action.payload);
                toast.success('Thank you for the feedback')
            });
            builder.addCase(createFeedback.rejected, (state, action) => {
                console.log('ADDfeedback rejected', action.payload);
            });
            builder.addCase(getFeedbacks.fulfilled, (state, action) => {
                state.feedbacks = action.payload;
                state.feedbacksCount = action.payload.length;
            });
            builder.addCase(getFeedbacks.rejected, (state, action) => {
                console.log('getfeedbacks rejected', action.payload);
            });
        }
})

export default feedbackSlice.reducer;