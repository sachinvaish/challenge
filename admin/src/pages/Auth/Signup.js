import { Box, Button, Checkbox, Dialog, DialogContent, DialogContentText, FormControlLabel, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../../redux/services/userSlice';

export default function Signup(props) {

    const {setValue}=props;
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const { isLoggedIn, error } = useSelector((state) => ({ ...state.UserReducer }));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    const onSubmit = (data) => {
        const user = {
            "name": data.name,
            "email": data.email,
            "username": data.username,
            "password": data.password
        }
        dispatch(createUser(user));
        if (isLoggedIn) {
            reset({ email: '', username: '', password: '', name: '' });
            navigate('/');
        }
    }


    console.log("Inside Signup componetn");

    return (
        <>
            <Typography mb={2}>Already have an account ?
                <Button
                    onClick={() => { setValue('login') }}
                >Log in</Button>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction='column' gap={3}>
                    <Grid item>
                        <TextField fullWidth label='Your Name' type='text' {...register("name", { required: true })} placeholder="Enter your name here" helperText={errors.name && 'Name is required'} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label='Email' type='email' {...register("email", {
                            required: true, pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })} placeholder="yourname@crowwwn.com" helperText={errors.email && 'Please enter valid Email'} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label='username' type='text' {...register("username", {
                            required: true,
                            pattern: {
                                value: /^\S+$/i,
                                message: "No White space allowed"
                            }
                        })} placeholder="Username" helperText={errors.username && 'No White Space Allowed'} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label='Password' type='password' {...register("password", { required: true, minLength: 8 })} placeholder="minimum 8 Character"
                            helperText={errors.password && 'Minimum 8 characters'} />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="I agree to Crowwwn’s Privacy Policy and Terms of service."
                        />
                    </Grid>
                    <Grid item>
                        <Button fullWidth type='submit' variant='contained'>Sign up</Button>
                        {error && <Typography variant='h6' textAlign='center' sx={{ color: '#FF3F16', fontWeight: 'bold' }}>{error.error}</Typography>}
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
