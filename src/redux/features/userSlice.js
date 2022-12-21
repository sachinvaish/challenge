import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk('user/createUser',
    async (values) => {
        console.log('inside async thunk', values);
        return fetch('http://localhost/users/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password
            })
        }).then((res) =>
            console.log(res.json())
        ).catch((error) => console.log(error))
    });

export const loginUser = createAsyncThunk('user/loginuser',
async(creds)=>{
    console.log('inside login thunk', creds);
    return fetch('http://localhost/users/login',{
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            email : creds.email,
            password : creds.password
        })
    }).then((res)=>{
        return res.json();
    }).then((res)=>{
        if(res.authToken){
            localStorage.setItem('authToken',res.authToken)
        }
    }).catch((error)=>console.log(error))
})

export const getUser = createAsyncThunk('user/getUser',
    async (authtoken) => {
        console.log('inside getUser');
        return fetch('http://localhost/users/getuser', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'auth-token': authtoken
            }
        }).then((res) =>
            res.json()
        ).catch((error) => console.log(error))
    })

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [createUser.pending]: (state, action) => {
            state.loading = true;
        },
        [createUser.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [createUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = [action.payload];
        },
        [getUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [loginUser.pending]: (state, action) => {
            state.loading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loading = false;
            // state.user = [action.payload];
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default userSlice.reducer