import { Box, Button, Checkbox, Dialog, DialogContent, DialogContentText, FormControlLabel, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { loginUser } from '../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ResetPassword from './ResetPassword';

export default function Login(props) {

    const { open } = props;
    const [loginOpen, setLoginOpen] = useState(open);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoggedIn, error } = useSelector((state) => ({ ...state.UserReducer }));    

    const onClose = () => {
        setLoginOpen(false);
        navigate("/");
    }

    const onResetPWClose = () => {
        setPasswordOpen(false);
    }

    useEffect(() => {
        if(isLoggedIn){
            onClose();
            navigate('/');
        }
    }, [isLoggedIn]);

    const onSubmit = (data) => {
        const creds = {
            email: data.email,
            password: data.password
        }
        const res = dispatch(loginUser(creds));
        if(isLoggedIn){
            onClose();
        }
    }

    return (
        <>
            <Dialog open={loginOpen} onClose={onClose} fullWidth maxWidth='sm' >
                {passwordOpen && <ResetPassword open={passwordOpen} onClose={onResetPWClose}/>}
                <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h4' textAlign='center'>
                            Log in
                        </Typography>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <DialogContentText textAlign='center' mb={2}>Don't have any account ?
                        <Button disableRipple
                            onClick={() => { setLoginOpen(false); navigate("/signup") }}
                        >Sign up</Button>
                    </DialogContentText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container direction='column' gap={3}>
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
                                
                            </Grid>
                            <Grid item lg sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button onClick={()=>setPasswordOpen(true)}>Forgot Password ?</Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
