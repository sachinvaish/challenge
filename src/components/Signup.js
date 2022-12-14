import { Box, Button, Checkbox, Dialog, DialogContent, DialogContentText, FormControlLabel, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Password } from '@mui/icons-material';

export default function Signup(props) {

    const { open} = props;
    const [signupOpen, setSignupOpen] = useState(open);
    const { register, reset,  handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onClose=()=>{
        setSignupOpen(false);
        navigate("/");
    }


    const onSubmit = (data) => {
        // const newSubmission={
        //     "_id": Math.random(),
        //     "challenge_id": "63748a4dfcc73c0697996999",
        //     "user_id": "63748a4dfcc73c064d0000010",
        //     "photo_url": "https://crowwwn-prod.s3.amazonaws.com/uploads/submission/image/4049/thumb_Vending_Machine_App_-_By_Satish_Naukudkar.png",
        //     "description": data.description
        // }
        // dispatch(addSubmission(newSubmission));
        // onClose();
        console.log(email);
        // reset({email, username, password});
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
                        onClick={()=>{setSignupOpen(false); navigate("/login")}}
                        >Log in</Button>
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
                                <TextField fullWidth label='username' type='text' {...register("username", { required: true })}/>
                            </Grid>
                            <Grid item lg>
                                <TextField fullWidth label='Password' type='password' {...register("password", { required: true })} />
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
