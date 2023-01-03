import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const toggleVote = createAsyncThunk('vote/toggleVote',
    async ({ submission_id, authToken }) => {
        console.log('inside toggleVote', submission_id, authToken);
        return fetch('http://localhost:5000/votes', {
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

// export const getVotes = createAsyncThunk('vote/getVotes',
//     async(submission_id)=>{
//         console.log('inside gietVotes', submission_id);
//         return fetch(`http://localhost:5000/votes/${submission_id}`,{
//             method:'GET'
//         }).then((res)=>res.json()
//         ).then((res)=>res
//         ).catch((err)=>err)
//     })

const voteSlice = createSlice({
    name: 'vote',
    initialState: {
        votesCount: 0,
        message : null,
        error : null
    },
    reducers: {},
    extraReducers :
        (builder)=>{
            builder.addCase(toggleVote.fulfilled,(state,action)=>{
                state.message = action.payload;
            });
            builder.addCase(toggleVote.rejected, (state, action)=>{
                state.error = action.payload;
            });
            // builder.addCase(getVotes.fulfilled,(state, action)=>{
            //     state.votesCount = action.payload.votesCount;
            // });
            // builder.addCase(getVotes.rejected, (state, action)=>{
            //     state.error = action.payload;
            // });
        }
})

export default voteSlice.reducer;