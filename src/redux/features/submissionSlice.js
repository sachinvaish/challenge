import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createSubmission = createAsyncThunk('submission/createSubmission',
    async ({ submission, authToken }, { rejectWithValue }) => {
        // console.log('inside create Submission', submission, authToken);
        const data = new FormData();
        data.append('challenge_id', submission.challenge_id);
        data.append('description', submission.description);
        data.append('feedback', submission.feedback);
        data.append('image', submission.photo);
        data.append('tags',submission.tags);
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/submissions/`, {
            method: 'POST',
            headers: {
                'auth-token': authToken
            },
            body: data
        }).then(
            (res) => res.json()
        ).then((res) => res.message
        ).catch((error) => {
            return rejectWithValue(error);
        });
    })

export const getSubmissions = createAsyncThunk('submission/getSubmissions',
    async (challenge_id) => {
        // console.log('inside getSubmissions');
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/submissions/contest/${challenge_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        }).then((res) => res.json()
        ).then((res) => res
        ).catch((error) => error)
    })

export const getSubmissionByID = createAsyncThunk('submission/getSubmissionByID',
    async (id) => {
        // console.log('inside getSubmission by ID');
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/submissions/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        }).then((res) => res.json()
        ).then((res) => {
            // console.log(res);
            return res;   
        }).catch((error) => error)
    })

const submissionSlice = createSlice({
    name: 'submission',
    initialState: {
        submissions: null,
        singleSubmission : null,
        loading: false,
        error: null,
        message: null
    },
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(createSubmission.fulfilled, (state, action) => {
                state.message = action.payload;
                toast.success(action.payload);
            });
            builder.addCase(createSubmission.rejected, (state, action) => {
                state.error = action.payload;
            });
            builder.addCase(getSubmissions.fulfilled, (state, action) => {
                state.submissions = action.payload
            });
            builder.addCase(getSubmissions.rejected, (state, action) => {
                state.error = action.payload;
            });
            builder.addCase(getSubmissionByID.pending, (state, action) => {
                state.loading = true;
            });
            builder.addCase(getSubmissionByID.fulfilled, (state, action) => {
                state.singleSubmission = action.payload;
                state.loading = false;
            });
            builder.addCase(getSubmissionByID.rejected, (state, action) => {
                state.error = action.payload;
            });
        }
})

export default submissionSlice.reducer