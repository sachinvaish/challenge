import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk('user/createUser',
    async (values) => {
        // console.log('inside async thunk', values);
        return fetch('http://localhost:5000/users/signup', {
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
        return fetch('http://localhost:5000/users/login', {
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
        return fetch('http://localhost:5000/users', {
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


export const getUserProfile = createAsyncThunk('user/getUserProfile',
    async (id) => {
        return fetch(`http://localhost:5000/users/${id}`,{
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }
        }).then((res) => res.json()
        ).then((res) => res
        ).catch((err) => err)
    })

export const updateUser = createAsyncThunk('user/updateUser',
    async ({ updatedUser, authToken }) => {
        // console.log('inside update user');
        return fetch('http://localhost:5000/users', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({
                user_id: updatedUser.user_id,
                name: updatedUser.name,
                username: updatedUser.username,
                designation: updatedUser.designation,
                location: updatedUser.location,
                about: updatedUser.about,
                facebook_url: updatedUser.facebook_url,
                instagram_url: updatedUser.instagram_url,
                twitter_url: updatedUser.twitter_url,
                linkedin_url: updatedUser.linkedin_url,
                portfolio_url: updatedUser.portfolio_url
            })
        }).then((res) => res.json()
        ).then((res) => res
        ).catch((err) => err)
    })

export const updateProfilePhoto = createAsyncThunk('user/updateProfilePhoto',
    async ({ base64, authToken }) => {
        // console.log('inside update photo', base64);
        return fetch('http://localhost:5000/users/setphoto', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({
                photo: base64
            })
        }).then((res) => res.json()
        ).then((res) => res
        ).catch((err) => err)
    })

export const deletePhoto = createAsyncThunk('user/deletePhoto',
    async ({ photo_url, authToken }) => {
        return fetch('http://localhost:5000/users/deletephoto', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({
                photo_url: photo_url
            })
        }).then((res) => res.json()
        ).then((res) => res
        ).catch((err) => err)
    })

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
        isLoggedIn: false,
        message: null,
        userProfile: null
    },
    reducers: {
        logout: (state, action) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.user = null;
        }
    },
    extraReducers:
        (builder) => {
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
            builder.addCase(getUser.fulfilled, (state, action) => {
                // console.log('inside BUILDER addCase');
                // console.log('getuser actionpayload', action.payload);
                state.user = action.payload;
                state.isLoggedIn = true;
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
            builder.addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
            builder.addCase(updateUser.rejected, (state, action) => {
                console.log('rejected update', action.payload);
            });
            builder.addCase(updateProfilePhoto.fulfilled, (state, action) => {
                state.message = 'Photo updated successfully';
            });
            builder.addCase(updateProfilePhoto.rejected, (state, action) => {
                console.log('rejected updatePhoto', action.payload);
            });
            builder.addCase(deletePhoto.fulfilled, (state, action) => {
                state.message = 'Photo Deleted successfully';
            });
            builder.addCase(deletePhoto.rejected, (state, action) => {
                console.log('rejected deletePhoto', action.payload);
            });
            builder.addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
            });
            builder.addCase(getUserProfile.rejected, (state, action) => {
                console.log('rejected update', action.payload);
            });
        }
}
)

export const { logout } = userSlice.actions
export default userSlice.reducer