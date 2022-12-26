import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk('user/createUser',
    async (values) => {
        // console.log('inside async thunk', values);
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
        }).then((res) => {
            // console.log(res.json());
            // console.log('user Added');
        }).catch((error) => console.log(error))
    });

export const loginUser = createAsyncThunk('user/loginUser',
    async (creds,{getState}) => {
        // console.log('inside login thunk', creds);
        return fetch('http://localhost/users/login', {
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
    async (authToken, {getState}) => {
        // console.log('inside getUser');
        return fetch('http://localhost/users/getuser', {
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
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
        isLoggedIn : false
    },
    reducers: {
        logout : (state,action)=>{
            localStorage.clear();
            state.isLoggedIn = false;
            state.user = null;
        }
    },
    extraReducers:
        (builder) => {
            builder.addCase(getUser.fulfilled, (state, action) => {
                // console.log('inside BUILDER addCase');
                // console.log('getuser actionpayload', action.payload);
                state.user=action.payload;
                state.isLoggedIn = true;
                // return action.payload;
            });
            builder.addCase(loginUser.fulfilled, (state, action)=>{
                if(action.payload.authToken){
                    localStorage.setItem('authToken',action.payload.authToken);
                    state.isLoggedIn = true;
                    state.error = null;
                }
                else{
                    state.error=action.payload;
                }
            });
            builder.addCase(loginUser.rejected, (state, action)=>{
                // console.log('Rejected login');
                state.error=action.payload;
                state.isLoggedIn = false;
                // console.log(action.payload);
                // return action.payload;
            });
        }
})

export const { logout } = userSlice.actions
export default userSlice.reducer