import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk('user/createUser',
async (values) => {
    console.log('inside async thunk',values);
    return fetch('http://localhost/users/signup',{
        method:'POST',
        headers : {
            Accept : 'application/json',
            'Content-type' : 'application/json',
        },
        body : JSON.stringify({
            username : values.username,
            email : values.email,
            password : values.password
        })
    }).then((res) =>
        console.log(res.json())
    ).catch((error)=>console.log(error))
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
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
        }
    }
})

export default userSlice.reducer