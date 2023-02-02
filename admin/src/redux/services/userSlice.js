import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const host=process.env.REACT_APP_BACKEND_URL;

export const getAllUsers = createAsyncThunk('users/getAllUsers',
async()=>{
    // console.log('inside getAllUsers');
    return fetch(`${host}/users/getallusers`,{
        method : 'POST',
        headers : {
            'Content-type':'application/json'
        }
    }).then((res)=>res.json()
    ).then((res)=>res
    ).catch((err)=>err)
})

export const createUser = createAsyncThunk('user/createUser',
    async (values) => {
        // console.log('inside async thunk', values);
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                name: values.name,
                email: values.email,
                password: values.password
            })
        }).then((res) => res.json()
        ).then((res) => {
            // console.log(res);
            return res;
        }).catch((error) => ({ error }))
    });

    export const loginUser = createAsyncThunk('user/loginUser',
    async (creds, { getState }) => {
        // console.log('inside login thunk', creds);
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/users/admin/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: creds.email,
                password: creds.password
            })
        }).then((res) => {
            return res.json();
        }).then((res) => {
            return res;
            // localStorage.setItem('authToken', res)
            // console.log("inside login",res);

        }).catch((error) => console.log(error))
    })

    export const getUser = createAsyncThunk('user/getUser',
    async (authToken) => {
        // console.log('inside getUser');
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'auth-token': authToken
            }
        }).then((res) =>
            res.json()
        ).then((res) => {
            // console.log('inside getuser res :',res);
            return res;
            // console.log("getUser RESPONSE :", res.email);
            // console.log('inside reducer , loading :', getState().app.loading);
            // const user = res;
            // return {...getState().app,user}
        }
        ).catch((error) => console.log(error))
    })

const userSlice = createSlice({
    name : 'user',
    initialState : {
        user : null,
        loading : false,
        error : null,
        allUsers : null
    },
    reducers : {
        logout: (state, action) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.user = null;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getAllUsers.fulfilled,(state,action)=>{
            // console.log('fulfilled', action.payload);
            state.allUsers = action.payload;
        });
        builder.addCase(getAllUsers.rejected,(state,action)=>{
            // console.log('rejected', action.payload);
            state.error = action.payload;
        });
        builder.addCase(getAllUsers.pending,(state,action)=>{
            // console.log('Pending', action.payload);
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            if (action.payload.authToken) {
                localStorage.setItem('authToken', action.payload.authToken);
                state.isLoggedIn = true;
                state.error = null;
            }
            else {
                state.error = action.payload;
            }
        });
        builder.addCase(createUser.rejected, (state, action) => {
            // console.log('Rejected login');
            state.error = action.payload;
            state.isLoggedIn = false;
            // console.log(action.payload);
            // return action.payload;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload.authToken) {
                localStorage.setItem('authToken', action.payload.authToken);
                state.isLoggedIn = true;
                state.error = null;
            }
            else {
                state.error = action.payload;
            }
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            // console.log('Rejected login');
            state.error = action.payload;
            state.isLoggedIn = false;
            // console.log(action.payload);
            // return action.payload;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            // console.log('inside BUILDER addCase');
            // console.log('getuser actionpayload', action.payload);
            state.user = action.payload;
            state.isLoggedIn = true;
            // return action.payload;
        });
    }
})

export const { logout } = userSlice.actions
export default userSlice.reducer