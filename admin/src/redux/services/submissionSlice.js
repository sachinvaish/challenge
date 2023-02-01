import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSubmissions = createAsyncThunk('submission/getSubmissions',
    async (challenge_id) => {
        // console.log('inside getSubmissions',challenge_id);
        return fetch(`http://localhost:5000/submissions/contest/${challenge_id}`, {
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
        return fetch(`http://localhost:5000/submissions/${id}`, {
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

// export const setPrize = createAsyncThunk('submission/setPrize',
//     async ({ newSubmission, authToken }) => {
//         console.log('inside setPrize , newSubmission', newSubmission);
//         return fetch(`http://localhost:5000/submissions/${newSubmission.id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-type': 'application/json',
//                 'auth-token': authToken
//             },
//             body: JSON.stringify({
//                 prize: newSubmission.prize
//             })
//         }).then((res) => res.json()
//         ).then((res) => {
//             // console.log(res);
//             return res;
//         }).catch((error) => error)
//     })

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
            builder.addCase(getSubmissionByID.fulfilled, (state, action) => {
                state.singleSubmission = action.payload
            });
            builder.addCase(getSubmissionByID.rejected, (state, action) => {
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