import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk('users/getAllUsers',
async()=>{
    console.log('inside getAllUsers');
    return fetch('http://localhost:5000/users/getallusers',{
        method : 'POST',
        headers : {
            'Content-type':'application/json'
        }
    }).then((res)=>res.json()
    ).then((res)=>res
    ).catch((err)=>err)
})

const userSlice = createSlice({
    name : 'user',
    initialState : {
        user : null,
        loading : false,
        error : null,
        allUsers : null
    },
    reducers : {},
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
        })
    }
})

export default userSlice.reducer