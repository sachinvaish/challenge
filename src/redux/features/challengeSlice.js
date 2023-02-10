import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const host=process.env.REACT_APP_BACKEND_URL;

export const getAllChallenges = createAsyncThunk('challenge/getAllChallenges',
    async () => {
        // console.log('get Challenge');
        return fetch(`${host}/challenges/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((res) => res.json()
        ).then((res) => res
        ).catch((err) => err)
    })

export const getLastChallenge = createAsyncThunk('challenge/getLastChallenge',
async()=>{
    return fetch(`${host}/challenges/getchallenge/last`,{
        method:'GET',
        headers:{
            'Content-type':'application/json'
        }
    }).then((res)=>res.json()
    ).then((res)=> res
    ).catch((err)=>err)
})

export const getPastChallenges = createAsyncThunk('challenge/getPastChallenges',
async()=>{
    return fetch(`${host}/challenges/getchallenge/past`,{
        method:'GET',
        headers:{
            'Content-type':'application/json'
        }
    }).then((res)=>res.json()
    ).then((res)=>res
    ).catch((err)=>err)
})

export const getCurrentChallenge = createAsyncThunk('challenge/getCurrentChallenge',
async()=>{
    return fetch(`${host}/challenges/getchallenge/current`,{
        method:'GET',
        headers:{
            'Content-type':'application/json'
        }
    }).then((res)=>res.json()
    ).then((res)=>res
    ).catch((err)=>err)
})

export const getChallengeByID = createAsyncThunk('challenge/getChallengeByID',
    async (id) => {
        // console.log('get single challenge');
        return fetch(`${host}/challenges/${id}`, {
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
        currentChallenge: null,
        lastChallenge : null,
        loading: false,
        error: null,
        allChallenges: null,
        pastChallenges :null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllChallenges.fulfilled, (state, action) => {
            // console.log('fulfilled', action.payload);
            state.allChallenges = action.payload;
            toast(action.payload.message);
        });
        builder.addCase(getAllChallenges.rejected, (state, action) => {
            // console.log('rejected', action.payload);
            state.error = action.payload;
        });
        builder.addCase(getLastChallenge.fulfilled,(state,action)=>{
            state.lastChallenge = action.payload;
            // toast(action.payload.message);
        });
        builder.addCase(getLastChallenge.rejected,(state,action)=>{
            state.error = action.payload;
        });
        builder.addCase(getPastChallenges.fulfilled,(state,action)=>{
            state.pastChallenges = action.payload;
            
        });
        builder.addCase(getPastChallenges.rejected,(state,action)=>{
            state.error = action.payload;
        });
        builder.addCase(getCurrentChallenge.fulfilled,(state,action)=>{
            state.currentChallenge = action.payload;
            // toast(action.payload.message);
        });
        builder.addCase(getCurrentChallenge.rejected,(state,action)=>{
            state.error = action.payload;
        });
        builder.addCase(getChallengeByID.fulfilled, (state, action) => {
            // console.log('fulfilled', action.payload);
            state.challenge = action.payload;
            // toast(action.payload.message);
        });
        builder.addCase(getChallengeByID.rejected, (state, action) => {
            // console.log('rejected', action.payload);
            state.error = action.payload;
        });
        
    }
})

export default challengeSlice.reducer