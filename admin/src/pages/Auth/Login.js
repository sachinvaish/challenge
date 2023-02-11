import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/services/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Login(props) {
    const { setValue } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, error } = useSelector((state) => ({ ...state.UserReducer }));

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/admin/dashboard');
        }
    }, [isLoggedIn]);

    const onSubmit = (data) => {
        const creds = {
            email: data.email,
            password: data.password
        }
        const res = dispatch(loginUser(creds));
    }

    return (
        <>
            <Typography mb={2} textAlign='center' variant='h5' fontWeight='bold' color='primary'>Admin Login</Typography>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container direction='column' gap={3} >
                    <Grid item>
                        <TextField size='small' fullWidth label='Email' {...register("email", {
                            required: true, pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })} placeholder="yourname@crowwwn.com" helperText={errors.email && 'Please enter valid Email'} />
                    </Grid>
                    <Grid item>
                        <TextField size='small' fullWidth label='Password' type='password' {...register("password", { required: true })} />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Keep me logged in until I sign out"
                        />
                        <Button fullWidth type='submit' variant='contained'>Log in</Button>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button>Forgot Password ?</Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
