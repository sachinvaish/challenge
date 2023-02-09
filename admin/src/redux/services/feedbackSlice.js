import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const host=process.env.REACT_APP_BACKEND_URL;

export const createFeedback = createAsyncThunk('feedback/createFeedback',
    async ({feedback, authToken}) => {
        // console.log('inside create feedback thunk', feedback);
        return fetch(`${host}/feedbacks/`,{
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
    return fetch(`${host}/feedbacks/${submission_id}`,{
        method:'GET',
        headers : {
            'Content-type':'application/json'
        }
    }).then((res)=>res.json()
    ).then((res)=>res
    ).catch((err)=>console.log(err))
})

// export const deleteUserFeedbacks = createAsyncThunk('feedback/deleteUserFeedbacks',
// async({user_id,authToken})=>{
//     return fetch(`${host}/feedbacks/user/${user_id}`,{
//         method:'DELETE',
//         headers : {
//             'Content-type':'application/json',
//             'auth-token':authToken
//         }
//     }).then((res)=>res.json()
//     ).then((res)=>res
//     ).catch((err)=>console.log(err))
// })

// export const deleteSubmissionFeedbacks = createAsyncThunk('feedback/deleteSubmissionFeedbacks',
// async({submission_id,authToken})=>{
//     return fetch(`${host}/feedbacks/user/${submission_id}`,{
//         method:'DELETE',
//         headers : {
//             'Content-type':'application/json',
//             'auth-token':authToken
//         }
//     }).then((res)=>res.json()
//     ).then((res)=>res
//     ).catch((err)=>console.log(err))
// })

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
            // builder.addCase(deleteUserFeedbacks.fulfilled, (state, action) => {
            //     toast(action.payload.message);
            // });
            // builder.addCase(deleteUserFeedbacks.rejected, (state, action) => {
            //     state.error = action.payload;
            // });
            // builder.addCase(deleteSubmissionFeedbacks.fulfilled, (state, action) => {
            //     toast(action.payload.message);
            // });
            // builder.addCase(deleteSubmissionFeedbacks.rejected, (state, action) => {
            //     state.error = action.payload;
            // });
        }
})

export default feedbackSlice.reducer;