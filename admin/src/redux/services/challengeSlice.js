import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createChallenge = createAsyncThunk('challenge/createChallenge',
    async ({ challenge, authToken }) => {
        // console.log('inside create Challenge', challenge, authToken);
        return fetch('http://localhost:5000/challenges/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({
                'title': challenge.title,
                'description': challenge.description,
                'due_date': challenge.deadline,
                'first_prize': challenge.firstPrize,
                'second_prize': challenge.secondPrize,
                'feedback_prize': challenge.feedbackPrize
            })
        }).then((res) => res.json()
        ).then((res) => res
        ).catch((err) => err)
    })

export const updateChallenge = createAsyncThunk('challenge/updateChallenge',
    async ({ newChallenge, authToken }) => {
        // console.log('inside update challnegne', newChallenge);
        return fetch(`http://localhost:5000/challenges/${newChallenge.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({
                'title': newChallenge.title,
                'description': newChallenge.description,
                'due_date': newChallenge.deadline,
                'first_prize': newChallenge.firstPrize,
                'second_prize': newChallenge.secondPrize,
                'feedback_prize': newChallenge.feedbackPrize
            })
        }).then((res) => res.json()
        ).then((res) => res
        ).catch((err) => err)
    })

    export const deleteChallenge = createAsyncThunk('challenge/deleteChallenge',
    async({id,authToken})=>{
        // console.log('inside deleteChallenge');
        return fetch(`http://localhost:5000/challenges/${id}`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json',
                'auth-token':authToken
            }
        }).then((res) => res.json()
        ).then((res) => res
        ).catch((err) => err)
    })

export const getAllChallenges = createAsyncThunk('challenge/getAllChallenges',
    async () => {
        // console.log('get Challenge');
        return fetch('http://localhost:5000/challenges/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((res) => res.json()
        ).then((res) => res
        ).catch((err) => err)
    })

export const getChallengeByID = createAsyncThunk('challenge/getChallengeByID',
    async (id) => {
        // console.log('get single challenge');
        return fetch(`http://localhost:5000/challenges/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((res) => res.json()
        ).then((res) => res
        ).catch((err) => err)
    })

const challengeSlice = createSlice({
    name: 'challenge',
    initialState: {
        challenge: null,
        loading: false,
        error: null,
        allChallenges: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createChallenge.fulfilled, (state, action) => {
            // console.log('fulfilled', action.payload);
        });
        builder.addCase(createChallenge.rejected, (state, action) => {
            // console.log('rejected', action.payload);
            state.error = action.payload;
        });
        builder.addCase(updateChallenge.rejected, (state, action) => {
            // console.log('rejected', action.payload);
            state.error = action.payload;
        });
        builder.addCase(updateChallenge.fulfilled, (state, action) => {
            // console.log('fulfilled', action.payload);
        });
        builder.addCase(deleteChallenge.rejected, (state, action) => {
            // console.log('rejected', action.payload);
            state.error = action.payload;
        });
        builder.addCase(deleteChallenge.fulfilled, (state, action) => {
            // console.log('fulfilled', action.payload);
        });
        builder.addCase(getAllChallenges.fulfilled, (state, action) => {
            // console.log('fulfilled', action.payload);
            state.allChallenges = action.payload;
        });
        builder.addCase(getAllChallenges.rejected, (state, action) => {
            // console.log('rejected', action.payload);
            state.error = action.payload;
        });
        builder.addCase(getChallengeByID.fulfilled, (state, action) => {
            // console.log('fulfilled', action.payload);
            state.challenge = action.payload;
        });
        builder.addCase(getChallengeByID.rejected, (state, action) => {
            // console.log('rejected', action.payload);
            state.error = action.payload;
        });
    }
})

export default challengeSlice.reducer