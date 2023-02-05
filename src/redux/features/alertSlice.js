import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name : 'alert',
    initialState :{
        severity : 'info',
        message : 'Welcome',
        open : false
    },
    reducers:{
        showAlert : (state,action)=>{
            state.severity = action.payload.type;
            state.message = action.payload.message;
            state.open = true;
        },
        onClose : (state,action)=>{
            state.open = false;
        }
    }
})

export const { showAlert, onClose } = alertSlice.actions
export default alertSlice.reducer