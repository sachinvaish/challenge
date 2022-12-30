import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createSubmission = createAsyncThunk('submission/createSubmission',
    async ({ submission, authToken },{ rejectWithValue }) => {
        console.log('inside create Submission', submission, authToken);
        const data = new FormData();
        data.append('description',submission.description);
        data.append('feedback', submission.feedback);
        data.append('image', submission.photo)
        return fetch('http://localhost/submissions/', {
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

export const getSubmissions= createAsyncThunk('submission/getSubmissions',
    async(id)=>{
        console.log('inside getSubmissions');
        return fetch(`http://localhost/submissions/${id}`,{
            method:'GET',
            headers:{
                Accept : 'application/json',
                'Content-type' : 'application/json'
            }
        }).then((res)=>res.json()
        ).then((res)=>res
        ).catch((error)=>error)
    })

const submissionSlice = createSlice({
    name: 'submission',
    initialState: {
        submissions: null,
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
            builder.addCase(getSubmissions.fulfilled,(state,action)=>{
                console.log('SUBMISSION fulfilled');
                state.submissions = action.payload
                console.log(action.payload);
            });
            builder.addCase(getSubmissions.rejected,(state,action)=>{
                console.log('SUBMISSION REJECTED');
                state.error = action.payload;
                console.log(action.payload);
            });
        }
})

export default submissionSlice.reducer