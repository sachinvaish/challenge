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

export const getUser = createAsyncThunk('user/getUser',
    async () => {
        console.log('inside getUser');
        return fetch('http://localhost/users/getuser', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTBmZjQ0YTU4MzEzNzE5ZWIxMmMzZSIsImlhdCI6MTY3MTQ5NTQ5Mn0.5dKmkrCrInV_OzcWV6_rZCsY0ZDBEDvDcFZJBXqWQmM'
            }
        }).then((res) =>
            console.log(res.json())
        ).catch((error) => console.log(error))
    })

// export const getUser = createAsyncThunk('user/getUser',
//     async () => {
//         console.log('inside getUser');
//         const res = await fetch('http://localhost/users/getuser', {
//             method: 'GET',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-type': 'application/json',
//                 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTBmZjQ0YTU4MzEzNzE5ZWIxMmMzZSIsImlhdCI6MTY3MTQ5NTQ5Mn0.5dKmkrCrInV_OzcWV6_rZCsY0ZDBEDvDcFZJBXqWQmM'
//             }
//         })
//         console.log(res);
//         return res;
//     })

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
            // console.log('fulFILLED');
            // console.log(action.payload.body);
        },
        [getUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default userSlice.reducer