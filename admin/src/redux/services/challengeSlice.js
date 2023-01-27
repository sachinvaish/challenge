import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createChallenge = createAsyncThunk('challenge/createChallenge',
    async ({challenge, authToken}) => {
        console.log('inside create Challenge',challenge, authToken);
        return fetch('http://localhost:5000/challenges/',{
            method:'POST',
            headers : {
                'Content-type':'application/json',
                'auth-token':authToken
            },
            body:JSON.stringify({
                'title':challenge.title,
                'description':challenge.description,
                'due_date':challenge.deadline,
                'first_prize':challenge.firstPrize,
                'second_prize':challenge.secondPrize,
                'feedback_prize':challenge.feedbackPrize
            })
        }).then((res)=>res.json()
        ).then((res)=>res
        ).catch((err)=>err)
    })

const challengeSlice = createSlice({
    name: 'challenge',
    initialState: {
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(createChallenge.fulfilled,(state,action)=>{
            console.log('fulfilled', action.payload);
        });
        builder.addCase(createChallenge.rejected,(state,action)=>{
            console.log('rejected',action.payload);
            state.error = action.payload;
        })
    }
})

export default challengeSlice.reducer