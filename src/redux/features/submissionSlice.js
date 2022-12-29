import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createSubmission = createAsyncThunk('submission/createSubmission',
    async ({ submission, authToken }) => {
        console.log('inside create Submission', submission, authToken);
        const data = new FormData();
        data.append('description',submission.description);
        data.append('feedback', submission.feedback);
        data.append('image', submission.photo)
        return fetch('http://localhost/submissions/', {
            method: 'POST',
            headers: {
                Accept: 'multipart/form-data',
                'Content-type': 'multipart/form-data',
                'auth-token': authToken
            },
            body: data
        }).then(
            (res) => res.json()
        ).then((res) => res
        ).catch((error) => console.log(error));
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
                state.message = action.payload
                console.log(action.payload);
            });
            builder.addCase(createSubmission.rejected,(state,action)=>{
                console.log('SUBMISSION REJECTED');
                state.error = action.payload;
                console.log(action.payload);
            });
        }
})

export default submissionSlice.reducer