import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createSubmission = createAsyncThunk('submission/createSubmission',
    async ({ submission, authToken }) => {
        console.log('inside create Submission', submission, authToken);
        return fetch('http://localhost/submissions/', {
            method: 'POST',
            headers: {
                Accept: 'multipart/form-data',
                'Content-type': 'multipart/form-data',
                'auth-token': authToken
            },
            body: JSON.stringify({
                description: submission.description,
                feedback: submission.feedback
            }),
            file: {
                image: submission.photo
            }
        }).then(
            (res) => res.json()
        ).then((res) => {
            console.log(res);
        }).catch((error) => console.log(error));
    })

const submissionSlice = createSlice({
    name: 'submission',
    initialState: {
        submission: null,
        loading: false,
        error: null,
        message : null
    },
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(createSubmission.fulfilled,(state,action)=>{
                console.log('SUBMISSION fulfilled');
                console.log(action.payload);
                state.message = action.payload
            });
            builder.addCase(createSubmission.rejected,(state,action)=>{
                console.log('SUBMISSION REJECTED');
                console.log(action.payload);
                state.error = action.payload;
            });
        }
})

export default submissionSlice.reducer