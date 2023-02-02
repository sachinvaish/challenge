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