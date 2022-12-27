import { Box, Button, Checkbox, Dialog, DialogContent, DialogContentText, FormControlLabel, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../redux/features/userSlice';

export default function Signup(props) {

    const { open } = props;
    const [signupOpen, setSignupOpen] = useState(open);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onClose = () => {
        setSignupOpen(false);
        navigate("/");
    }


    const onSubmit = (data) => {
        const user = {
            "name":data.name,
            "email": data.email,
            "username": data.username,
            "password": data.password
        }
        dispatch(createUser(user));
        console.log(user);
        reset({ email: '', username: '', password: '' });
        alert('user created successfully');
        onClose();
    }

    console.log("Inside Signup componetn");

    return (
        <>
            <Dialog open={signupOpen} onClose={onClose} fullWidth maxWidth='sm' >

                <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h4' textAlign='center'>
                            Signup
                        </Typography>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <DialogContentText textAlign='center' mb={2}>Already have an account ?
                        <Button disableRipple
                            onClick={() => { setSignupOpen(false); navigate("/login") }}
                        >Log in</Button>
                    </DialogContentText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container direction='column' gap={3}>
                            <Grid item lg>
                                <TextField fullWidth label='Your Name' type='text' {...register("name")} placeholder="Enter your name here" />
                            </Grid>
                            <Grid item lg>
                                <TextField fullWidth label='Email' type='email' {...register("email", {
                                    required: true, pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "invalid email address"
                                    }
                                })} placeholder="yourname@crowwwn.com" helperText={errors.email && 'Please enter valid Email'} />
                            </Grid>
                            <Grid item lg>
                                <TextField fullWidth label='username' type='text' {...register("username", {
                                    required: true,
                                    pattern: {
                                        value: /^\S+$/i,
                                        message: "No White space allowed"
                                    }
                                })} placeholder="Username" helperText={errors.username && 'No White Space Allowed'} />
                            </Grid>
                            <Grid item lg>
                                <TextField fullWidth label='Password' type='password' {...register("password", { required: true, minLength:8 })} placeholder="minimum 8 Character"
                                helperText={errors.password && 'Minimum 8 characters'} />
                            </Grid>
                            <Grid item lg>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="I agree to Crowwwn’s Privacy Policy and Terms of service."
                                />
                            </Grid>
                            <Grid item lg>
                                <Button fullWidth type='submit' variant='contained'>Sign up</Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
