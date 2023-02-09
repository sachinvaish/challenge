import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const host=process.env.REACT_APP_BACKEND_URL;

//get All Submissions
export const getAllSubmissions = createAsyncThunk('submission/getAllSubmissions',
    async () => {
        // console.log('inside getSubmissions',challenge_id);
        return fetch(`${host}/submissions/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        }).then((res) => res.json()
        ).then((res) => res
        ).catch((error) => error)
    })

//get submissions by Challenge ID
export const getSubmissions = createAsyncThunk('submission/getSubmissions',
    async (challenge_id) => {
        // console.log('inside getSubmissions',challenge_id);
        return fetch(`${host}/submissions/contest/${challenge_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        }).then((res) => res.json()
        ).then((res) => res
        ).catch((error) => error)
    })

    // get SUbmissions by user id
export const getSubmissionByID = createAsyncThunk('submission/getSubmissionByID',
    async (id) => {
        // console.log('inside getSubmission by ID');
        return fetch(`${host}/submissions/${id}`, {
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

//Delete submission by ID
    export const deleteSubmissionByID = createAsyncThunk('submission/deleteSubmissionByID',
    async ({id,authToken}) => {
        // console.log('inside getSubmission by ID');
        return fetch(`${host}/submissions/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'auth-token':authToken
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
        singleSubmission: null,
        loading: false,
        error: null,
        message: null
    },
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getSubmissions.fulfilled, (state, action) => {
                state.submissions = action.payload;
            });
            builder.addCase(getSubmissions.rejected, (state, action) => {
                state.error = action.payload;
            });
            builder.addCase(getAllSubmissions.fulfilled, (state, action) => {
                state.submissions = action.payload;
            });
            builder.addCase(getAllSubmissions.rejected, (state, action) => {
                state.error = action.payload;
            });
            builder.addCase(getSubmissionByID.fulfilled, (state, action) => {
                state.singleSubmission = action.payload
            });
            builder.addCase(getSubmissionByID.rejected, (state, action) => {
                state.error = action.payload;
            });
            builder.addCase(deleteSubmissionByID.fulfilled, (state, action) => {
                toast(action.payload.message);
            });
            builder.addCase(deleteSubmissionByID.rejected, (state, action) => {
                state.error = action.payload;
            });
            // builder.addCase(setPrize.fulfilled, (state, action) => {
            //     // state.singleSubmission = action.payload
            //     console.log('setPrize fulfilled');
            // });
            // builder.addCase(setPrize.rejected, (state, action) => {
            //     state.error = action.payload;
            // });
        }
})

export default submissionSlice.reducer