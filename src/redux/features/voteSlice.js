import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const toggleVote = createAsyncThunk('vote/toggleVote',
    async ({ submission_id, authToken }) => {
        console.log('inside toggleVote');
        return fetch('http://localhost:5000', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ submission_id })
        }).then(
            (res)=>res.json()
        ).then((res)=>res
        ).catch((err)=>err)
    })

const voteSlice = createSlice({
    name: 'vote',
    initialState: {
        votes: null
    },
    reducers: {}
})

export default voteSlice.reducer;