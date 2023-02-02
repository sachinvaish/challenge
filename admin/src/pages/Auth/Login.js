import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/services/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Login(props) {
    const {setValue}=props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, error } = useSelector((state) => ({ ...state.UserReducer }));

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    const onSubmit = (data) => {
        const creds = {
            email: data.email,
            password: data.password
        }
        const res = dispatch(loginUser(creds));
        if (isLoggedIn) {
            // onClose();
        }
    }

    return (
        <>
            <Typography mb={2}>Don't have any Account ?
                <Button
                    onClick={() => { setValue('signup') }}
                >Sign up</Button>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container direction='column' gap={3} >
                    <Grid item lg>
                        <TextField fullWidth label='Email' {...register("email", {
                            required: true, pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })} placeholder="yourname@crowwwn.com" helperText={errors.email && 'Please enter valid Email'} />
                    </Grid>
                    <Grid item lg>
                        <TextField fullWidth label='Password' type='password' {...register("password", { required: true })} />
                    </Grid>
                    <Grid item lg>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Keep me logged in until I sign out"
                        />
                    </Grid>
                    <Grid item lg>
                        <Button fullWidth type='submit' variant='contained'>Log in</Button>
                        {error && <Typography variant='h6' textAlign='center' sx={{ color: '#FF3F16', fontWeight: 'bold' }}>{error.error}</Typography>}
                    </Grid>
                    <Grid item lg sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button>Forgot Password ?</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
